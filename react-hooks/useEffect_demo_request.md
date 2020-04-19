```javascript
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const postIds = [1,2,3,4,5,6,7,8]

function fetchPost (id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => res.json())
}

function Post(){
  let [index,setIndex] = React.useState(0);
  let [content, setContent] = React.useState(null);
  let [error, setError] = React.useState(null);
  React.useEffect(()=>{
    fetchPost(postIds[index]).then(content=>{
      setContent(content);
    },error=>{
      setError(error);
    })
  }, [index]);
 const handleclick = ()=>{
   setContent(null);
   setIndex((index + 1) % postIds.length)
 }
  if (error){
    return <React.Fragment>
      <div>{error.message}</div>
      <button onClick={handleclick}>Next</button>
    </React.Fragment>
  } 
  if (content) {
    return <React.Fragment>
      <h2 className='title'>{content.title}</h2>
      <hr />
      <div className='body'>{content.body}</div>
      <button onClick={handleclick}>Next</button>
    </React.Fragment>
  }
  return <div>Loading...</div>
}
function App() {
  return (
    <div className="App">
      <Post />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```