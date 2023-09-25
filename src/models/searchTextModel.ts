import {useState} from 'react';

const SearchTextModel = () => {
  const [searchText, setSearchText] = useState('');
  return {
    searchText,
    setSearchText,
  };
};

export default SearchTextModel;
