```javascript
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function useWait (delay) {
  let [wait,setWait] = React.useState(false);
  React.useEffect(function(){
    let timer = setTimeout(function(){
      setWait(true);
      return function(){
        clearImmediate(timer);
      }
    },delay)
  },[])
  return wait
}

function Wait({ delay = 1000, placeholder, ui }) {
  const show = useWait(delay)

  return show === true
    ? ui
    : placeholder
}

function App() {
  return (
    <div className="App">
      <Wait
        delay={3000}
        placeholder={<p>Waiting...</p>}
        ui={<p>This text should appear after 3 seconds.</p>}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```