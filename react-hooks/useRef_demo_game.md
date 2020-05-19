```javascript
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    You're building an app to see how many times you can click
    a button in 10 seconds. 

    The UI has three parts, a button, a timer counting down from 10,
    and a count of how many times you've clicked the button.

    Once the timer reaches 0, remove the button from the UI.
*/

function CounterGame() {
  let [count, setCount] = React.useState(0);
  let [seconds,setSeconds] = React.useState(10);
  let id = React.useRef();
  React.useEffect(() => {
    id.current = setInterval(() => {
      setSeconds(seconds => {
        console.log('seconds is ', seconds);
          if (seconds === 0){
              clearInterval(id.current);
              return 0;
          } else {
              return seconds-1;
          }
      });
    }, 1000);
  }, []);
  return (
    <div className="App">
      <div>{count}</div>
      <div>Time Left : {seconds} Seconds</div>
      {seconds > 0 ? <button
        onClick={() => {
          setCount(count => count + 1);
        }}
      >
        +1
      </button> : null}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CounterGame />, rootElement);
```