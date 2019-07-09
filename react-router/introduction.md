### code
一个简单的react-router应用如下：
```
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>

      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/users" component={Users} />
    </Router>
  );
}
function Home() {
  return <div>Home</div>;
}
function About() {
  return <div>About</div>;
}
function Users() {
  return <div>Users</div>;
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```
### 组件
#### BrowserRouter

#### Link

#### Route

