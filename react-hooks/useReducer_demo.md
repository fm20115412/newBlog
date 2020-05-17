```javascript
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function reducer(state, action) {
  if (action.type === "loading") {
    return { ...state, loading: true };
  } else if (action.type === "success") {
    return { ...state, data: action.data, loading: false, error: null };
  } else if (action.type === "error") {
    return { ...state, loading: false, error: action.data };
  } else {
    return { ...state, loading: false, error: new Error("参数错误") };
  }
}
function useFetch(url) {
  let initData = {
    loading: true,
    data: null,
    error: null
  };
  let [state, dispatch] = React.useReducer(reducer, initData);
  React.useEffect(() => {
    async function fetchData(url) {
      dispatch({ type: "loading" });
      try {
        let response = await fetch(url);
        let data = await response.json();
        dispatch({
          type: "success",
          data: data
        });
      } catch (error) {
        dispatch({
          type: "error",
          data: error
        });
      }
    }
    fetchData(url);
  }, [url]);
  return state;
}
const postIds = [1, 2, 3, 4, 5, 6, 7, 8];

function App() {
  const [index, setIndex] = React.useState(0);

  const { loading, data: post, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postIds[index]}`
  );

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
      {error && <p>{error}</p>}
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