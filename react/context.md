[TOC]
## 解决的问题
```
import React from 'react';

const App = () => {
    return <Menu colour="blue" language="en" />;
}

function Menu(props) {
    return(
        <MenuItem 
            colour={props.colour}
            language={props.language}
        />
    )
}

function MenuItem(props) {
    return(
        <div>
            <p>Theme colour: {props.colour}</p>
            <p>Locale: {props.language}</p>
        </div>
    );
}

export default App;
```
在上面的代码中，可以在`<App />`中最顶层的组件中配置诸如语言或主题颜色之类的全局属性。这些属性将由子组件以及孙子组件使用。在上面的示例中，这里的`<MenuItem>`元素可能需要颜色值来进行样式设置，并需要使用语言来进行本地化。但是，即使未在`<Menu />`中使用这些属性，也必须通过`<Menu />`组件传递这些属性。这会是件很麻烦的事，因为必须将这个值层层传递所有组件。

`<App />` → `<Menu />` → `<MenuItem />`

当你不想在组件树中通过逐层传递props的方式来传递数据时，可以使用Context来实现跨层级的组件数据传递。
## api
### React.createContext
```
const MyContext = React.createContext(defaultValue);
```
创建一个context对象。组件会向组件所处的树中距离最近的那个Provider进行匹配context。

当组件所处的树没有匹配到Provider (不使用Provider组件) 时，defaultValue参数才会生效。

context 对象有两个属性，分别是 Provider 与 Consumer，可以通过解构得到：
```
const { Provider, Consumer } = MyContext;

```
### Context.Provider
每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

Provider 接收一个 value 属性，传递给消费组件。

```
class App extends React.Component {
  render() {
    <MyContext.Provider value="tom">
        ...
    </MyContext.Provider>;
  }
}
```

### Context.Consumer
这需要函数作为子元素（function as a child）这种做法。这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。
```
<MyContext.Consumer>
    {value => <div>hello, I am {value}!</div>}
</MyContext.Consumer>
```

### Class.contextType 
除了使用 Consumer 组件来获得 context 的 value 以外，还可以使用组件的 contextType 属性来传递 context。

contextType 有两种传递的方法，古老而保险的用法是：

```
class MyClass extends React.Component {
  render() {
    return <div>hello, I am {this.context}!</div>;
  }
}
// 通过将创建的context实例直接传给组件的contextType属性来传递context
// 组件内任何地方都可以直接使用this.context来访问context的value
MyClass.contextType = MyContext;
```
新潮而时尚的用法是：
```
class MyClass extends React.Component {
  // 通过static字段来初始化contextType
  // 组件内任何地方同样使用this.context来访问context的value
  static contextType = MyContext;
  render() {
    return <div>hello, I am {this.context}!</div>;
  }
}
```
**注意**
- contextType 只能在类组件中使用
- 一个组件如果有多个 consumer ， contextType 只对其中一个有效，所以说，contextType 只能有一个
### Context.displayName
context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。

示例，下述组件在 DevTools 中将显示为 MyDisplayName
```
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```
## demo
重写上面的例子
```
import React from 'react';

const AppContext = React.createContext({ colour: 'blue', lang: 'en' });

const App = () => 
    <AppContext.Provider value={{ colour: 'blue', lang: 'fr' }}>
        <Menu />
    </AppContext.Provider>;

function Menu() {
    return <MenuItem />
}

const MenuItem = () =>
    <AppContext.Consumer>
        { value =>
            <div>
                <p>Theme colour: {value.colour}</p>
                <p>Locale: {value.lang}</p>
            </div>
        }
    </AppContext.Consumer>

export default App;
```
在上面的代码中，主题相关信息从`<App>`组件直接传递到`<MenuItem>`组件，而没有映射到中间的`<Menu>`组件。

在上面的例子中，传递给React.Context的值是恒定的。因此，传递上下文没有太多优势。但是在实际应用中，该值是根据用户交互而改变的。作为示例，可以通过用户偏好来改变应用颜色，或者可以通过地理区域来切换语言。

在`<App>`组件中，主题值保持在状态中。此状态值作为Context.Provider的值传递。语言相关的状态值可以通过按钮指定的其他组件进行更改。当状态在`<App>`中更改时，它也会反映在上下文中的值中。因此，任何Context.Consumer访问值都将获得当前更新的更改。

```
import React, { useState } from 'react';

const languages = { en: 'en', fr: 'fr' };
const initialTheme = { colour: 'blue', lang: languages.en, setLanguage: () => {} };
const { Provider: AppProvider, Consumer: AppConsumer } = React.createContext(initialTheme);

const App = () => {

    const setLanguage = (lang) => {
        setTheme({ ...theme, lang: lang });
    }

    const [theme, setTheme] = useState({...initialTheme, setLanguage: setLanguage});

    return (
        <AppProvider value={theme}>
            <LanguagePicker />
            <Menu />
        </AppProvider>
    );
}

const Menu = () => <MenuItem />;

const LanguagePicker = () =>
    <AppConsumer>
        {context =>
            <div>
                <button onClick={() => context.setLanguage(languages.en)}>English</button>
                <button onClick={() => context.setLanguage(languages.fr)}>French</button>
            </div>
        }
    </AppConsumer>

const MenuItem = () =>
    <AppConsumer>
        { value =>
            <div>
                <p>Theme colour: {value.colour}</p>
                <p>Locale: {value.lang}</p>
            </div>
        }
    </AppConsumer>

export default App;
```
当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。

## 多个context的使用
```
<LanguageContext.Provider value={lang}>
   <ColourContext.Provider value={colour}>
      <Menu />
   </ColourContext.Provider>
</LanguageContext.Provider>
```
```
<LanguageContext.Consumer>
   {lang => (
   <ColourContext.Consumer>
      {colour => (
         <p>Lang: {lang} and colour: {colour}</p>
      )}
   </ColourContext.Consumer>
   )}
</LanguageContext.Consumer>
```
## 参考文献
[1. Introduction to React Context API](https://medium.com/@chathuranga94/introduction-to-react-context-api-90f5e4d7a7a9)
[2. 聊一聊我对 React Context 的理解以及应用](https://www.jianshu.com/p/eba2b76b290b?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)
[3. React Context ](https://learn.tylermcginnis.com/courses/502559/lectures/9336930)