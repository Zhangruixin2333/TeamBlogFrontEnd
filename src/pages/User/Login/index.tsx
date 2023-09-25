import Footer from '@/components/Footer';
import { userLoginUsingPOST, userRegisterUsingPOST } from '@/services/team-blog-api/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, useModel } from '@umijs/max';
import { message, Tabs, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'umi';
import Settings from '../../../../config/defaultSettings';

const Login: React.FC = () => {
  let navigate = useNavigate();
  const [type, setType] = useState<string>('login');
  const { initialState, setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const handleSubmit = async (values: API.UserLoginRequest | API.UserRegisterRequest) => {
    try {
      if (type === 'login') {
        // 登录
        await userLoginUsingPOST({ ...values }).then((res) => {
          if (res.code === 0) {
            const defaultLoginSuccessMessage = '登录成功！';
            setInitialState({
              loginUser: res.data,
            });
            message.success(defaultLoginSuccessMessage);
          } else {
            message.error(res.message);
          }
        });
        console.log(initialState!.loginUser);
      } else {
        const res = await userRegisterUsingPOST({
          ...values,
        });
        if (res.data) {
          const defaultRegisterSuccessMessage = '注册成功！';
          message.success(defaultRegisterSuccessMessage);
          setInterval(() => {
            location.reload();
          }, 1000);
          return;
        }
        message.error(res.message);
      }
    } catch (error) {
      let defaultMessage: string;
      if (type === 'login') {
        defaultMessage = '登录失败，请重试！';
      } else {
        defaultMessage = '注册失败';
      }
      console.log(error);
      message.error(defaultMessage);
    }
  };

  useEffect(() => {
    // 在 initialState 变化后执行操作
    console.log('initialState 更新了', initialState);

    if (initialState && initialState.loginUser) {
      navigate('/welcome');
    }
  }, [initialState]);
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="WFU Blog"
          subTitle="该网站由7122开发 集博客-OJ-论坛于一身"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={(values) => {
            return handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'login',
                label: '登录',
              },
              {
                key: 'register',
                label: '注册',
              },
            ]}
          />

          {type === 'login' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {type === 'register' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                rules={[
                  {
                    required: true,
                    message: '账户是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'确认密码'}
                rules={[
                  {
                    required: true,
                    message: '请确认密码！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Tooltip title="请联系管理员">
              <a
                style={{
                  float: 'right',
                  marginBottom: '10px',
                }}
              >
                忘记密码 ?
              </a>
            </Tooltip>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
