import React from 'react';
import Radium from 'radium';

const Button = (props) => (
  <div style={styles.container}>
     <button style={[styles.base, styles.btnPadding]}>
      {props.children}
     </button>
  </div>
)

const styles = {
  base: {
    backgroundColor: 'red',
    color: '#fff',
    ':hover': {
      backgroundColor: 'blue',
      cursor: 'pointer',
    }
  },
  btnPadding: {
    padding: '10px 20px'
  },
  container: {
    marginTop: '10px'
  }
};

const RadiumButton = Radium(Button);

export default RadiumButton;