import {getLoginUserUsingGET, updateMyUserUsingPOST} from '@/services/team-blog-api/userController';
import {Alert, Button, Form, Image, Input, message} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {useEffect} from 'react';

interface AccountInfoProps {
  showInfo: boolean;
  userName: string | undefined;
  userAvatar: string | undefined;
  userProfile: string | undefined;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
                                                   showInfo,
                                                   userName,
                                                   userProfile,
                                                   userAvatar,
                                                 }) => {
  const [messageApi, contextHandler] = message.useMessage();
  const onFinish = (values: any) => {
    updateMyUserUsingPOST(values).then(async (res) => {
      if (res.data) {
        messageApi.open({
          type: 'success',
          content: res.message,
        });
        setInterval(() => {
          location.reload()
        }, 800);

      } else {
        messageApi.open({
          type: 'warning',
          content: '请进行修改',
        });
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: 'warning',
      content: '提交失败',
    });
  };

  return (
    <React.Fragment>
      {contextHandler}
      <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        style={{maxWidth: 600, display: showInfo ? "block" : "none"}}
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="我的昵称" name="userName">
          <Input defaultValue={userName}/>
        </Form.Item>
        <Form.Item label="头像">
          <Image src={userAvatar}/>
        </Form.Item>

        <Form.Item label="我的简介" name="userProfile">
          <TextArea defaultValue={userProfile}/>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type="primary" htmlType="submit">
            修改
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default AccountInfo;
