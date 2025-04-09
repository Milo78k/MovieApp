import React from 'react';
import { Pagination } from 'antd';

function PaginationComponent({ current, total, onPageChange }) {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
    >
      <Pagination
        defaultCurrent={1}
        current={current}
        total={total}
        pageSize={20}
        onChange={onPageChange}
        showSizeChanger={false}
        showQuickJumper={false}
        style={{ textAlign: 'center', margin: '20px auto' }}
      />
    </div>
  );
}

export default PaginationComponent;
