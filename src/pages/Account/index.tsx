import { useModel } from '@@/exports';
import { ProCard } from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-components';
import { Alert, Divider, Segmented } from 'antd';

import AccountInfo from '@/pages/Account/components/AccountInfo';
import InfoUpdate from '@/pages/Account/components/InfoUpdate';
import React, { useState } from 'react';

const Account: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { loginUser } = initialState || {};
  const [showInfo, setShowInfo] = useState(true);
  const [showInfoUpdate, setShowInfoUpdate] = useState(false);

  const handleChange = (value: string | number) => {
    if (value === '个人资料') {
      setShowInfo(true);
      setShowInfoUpdate(false);
    } else {
      setShowInfo(false);
      setShowInfoUpdate(true);
    }
  };

  return (
    <PageContainer content={<Alert message={'我的主页'} type="success" showIcon banner />}>
      <ProCard>
        <Segmented
          options={['个人资料', '账号设置']}
          onChange={(value: string | number) => handleChange(value)}
        />
        <Divider />
        <AccountInfo
          showInfo={showInfo}
          userName={loginUser?.userName}
          userAvatar={loginUser?.userAvatar}
          userProfile={loginUser?.userProfile}
        />
        {/*<Image*/}
        {/*  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"*/}
        {/*/>*/}
        <InfoUpdate showInfoUpdate={showInfoUpdate} />
      </ProCard>
    </PageContainer>
  );
};

export default Account;
