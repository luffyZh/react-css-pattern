import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `};
  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 200px;
  padding: 10px 20px;
  border-radius: 6px;
`;

const ExtendButton = Button.extend`
  color: green;
  font-size: 30px;
`;

class StyledComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        styled-components:
        <Button>我是普通按钮</Button>
        <Button primary>我是Primary按钮</Button>
        <Input placeholder='请输入...' type='text' />
        <br/>
        <ExtendButton>继承Button样式的按钮</ExtendButton>
        <ExtendButton>继承Button样式的primary按钮</ExtendButton>
      </div>
    );
  }
}

export default StyledComponent;