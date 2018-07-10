# react-css-pattern
几种react的css模式方案的总结

### 正常的CSS，谈不上解决方案
```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

```
#### 优点
  没有
#### 缺点
  一大堆

### 内联代替module的伪解决办法
```
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
```
#### 优点
  - 没有引入额外的插件
  - 模仿了module的使用形式，只不过是通过内联样式
#### 缺点
  - 内联样式需要通过驼峰式命名，与正常CSS写法不太一致
  - 内联样式不能使用伪类以及伪元素的形式
  - 内联样式不能使用媒体查询

### CSS-in-JS
作为内联样式的增强版，虽然还是通过style而不是className，但是功能更加强大
[react-jss](http://cssinjs.org/react-jss?v=v8.6.1)  
```
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
const CSSInJs = () => (
  <div>
    css-in-js:
    <StyledButton>我是一个按钮</StyledButton>
    <StyledColorFont />
  </div>
);

export default CSSInJs;
```
#### 优点
  - 完全正常使用CSS，支持伪类，伪元素以及媒体查询，有点像vue的复杂版处理方式。
  - 还可以传入属性，动态赋值，这点挺强的~
#### 缺点
  - 感觉有一点点小麻烦，也可能写惯了原生的和css-module的，我只写了一个页面觉得不是很习惯。
> 除了JSS外，另外还有[Radium](https://formidable.com/open-source/radium/)和[Aphrodite](https://github.com/Khan/aphrodite),每种解决方案都有自己的特色。
```
// Radium
// Radium优秀的地方在于支持多样式以数组的形式传递，然后会自动合并样式
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
```
