```javascript
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function useWindowDimensions() {
  let [Dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  React.useEffect(function() {
    let listener = function() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return Dimensions;
}

function App() {
  const { width, height } = useWindowDimensions();

  return (
    <div className="App">
      <h2>width: {width}</h2>
      <h2>height: {height}</h2>
      <p>Resize the window.</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```