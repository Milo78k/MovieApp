import React, { useMemo } from 'react';
import { debounce } from 'lodash';
import { Input } from 'antd';

function SearchInput({ setQuery, setPage }) {
  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        setQuery(value);
        setPage(1);
      }, 500),
    [setPage, setQuery],
  );
  return (
    <Input
      placeholder="Type to search..."
      onChange={(e) => handleSearch(e.target.value)}
      style={{
        marginBottom: '20px',
        width: '100%',
      }}
    />
  );
}

export default SearchInput;
