import { Alert, Button, Form, Input } from 'antd';
import React from 'react';

interface InfoUpdateProps {
  showInfoUpdate: boolean;
}

const InfoUpdate: React.FC<InfoUpdateProps> = ({ showInfoUpdate }) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, display: showInfoUpdate ? 'block' : 'none' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      disabled={true}
      autoComplete="off"
    >

      <Form.Item>
        <Alert message="暂未开放" description="修改密码功能暂未开放" type="info" showIcon />
      </Form.Item>

      <Form.Item label="密码" rules={[{ required: true, message: '请输入要修改的密码' }]}>
        <Input.Password placeholder="请输入要修改的密码" />
      </Form.Item>

      <Form.Item label="确认密码" rules={[{ required: true, message: '请确认密码' }]}>
        <Input.Password placeholder="请输入要修改的密码" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InfoUpdate;
