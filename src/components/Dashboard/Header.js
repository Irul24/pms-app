import React from 'react';
import { Button } from 'primereact/button';

const Header = ({ setIsAdding }) => {
  return (
    <header>
      <h1>Product Management System</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <Button rounded outlined onClick={() => setIsAdding(true)}>Add Product</Button>
      </div>
    </header>
  );
};

export default Header;
