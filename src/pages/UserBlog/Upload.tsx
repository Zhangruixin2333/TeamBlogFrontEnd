import { addPostUsingPOST } from '@/services/team-blog-api/postController';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Divider, Form, message, Tag } from 'antd';
import { Input } from 'antd/lib';
import EasyMDE from 'easymde';
import highlight from 'highlight.js';
import 'highlight.js/styles/a11y-light.css';
import React, { useCallback, useMemo, useState } from 'react';
import { SimpleMdeReact } from 'react-simplemde-editor';
import './styles/markdownEditor.less';
const { CheckableTag } = Tag;

const tagsData = [
  '前端',
  'HTML',
  'CSS',
  'JavaScript',
  '后端',
  'Servlet',
  'JSP',
  'JavaWeb',
  'MySQL',
  'Spring',
  'SpringBoot',
  'Hibernate',
  'MyBatis',
];

/**
 * 博文上传组件
 * @constructor
 */
const UserBlogUpload: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState({
    content: '',
    title: '',
    tags: [] as string[],
  });

  /**
   * 点击上传
   */
  const onFinish = async () => {
    await addPostUsingPOST(data).then((res) => {
      if (res.code === 0) {
        messageApi.open({
          type: 'success',
          content: '发布成功',
        });
      } else {
        messageApi.open({
          type: 'error',
          content: res.message,
        });
      }
    });
  };

  /**
   * 选中标签事件
   * @param tag
   * @param checked
   */
  const handleChangeTags = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...data.tags, tag] : data.tags.filter((t) => t !== tag);
    setData((prevState) => ({
      ...prevState,
      tags: nextSelectedTags,
    }));
  };

  /**
   * 输入标题
   * @param e
   */
  const onChangeTitle = (e: any) => {
    setData((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };

  /**
   * 修改文章内容
   */
  const onChangeContent = useCallback((value: string) => {
    setData((prevState) => ({
      ...prevState,
      content: value,
    }));
  }, []);

  /**
   * 设置编辑器属性
   */
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      imagePathAbsolute: true,
      imageMaxSize: 1024 * 1024 * 5,
      uploadImage: true,
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
        hljs: highlight,
      },
      autofocus: true,
      maxHeight: '450px',
      onToggleFullScreen: () => {
        {
        }
      },
    } as EasyMDE.Options;
  }, []);

  return (
    <PageContainer>
      {contextHolder}
      <Card
        title="博文发布"
        style={{ maxHeight: '1000px', overflow: 'hidden' }}
        extra={
          <Button onClick={onFinish} type="primary">
            发布
          </Button>
        }
      >
        <Form
          name="basic"
          labelAlign="left"
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item label="标题" rules={[{ required: true, message: '请输入标题' }]}>
            <Input placeholder="请输入标题" onChange={onChangeTitle} />
          </Form.Item>

          <Form.Item label="标签" rules={[{ required: true, message: '请至少选择一个标签' }]}>
            {tagsData.map((tag) => (
              <React.Fragment key={tag}>
                <CheckableTag
                  key={tag}
                  checked={data.tags.includes(tag)}
                  onChange={(checked) => handleChangeTags(tag, checked)}
                >
                  {tag}
                </CheckableTag>
                <Divider type="vertical" />
              </React.Fragment>
            ))}
          </Form.Item>
          <Form.Item label="内容" rules={[{ required: true, message: '请输入内容' }]}>
            <SimpleMdeReact
              options={autofocusNoSpellcheckerOptions}
              onChange={(value) => onChangeContent(value)}
            />
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default UserBlogUpload;
