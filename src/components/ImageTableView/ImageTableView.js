import React from 'react';

const ImageTableView = props => {
  return (
    <div className='Container'>
      <div>{props.children}</div>
    </div>
  );
};

export default ImageTableView;
