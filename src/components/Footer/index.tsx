import {GithubOutlined} from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '7122实验室制作';

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '点击查看`项目组`文档资源',
          title: '项目组知识库',
          href: 'https://www.yuque.com/zhangruixin2333/hgn3cb',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://space.bilibili.com/82462087?spm_id_from=333.1007.0.0',
          blankTarget: true,
        },
        {
          key: '点击插卡antd官方文档（优雅的组件）',
          title: '7122',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
