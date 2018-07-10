import React, { Component } from 'react';
import { css } from 'emotion';

const Link = css`
  min-width: 12rem;
  margin: 0 auto 20px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    opacity: 0.95;
  }
  @media (min-width: 768px) {
    margin: 0 20px 0 0;
    &:last-child {
      margin: 0;
    }
  }
`;

const contentContainer = css({
  marginTop: '10px',
  padding: '10px',
  border: '1px solid #000'
})


class EmotionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={contentContainer}>
        <span className={Link}>点我跳转</span>
      </div>
    )
  }
}
export default EmotionComponent;