import {getPostVOByIdUsingGET} from '@/services/team-blog-api/postController';
import {PageContainer} from '@ant-design/pro-components';
import {Card, Divider, notification, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import {useModel} from "umi";

/**
 * 博文详情页
 * @constructor
 */
const BlogDetail: React.FC = () => {
  // 博文
  const [blog, setBlog] = useState({} as API.PostVO | undefined);
  const [loading, setLoading] = useState(true);
  // 消息提示
  const [api, contextHolderMes] = notification.useNotification();
  // umi useModel - 具体用法看 README.md
  const {id} = useModel('blogModel', (model) => ({
    id: model.id,
  }));
  const getBlogDetail: any = (blogId: API.getPostVOByIdUsingGETParams) => {
    getPostVOByIdUsingGET(blogId).then((res) => {
      if (res.data) {
        setBlog(res.data);
        setLoading(false);
      } else {
        api.info({
          message: "请先选择要浏览的文章，不然会一直转哦",
          placement: "topRight",
        })
      }
    });
  };

  useEffect(() => {
    getBlogDetail({id: id});
  }, []);

  return (
    <>
      {contextHolderMes}
      <PageContainer loading={loading}>
        <Card>
          {/*博文标题*/}
          <Typography.Title
            level={2}
            style={{
              textAlign: 'center',
            }}
          >
            {blog?.title}
          </Typography.Title>
          <Divider/>
          {/*博文内容*/}
          <Typography.Text>
            <ReactMarkdown
              className="markdown-body"
              remarkPlugins={[remarkGfm, remarkToc]}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      style={dark}
                      language={match[1]}
                      PreTag="div"
                    >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >{blog?.content || ''}</ReactMarkdown>
          </Typography.Text>
        </Card>
      </PageContainer>
    </>
  );
};

export default BlogDetail;
