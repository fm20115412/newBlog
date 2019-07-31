#### TransitionGroup
1. a wrapper componnet
2. Defined, it’s a “state machine for managing the mounting and unmounting of components over time”. 

#### Transition

- in : In is the prop needed to tell the Transition to trigger the enter or exit animation. It's pretty simple, `true === entering`, `false === exiting`. 

- timeout : This is the amount in miliseconds for the transition to last. If given a single value, both the enter and exit transitions will have the same duration. You can specify them separately in the timeout prop by giving it an object with an enter and exit property.
eg: `timeout={{ enter: 300, exit: 500 }}`.

```
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Transition } from "react-transition-group";

class App extends Component {
  constructor() {
    super();
    this.state = {
      show: true
    };
  }
  toggle = () => {
    this.setState({
      show: !this.state.show
    });
  };
  render() {
    const {
      toggle,
      state: { show }
    } = this;
    const defaultStyle = {
      transition: `opacity 400ms ease-in-out`,
      opacity: 0
    };
    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
      exiting: { opacity: 1 },
      exited: { opacity: 0 }
    };
    return (
      <div>
        <button onClick={toggle}>Fade</button>
        <Transition in={show} timeout={400}>
          {status => (
            <div style={{ ...defaultStyle, ...transitionStyles[status] }}>
              This text will fade in and out
              {console.log(status)}
            </div>
          )}
        </Transition>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

#### CSSTransition


[Dynamic transitions with react-router and react-transition-group](https://medium.com/lalilo/dynamic-transitions-with-react-router-and-react-transition-group-69ab795815c9)
[A shallow dive into React Router v4 Animated Transitions](https://medium.com/@pshrmn/a-shallow-dive-into-react-router-v4-animated-transitions-4b73f634992a)
[Improve your UI with React Transition Group: A guide with examples](https://blog.logrocket.com/improve-your-ui-with-react-transition-group-999fa35f7cae/)