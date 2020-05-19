### useContext()：共享状态钩子
`Context`相关内容可以参考：[Context](./react/context.md)，这里我们只是简单回顾一下： 

1. 使用`createContext`创建一个Context
```javascript
const LocaleContext = React.createContext()
```
2. 把共享的数据传递给`Provider`的`value`属性
```javascript
const [locale, setLocale] = React.useState('en')
return (
    <LocaleContext.Provider value={locale}>
        <Nav />
    </LocaleContext.Provider>
)
```
3. 在Consumer组件里通过render prop来获取共享的数据
```javascript
export default function Nav () {
  return (
    <LocaleContext.Consumer>
      {({ locale }) => locale === "en" 
        ? <EnglishNav />
        : <SpanishNav />}
    </LocaleContext.Consumer>
  );
}
```
从上面可以看出，在`Consumer`里面我们通过一个函数来获取传递的数据，这种写法不太优雅，尤其是对于嵌套的使用`Consumer`:
```javascript
export default function Nav () {
  return (
    <AuthedContext.Consumer>
      {({ authed }) => authed === false
        ? <Redirect to='/login' />
        : <LocaleContext.Consumer>
            {({ locale, toggleLocale }) => locale === "en" 
              ? <EnglishNav toggleLocale={toggleLocale} />
              : <SpanishNav toggleLocale={toggleLocale} />}
          </LocaleContext.Consumer>}
    </AuthedContext.Consumer>
  ) 
}
```
`useContext`就是帮我们解决这个问题的，它的语法为:
```js
const value = useContext(MyContext);
```
它接收一个`context`对象作为参数，并返回传递给该对象`Provider`的`value`值，因此上面的例子我们可以改写成：
```js
export default function Nav () {
  const { locale } = React.useContext(
    LocaleContext
  )

  return locale === 'en'
    ? <EnglishNav />
    : <SpanishNav />
}
```
嵌套的`Consumer`可以写成：
```js
export default function Nav () {
  const { authed } = React.useContext(AuthedContext)

  if (authed === false) {
    return <Redirect to='/login' />
  }

  const { locale, toggleLocale } = React.useContext(
    LocaleContext
  )

  return locale === 'en'
    ? <EnglishNav toggleLocale={toggleLocale} />
    : <SpanishNav toggleLocale={toggleLocale} />
}
```