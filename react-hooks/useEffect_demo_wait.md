```javascript
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Wait({ delay = 1000, placeholder, ui }) {
  let [show, setShow] = React.useState(false);
  React.useEffect(() => {
    let timer = setTimeout(() => {
      setShow(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return show ? ui : placeholder;
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