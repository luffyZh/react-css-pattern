import React, { Component } from 'react';
import styles from './index.module.css';

class CSSModule extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className={styles.container}>
        <span className={styles.labelText}>CSS </span>
        <span className={styles['content-style']}>Modules</span>
      </div>
    )
  }
}
export default CSSModule;