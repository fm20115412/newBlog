[TOC]
### React.memo
以下面这个例子举例, 我们将有两个状态值，`fibCount`和`primeCount`。`fibCount`用于推导`Fibonacci`序列中的`fibCount`数，`primeCount`用于推导`primePrime`。推导出第 N 个Fibonacci 和 Prime都是非常耗时的操作。

无论`fibCount` 还是 `primeCount`改变，App都会重新渲染，相应地`NthFib` 和 `NthPrime` 也会重现渲染。而`NthFib` 和 `NthPrime`都是计算耗时的组件，因此我们希望`fibCount`改变时只会渲染`NthFib`，`primeCount`改变时只会渲染`NthPrime`。

可在[这里](https://codesandbox.io/s/performance-prime-fib-start-i75p3?from-embed=&file=/src/math.js)预览效果

```js
// NthFib.js
import React from 'react'
import { calculateFib, suffixOf } from './math'
export default function NthFib({ count, increment }) {
  const fib = calculateFib(count)

  return (
    <div className='container'>
      <h2>Nth Fib</h2>
      <p>
        The <b>{suffixOf(count)}</b> number in the fibonacci sequence is <b>{fib}</b>.
      </p>
      <button onClick={increment}>Next number</button>
    </div>
  )
}
```

```js
// NthPrime
import React from 'react'
import { calculatePrime, suffixOf } from './math'

export default function NthPrime({ count, increment }) {
  const prime = calculatePrime(count)

  return (
    <div className='container'>
      <h2>Nth Prime</h2>
      <p>
        The <b>{suffixOf(count)}</b> prime number is <b>{prime}</b>.
      </p>
      <button onClick={increment}>Next prime</button>
    </div>
  )
}
```

```jsx
// index.js

import React from "react"
import ReactDOM from "react-dom"
import NthFib from './NthFib'
import NthPrime from './NthPrime'

function App() {
  const [fibCount, setFibCount] = React.useState(1)
  const [primeCount, setPrimeCount] = React.useState(1)
  let  
  const handleReset = () => {
    setFibCount(1)
    setPrimeCount(1)
  }

  const add10 = () => {
    setFibCount((c) => c + 10)
    setPrimeCount((c) => c + 10)
  }

  return (
    <React.Fragment>
      <button onClick={add10}>Add 10</button>
      <button onClick={handleReset}>Reset</button>
      <hr />
      <NthFib 
        count={fibCount}
        increment={() => setFibCount((c) => c + 1)}
      />
      <hr />
      <NthPrime 
        count={primeCount}
        increment={() => setPrimeCount((c) => c + 1)}
      />
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

```jsx
// math.js
export function calculateFib(n, a = 1, b = 0) {
    console.count('nthFib called')
    return n === 0
        ? b
        : calculateFib(n - 1, b, a + b)
}

export function suffixOf(i) {
    let j = i % 10
    let k = i % 100

    if (j === 1 && k !== 11) {
        return i + "st"
    }
    if (j === 2 && k !== 12) {
        return i + "nd"
    }
    if (j === 3 && k !== 13) {
        return i + "rd"
    }
    return i + "th"
}

const isPrime = (n) => {
    if (n === 1) return false

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false
    }
    return true
}

export function calculatePrime(n) {
    console.count('nthPrime called')
    const primes = []
    let i = 2
    while (primes.length < n) {
        if (isPrime(i)) {
            primes.push(i)
        }
        i++
    }
    return primes[n - 1]
}
```
这个时候我们就可以把组件封装在 `React.memo`里面，从而只会让它们在props属性改变时才会重新渲染。
```
export default React.memo(NthFib)
export default React.memo(NthPrime)
```
> React.memo is a Higher-order component that lets you skip re-rendering a component if its props haven’t changed. The way it does this is when a component is wrapped in React.memo(), React will render the component and memoize the result. On subsequent re-renders, React will perform a shallow comparison (===) between the previous props and the new props - if the props haven’t changed, React will skip rendering the component and reuse the last rendered result.

### useCallback
但是很遗憾，上面尽管使用了`React.memo`封装，但App重新渲染时 `NthFib` 和 `NthPrime` 还是会同时渲染，这是因为在 `NthFib` 和 `NthPrime`使用了内联函数，导致每次App重新渲染时，`increment`都指向新的引用，使得`memo`认为`props`发生了改变，从而重新渲染了`NthFib` 和 `NthPrime`
```js
<NthFib 
    count={fibCount}
    increment={() => setFibCount((c) => c + 1)}
/>
<NthPrime 
    count={primeCount}
    increment={() => setPrimeCount((c) => c + 1)}
/>
```
这里我们可以使用`useCallback`将函数包装一下：
```js
const memoizedCallback = useCallback(() => 
  doSomething(a, b),
  [a, b],
)
```
> useCallback returns a memoized callback. What this means is that any function you create with useCallback won’t be re-created on subsequent re-renders. It takes two arguments, a function and an array of values that the function depends on. The memoized function it returns will only change if one of the values in the dependency array change.

`useCallback`正好可以解决我们的问题，不同于传递一个内联函数，我们可以给组件传递`useCallback`封装后的函数。这个函数将会在App第一次渲染时创建，后续的渲染都会复用。因此React.memo在比较上次的`increment`和本次的`increment`时，发现它们引用的是同一个值，而不会重新渲染。

改后的代码如下 :
```js
const incrementFib = React.useCallback(() => 
    setFibCount((c) => c + 1), 
    []
)
const incrementPrime = React.useCallback(() => 
    setPrimeCount((c) => c + 1), 
    []
)
<NthFib 
    count={fibCount}
    increment={incrementFib}
/>
<NthPrime 
    count={primeCount}
    increment={incrementPrime}
/>      
```
### useMemo
上面我们使用memo是因为NthFib 和 NthPrime是两个计算耗时的组件，我们希望fibCount改变时只会重新渲染NthFib，同理primeCount改变时只会重新渲染NthPrime。

由于`NthFib` 和 `NthPrime`的`increment`上使用了内联函数，导致App组件重新渲染时，`increment`属性的值都会改变，因此我们使用`useCallback`对函数进行封装, 使得函数在App组件第一次渲染时被创建，后续的渲染都会得到复用。

`memo + useCallback` 满足了我们的需求。

但回过头来想一想，真正计算耗时的其实是 `NthFib` 的 `calculateFib` 函数，`NthPrime` 里的 `calculatePrime` 函数。 因此解决上面的问题可以换一种思路，即每次执行 `calculateFib` 或 `calculatePrime`函数之前，判断参数有没有变化，如果没有变化则复用之前的值，而这正是`useMemo`的核心工作：
```js
const memoizedValue = useMemo(() => 
  computeExpensiveValue(a, b),
  [a, b]
)
```
> useMemo takes two arguments, a function and an array of values that the function depends on. It returns a value that will be computed on the initial render and whenever any of the values in the dependency array change.

现在我们可以移除`React.memo`和`useCallback`，而只是记住真正计算耗时的部分，`calculateFib` 和 `calculatePrime`，因此代码可以改成：
```js
// NthFib.js
export default function NthFib({ count, increment }) {
  const fib = React.useMemo(() => calculateFib(count), [count])

  return (
    <div className='container'>
      <h2>Nth Fib</h2>
      <p>
        The <b>{suffixOf(count)}</b> number 
        in the fibonacci sequence is <b>{fib}</b>.
      </p>
      <button onClick={increment}>Next number</button>
    </div>
  )
}
```

```js
// NthPrime.js
export default function NthPrime({ count, increment }) {
  const prime = React.useMemo(() => calculatePrime(count), [count])

  return (
    <div className='container'>
      <h2>Nth Prime</h2>
      <p>
        The <b>{suffixOf(count)}</b> prime 
        number is <b>{prime}</b>.
      </p>
      <button onClick={increment}>Next prime</button>
    </div>
  )
}
```
```js
// index.js
function App() {
  const [fibCount, setFibCount] = React.useState(1)
  const [primeCount, setPrimeCount] = React.useState(1)

  const handleReset = () => {
    setFibCount(1)
    setPrimeCount(1)
  }

  const add10 = () => {
    setFibCount((c) => c + 10)
    setPrimeCount((c) => c + 10)
  }

  return (
    <React.Fragment>
      <button onClick={add10}>Add 10</button>
      <button onClick={handleReset}>Reset</button>
      <hr />
      <NthFib 
        count={fibCount}
        increment={() => setFibCount((c) => c + 1)}
      />
      <hr />
      <NthPrime 
        count={primeCount}
        increment={() => setPrimeCount((c) => c + 1)}
      />
    </React.Fragment>
  );
}
```