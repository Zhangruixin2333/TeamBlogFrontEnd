import { searchPostVOByPageUsingPOST } from '@/services/team-blog-api/postController';
import { doThumbByRedisUsingPOST } from '@/services/team-blog-api/postThumbController';
import { Comment } from '@ant-design/compatible';
import { LikeFilled, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Button, Card, Image, List, message, Space, Tooltip, Typography } from 'antd';
import React, { MouseEventHandler, ReactElement, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useModel, useNavigate } from 'umi';
import './styles/ViewListItem.less';

const ButtonText = ({
  button,
  text,
  onClick,
}: {
  button: ReactElement<any, any>;
  text: string;
  onClick: MouseEventHandler;
}) => (
  <Space onClick={onClick}>
    {button}
    {text}
  </Space>
);

const BlogView: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  /*获取存储到本地的page页码*/
  const curPage = Number(localStorage.getItem('currentPage')) || 1;
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [blogs, setBlogs] = useState([] as API.PostVO[]);
  let navigate = useNavigate();
  const { setId } = useModel('blogModel', (model) => ({
    id: model.id,
    setId: model.setId,
  }));
  const [commentShow, setCommentShow] = useState([false, false, false]);
  const { searchText } = useModel('searchTextModel', (model) => ({
    searchText: model.searchText,
  }));
  /*获取路由后面的请求参数*/
  const location = useLocation();
  const setShowComment = (index: number) => {
    setCommentShow((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  /*获取当前页面数据*/
  const getCurPageData = (page: number, pageSize: number, text: string) => {
    setLoading(true);
    searchPostVOByPageUsingPOST({
      current: page,
      pageSize: pageSize,
      searchText: text || '',
    } as API.PostQueryRequest)
      .then((res) => {
        if (res.data?.records) {
          setBlogs(res.data?.records);
          setTotal(res.data.total || 10);
        } else {
          messageApi.open({
            type: 'error',
            content: res.message,
          });
        }
      })
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /*获取被点击的文章id*/
  const handleClick = async (id: number) => {
    await setId(id);
    navigate('/blog/detail', { replace: true });
  };

  //监听路由中请求参数的变化（搜索框）
  useEffect(() => {
    getCurPageData(curPage, 3, location.search === '' ? '' : searchText);
  }, [location.search]);

  // @ts-ignore
  return (
    <>
      {contextHolder}
      <PageContainer content={'欢迎来到博客预览页面'}>
        <Card>
          <List
            bordered={false}
            loading={loading}
            itemLayout="vertical"
            size="default"
            pagination={{
              onChange: async (page) => {
                await localStorage.setItem('currentPage', page + '');
                getCurPageData(page, 3, location.search === '' ? '' : searchText);
              },
              pageSize: 3,
              total: total,
              defaultCurrent: curPage,
            }}
            dataSource={blogs}
            footer={<div>博客详情</div>}
            renderItem={(item, index: number) => (
              <>
                <List.Item
                  className={'myItemClass' + index}
                  key={item.title}
                  style={{ cursor: 'pointer' }}
                  actions={[
                    <ButtonText
                      onClick={() => {
                        doThumbByRedisUsingPOST({ postId: item.id })
                          .then((res) => {
                            // TODO 以弃用的代码删掉不可用
                            item.thumbNum = res.data;
                            // item.hasThumb = !item.hasThumb
                            setBlogs((prevBlogs) => {
                              const updatedItems = [...prevBlogs];
                              const itemToUpdate = updatedItems[index];
                              itemToUpdate.hasThumb = !itemToUpdate.hasThumb;
                              return updatedItems;
                            });
                          })
                          .catch((res) => {
                            messageApi.warning('点赞失败,' + res.message);
                          });
                      }}
                      button={
                        <Button
                          type="text"
                          icon={
                            item.hasThumb ? (
                              <LikeFilled style={{ color: 'hotpink' }} />
                            ) : (
                              <LikeOutlined style={{ color: 'hotpink' }} />
                            )
                          }
                        />
                      }
                      text={item.thumbNum + ''}
                      key={'list-vertical-like-o' + item.id}
                    />,
                    <ButtonText
                      onClick={() => {
                        messageApi.success('TODO已收藏');
                      }}
                      button={<Button type="text" icon={<StarOutlined />} />}
                      text={item.favourNum + ''}
                      key="list-vertical-star-o"
                    />,
                    <ButtonText
                      onClick={() => {
                        messageApi.success('TODO已收藏');
                      }}
                      button={
                        <Button
                          type="text"
                          icon={<MessageOutlined />}
                          onClick={() => {
                            messageApi.success('TODO打开评论');
                            setShowComment(index);
                          }}
                        />
                      }
                      text="2"
                      key="list-vertical-message"
                    />,
                  ]}
                  extra={
                    <Image
                      width={150}
                      alt="logo"
                      src={'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'}
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        onClick={() => messageApi.success('Avatar个人信息页面')}
                        src={item.user?.userAvatar}
                      />
                    }
                    title={
                      <Typography.Text onClick={() => messageApi.success('title个人信息页面')}>
                        {item.title}
                      </Typography.Text>
                    }
                  />
                  <Typography.Paragraph
                    ellipsis={{ rows: 2 }}
                    onClick={() => handleClick(item.id || 0)}
                  >
                    <ReactMarkdown>{item.content || ''}</ReactMarkdown>
                  </Typography.Paragraph>
                </List.Item>
                {commentShow[index] && (
                  <Card>
                    <ReactQuill />
                    <Comment
                      author={<a>用户</a>}
                      avatar={<Avatar src="/logo.svg" alt="用户名" />}
                      content={<p>《用户评论》 这是一段用户评论。</p>}
                      datetime={
                        <Tooltip title="2016-11-22 11:22:33">
                          <span>8 hours ago</span>
                        </Tooltip>
                      }
                    />
                  </Card>
                )}
              </>
            )}
          />
        </Card>
      </PageContainer>
    </>
  );
};

export default BlogView;
