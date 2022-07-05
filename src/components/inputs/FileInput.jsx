import React, { useRef } from 'react';
import { Button } from 'antd';

export default ({ children, handleChange, accept, notButton }) => {
  const fileInput = useRef(null);
  function handleClick() {
    fileInput.current.click();
  }
  function handleFileChange(e) {
    handleChange(e.target.files[0]);
  }
  return (
    <>
      {notButton ? (
        <span onClick={handleClick}>{children}</span>
      ) : (
        <Button type="primary" onClick={handleClick}>
          {children}
        </Button>
      )}
      <input ref={fileInput} type="file" hidden onChange={handleFileChange} accept={accept} />
    </>
  );
};
