## code
```js
class App extends Component {
  render() {
    return (
      <Router>
        <h2>Accounts</h2>
        <ul>
          <li>
            <Link to="/netflix">Netflix</Link>
          </li>
          <li>
            <Link to="/zillow-group">Zillow Group</Link>
          </li>
          <li>
            <Link to="/yahoo">Yahoo</Link>
          </li>
          <li>
            <Link to="/modus-create">Modus Create</Link>
          </li>
        </ul>

        <Route path="/:id" component={Child} />
      </Router>
    );
  }
}
const Child = ({ match }) => {
  console.log(match);
    return (<div>
          <h3>ID: {match.params.id}</h3>
          </div>)
}

export default App;

```
## 概念
在react router4中，match用于获取路径上的参数，match是使用渲染时传递到组件内的一个props，在react组件内部通过props.match获取match的属性。
```
<Route path="/:id" component={Child} />
```
当访问`/netflix`时，在`Child`组件内可以通过`props.match.params.id`来获取路由匹配的id。

## 参考文档
[Route Params](https://scotch.io/courses/using-react-router-4/route-params)

[
URL Parameters with React Router](https://tylermcginnis.com/react-router-url-parameters/)