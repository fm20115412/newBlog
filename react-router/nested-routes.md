```
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "./styles.css";

const topicList = [
  {
    name: "React Router",
    id: "react-router",
    description: "Declarative, component based routing for React",
    resources: [
      {
        name: "URL Parameters",
        id: "url-parameters",
        description:
          "URL parameters are parameters whose values are set dynamically in a page's URL. This allows a route to render the same component while passing that component the dynamic portion of the URL so it can change based off of it.",
        url: "https://tylermcginnis.com/react-router-url-parameters/"
      },
      {
        name: "Programmatically navigate",
        id: "programmatically-navigate",
        description:
          "When building an app with React Router, eventually you'll run into the question of navigating programmatically. The goal of this post is to break down the correct approaches to programmatically navigating with React Router.",
        url: "https://tylermcginnis.com/react-router-programmatically-navigate/"
      }
    ]
  },
  {
    name: "React.js",
    id: "reactjs",
    description: "A JavaScript library for building user interfaces",
    resources: [
      {
        name: "React Lifecycle Events",
        id: "react-lifecycle",
        description:
          "React Lifecycle events allow you to tie into specific phases of a component's life cycle",
        url:
          "https://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js/"
      },
      {
        name: "React AHA Moments",
        id: "react-aha",
        description: "A collection of 'Aha' moments while learning React.",
        url: "https://tylermcginnis.com/react-aha-moments/"
      }
    ]
  },
  {
    name: "Functional Programming",
    id: "functional-programming",
    description:
      "In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.",
    resources: [
      {
        name: "Imperative vs Declarative programming",
        id: "imperative-declarative",
        description:
          "A guide to understanding the difference between Imperative and Declarative programming.",
        url: "https://tylermcginnis.com/imperative-vs-declarative-programming/"
      },
      {
        name:
          "Building User Interfaces with Pure Functions and Function Composition",
        id: "fn-composition",
        description:
          "A guide to building UI with pure functions and function composition in React",
        url:
          "https://tylermcginnis.com/building-user-interfaces-with-pure-functions-and-function-composition-in-react-js/"
      }
    ]
  }
];

function Home({ match }) {
  console.log("Home", match);
  return <h2>Home</h2>;
}
function Resource({ match }) {
  console.log("Resource", match);
  const selectResource = topicList
    .find((item, index) => item.id === match.params.topicid)
    .resources.find((item, index) => item.id === match.params.resourceid);
  return (
    <div>
      <p>{selectResource.name}</p>
      <p>{selectResource.description}</p>
      <a href={selectResource.url}>More info.</a>
    </div>
  );
}
function Topic({ match }) {
  console.log("Topic", match);
  const selectTopic = topicList.find(
    (item, index) => item.id === match.params.topicid
  );
  const resourceList = selectTopic.resources.map((item, index) => {
    return (
      <li key={item.id}>
        <Link to={`${match.url}/${item.id}`}>{item.name}</Link>
      </li>
    );
  });
  return (
    <div>
      <p>{selectTopic.description}</p>
      <ul>{resourceList}</ul>
      <Route path={`${match.path}/:resourceid`} component={Resource} />
    </div>
  );
}
function Topics({ match }) {
  console.log("Topics", match);
  const list = topicList.map((item, index) => {
    return (
      <li key={item.id}>
        <Link to={`${match.url}/${item.id}`}>{item.name}</Link>
      </li>
    );
  });
  return (
    <div>
      <ul>{list}</ul>
      <Route path={`${match.path}/:topicid`} component={Topic} />
    </div>
  );
}
function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>
      <Route exact path="/" component={Home} />
      <Route path="/topics" component={Topics} />
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```