
Often times, when building a React app, validating the props that are being passed to a component is all you need. If you can be sure that the props being passed to a component are the right type, for the most part, you can assume your component is going to run correctly. 

1. 安装prop-types
```
npm i prop-types
```
2. 引入prop-types
```
import PropTypes from 'prop-types'
```
3. 给组件加propTypes属性
```
export default function Hello ({ name }) {
  return <h1>Hello, {name}</h1>
}

Hello.propTypes = {
  name: PropTypes.string.isRequired
}
```
4. 如果props不符合规范，控制台会报warning.
```
<Hello name='Tyler' /> // 👍

<Hello /> 
// Warning: Failed prop type: The prop `name` is marked as required in `Hello`, but its value is `undefined`.

<Hello name={true}/> 
// Warning: Failed prop type: Invalid prop `name` of type `boolean` supplied to `Hello`, expected `string`.
```