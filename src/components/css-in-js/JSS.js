import React from 'react';
import injectSheet from 'react-jss';

// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
const styles = {
  myButton: {
    color: 'green',
    margin: { // jss-expand gives more readable syntax
      top: 5, // jss-default-unit makes this 5px
      right: 0,
      bottom: 0,
      left: '1rem'
    },
    '& span': { // jss-nested applies this to a child span
      fontWeight: 'bold' // jss-camel-case turns this into 'font-weight'
    },
    '&:hover': {
      cursor: 'pointer',
      color: props => props.buttonColor
    }
  },
  myLabel: {
    fontStyle: 'italic'
  },
  newStyle: {
    color: 'blue',
    '&:hover': {
      cursor: 'pointer',
      color: 'orange',
    }
  }
}

// Define the component using these styles and pass it the 'classes' prop.
// Use this to assign scoped class names.
const Button = ({ classes, children }) => (
  <button className={classes.myButton}>
    <span className={classes.myLabel}>
      {children}
    </span>
  </button>
);
// Finally, inject the stylesheet into the component.
const StyledButton = injectSheet(styles)(Button);
const ColorFont = ({ classes }) => (
  <span className={classes.newStyle}>我是带颜色的字体</span>
);
// Finally, inject the stylesheet into the component.
const StyledColorFont = injectSheet(styles)(ColorFont);
const JSS = () => (
  <div>
    css-in-js:
    <StyledButton buttonColor='red'>我是一个按钮</StyledButton>
    <StyledColorFont />
  </div>
);

export default JSS;

