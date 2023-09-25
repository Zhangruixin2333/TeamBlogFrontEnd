import '@umijs/max';
import Search from 'antd/es/input/Search';
import { useEffect, useRef } from 'react';
import { history, useModel } from 'umi';

export const Question = () => {
  /*useModel获取searchText操作权限*/
  const { searchText, setSearchText } = useModel('searchTextModel', (model) => ({
    searchText: model.searchText,
    setSearchText: model.setSearchText,
  }));
  const ref = useRef();
  const onSearch = (value: string) => {
    setSearchText(value);
    console.log(ref.current, ' ref');
  };

  useEffect(() => {
    history.push(searchText === '' ? '/blog/view' : '/blog/view?searchText=' + searchText);
  }, [searchText]);

  return (
    <div style={{ paddingTop: '24px' }}>
      <Search
        placeholder="请输入要查询的数据"
        allowClear
        enterButton="搜索"
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
};
