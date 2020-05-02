```js
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    Implement the `useFetch` function. 
*/

function useFetch(url) {
  let [loading, setLoading] = React.useState(true);
  let [data, setData] = React.useState(null);
  let [error, setError] = React.useState(null);
  React.useEffect(() => {
    console.log("我被调用了");
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setError(null);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return {
    loading,
    data,
    error
  };
}

const postIds = [1, 2, 3, 4, 5, 6, 7, 8];

function App() {
  const [index, setIndex] = React.useState(0);

  const rawdata = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postIds[index]}`
  );
  console.log(rawdata);
  const { loading, data: post, error } = rawdata;
  const incrementIndex = () => {
    setIndex(i => (i === postIds.length - 1 ? i : i + 1));
  };

  if (loading === true) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <React.Fragment>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </React.Fragment>
    );
  }

  return (
    <div className="App">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {index === postIds.length - 1 ? (
        <p>No more posts</p>
      ) : (
        <button onClick={incrementIndex}>Next Post</button>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```