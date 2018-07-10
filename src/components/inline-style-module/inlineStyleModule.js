import React from 'react';

const style = {
  titleStyle: {
    color: 'red',
    fontWeight: 'bold',
    padding: '4px 0'
  }
}

const InlineStyleModule = () => (
  <div style={style.titleStyle}>inline-style-module</div>
);
export default InlineStyleModule;
