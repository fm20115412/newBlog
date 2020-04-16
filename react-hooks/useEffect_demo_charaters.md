```javascript
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  let [value, setValue] = React.useState("");
  const change = e => {
    setValue(e.target.value);
  };
  React.useEffect(() => {
    document.title = `${240 - value.length} charaters left`;
  }, [value]);
  let disable = value.length <= 240 && value.length > 0 ? false : true;
  return (
    <div className="App">
      <input type="textarea" value={value} onChange={change} />
      <button disabled={disable}>post</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```