```
function _new(fn, ...rest){
  const newObj = Object.create(fn.prototype);
  const result = fn.apply(newObj, rest);
  return typeof result === 'object' ? result : newObj;
}

function Person(firtName, lastName) {
  this.firtName = firtName;
  this.lastName = lastName;
}
const p1 = _new(Person, 'Chen', 'Tianbao');
```
