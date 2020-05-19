```javascript
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Form() {
  let nameRef = React.useRef();
  let emailRef = React.useRef();
  let passwordRef = React.useRef();
  const handleSubmit = e => {
    console.log('name is ', nameRef.current.value);
    console.log('email is ', emailRef.current.value);
    console.log('password is ', passwordRef.current.value);
  }

  const handleReset = () => {
    nameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
  }

  return (
    <React.Fragment>
      <label>
        Name:
        <input
          placeholder="name"
          type="text"
          ref = {nameRef}
        />
      </label>
      <label>
        Email:
        <input
          placeholder="email"
          type="text"
          ref = {emailRef}
        />
      </label>
      <label>
        Password:
        <input
          placeholder="password"
          type="text"
          ref = {passwordRef}
        />
      </label>

      <hr />

      <button onClick = {()=>nameRef.current.focus()}>
        Focus Name Input
      </button>
      <button onClick = {()=>emailRef.current.focus()}>
        Focus Email Input
      </button>
      <button onClick = {()=>passwordRef.current.focus()}>
        Focus Password Input
      </button>

      <hr />

      <button onClick = {handleSubmit}>Submit</button>
      <button onClick = {handleReset}>Reset</button>
    </React.Fragment>
  )
}
const rootElement = document.getElementById("root");
ReactDOM.render(<Form />, rootElement);
```