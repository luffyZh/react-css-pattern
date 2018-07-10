# react-css-pattern
几种react的css模式方案的总结,[项目地址:https://github.com/luffyZh/react-css-pattern](https://github.com/luffyZh/react-css-pattern)
### 普通CSS的不足
- react是组件化的语言，但是css不是为组件化设计的语言，全局引入整个文件会导致很多问题，比如命名冲突等。
- 样式与状态相关的情景越来越多，需要能直接访问state的CSS
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
### CSS Modules
CSS Modules不是react特有的解决办法，它是一种适用于所有基于webpack作为打包工具的开发场景。
通过在webpack里配置css-loader，就可以使用css modules。
```
// 为了避免命名冲突，生成一个半随机的类名
{
  loader: "css-loader",
  options: {
    importLoaders: 1,
    modules: true,
    localIdentName: "[name]__[local]___[hash:base64:5]"
  },
}
```
目前流行的react官方脚手架crete-react-app还不支持CSS Modules,但是有hack方案，就是rewired的方案。
通过react-app-rewired工具以及配置文件config-overrides.js，修改启动方式。
```
/* config-overrides.js */
const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override(config, env) {
  config = rewireCssModules(config, env);
  return config;
};
```
```
// 你的CSS文件 index.module.css
.container {
  margin-top: 10px;
}
.labelText {
  color: aqua;
  font-size: 20px;
}
.content-style {
  color: greenyellow;
  font-weight: bold;
}
// 组件使用方式
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
        <span className={styles.labelText}>label</span>
        <span className={styles['content-style']}>content</span>
      </div>
    )
  }
}
export default CSSModule;
```
#### 优点
- 组件化引入CSS并使用，可以避免命名冲突，使用起来符合习惯
- 通过*.module.css来命名的css文件才会被modules化，正常的*.css文件还是可以全局使用
#### 缺点
- 需要额外引入一些配置插件
- 既是优点也是缺点，后缀从.css变成.module.css不符合命名习惯
- 驼峰式命名规则才可以使用style.className的形式引入，中短线的形式需要以styles['class-name']的形式引入
> 据说creat-react-app v2.0就准备采用这种方案来直接引入CSS Modules

### CSS-in-JS终极解决方案
通过使用ES6模板字符串以及Vue解决方案的启发，解决了前人的痛点，包括写法复杂以及不支持css所有语法等。  
[styled-components](https://www.styled-components.com/)  
很多人也把这种形式看成是react中的CSS最佳解决方案。
```
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
```
#### 优点
 - 基本是vue解决方案在react里的最佳实践
 - 支持CSS全部写法，还支持继承
#### 缺点
- 基本没什么缺点，美中不足就是，组件稍微庞大的时候，起名有点费劲，考验自己的想象力了。
因为它的每一个样式标签都需要重定义一下，起一个新名字然后使用。  
- 有人觉得这种方式更有意义，语义化组件，每个部分是做什么的通过名字可以读出来;
也有人觉得这种方式过于麻烦，至少起名也是一个需要想象力的工作，想不出来全用拼音就尴尬了。

### Emotion —— 解决styled-components的美中不足的
[Emotion](https://emotion.sh/)  
The Next Generation of CSS-in-JS.这是Emotion官网首页的宣传语，下一代CSS-in-JS。  

```
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
```
#### 优点
- 可以使用原生标签，然后使用className来提供样式
- 提供两种使用方法，一种是模板字符串一种是react内联那种，官网称之为CSS Object方式。
#### 缺点
- 不支持动态传值，相比styled-component不够强大
> 官网提供了react-emotion,增加了styled-components的模式，但是需要额外配置babel插件提供支持
```
// .babelrc


{
  "env": {
    "production": {
      "plugins": [
        "emotion",
        ...otherBabelPlugins
      ]
    }
  },
  "plugins": ["emotion"]
}
```
```
import styled, { css } from 'react-emotion';
...

const Link = styled.a`
  min-width: 12rem;
  margin: 0 auto 20px;
  padding: ${props => props.primary ? 18 : 16}px;
  border-radius: 5px;
  text-decoration: none;
  border: ${props =>
    props.primary ? 'none' : '3px solid currentColor'};
  background: ${props =>
    props.primary &&
    'linear-gradient(90deg, #D26AC2, #46C9E5)'};
  color: ${props =>
    props.primary ? '#1D2029' : '#D26AC2'};
  &:hover {
    opacity: 0.95;
  }
  @media (min-width: 768px) {
    margin: 0 20px 0 0;
    &:last-child {
      margin: 0;
    }
  }
`
const className = css`
      background-color: hotpink;
      &:hover {
        color: ${color};
      }
    `
```

### 总结
暂时就这些，还有挺多没讲到但是主流的差不多了，相信以后会有更多更好的解决方案~个人顶一个 styled-components.

