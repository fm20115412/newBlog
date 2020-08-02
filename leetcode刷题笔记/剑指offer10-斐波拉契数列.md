### 描述
```javascript
F(0) = 0,   
F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
```
### 递归
```javascript
function Fibonacci(n) {
    if (n < 2) {
    return n;
    }
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}
```
缺点：很多节点的计算是重复的，而且重复的节点数会随着n的增大而急剧增加。
### 动态规划
```javascript
function Fibonacci(n)
{
  let count = [0, 1]
  if (n < 2) {
    return count[n]
  }
  for (let i = 2; i < n + 1; i++) {
    count[i] = count[i - 1] + count[i - 2]
  }
  return count[n]
}
```
分析：避免重复计算，把已经得到的数列中间想保存起来，从下往上计算，时间复杂度是O(n)。
### 空间复杂度更低的动态规划
```javascript
function Fibonacci(n) {
  if(n <= 1) {
    return n
  } else {
    let f0 = 0, f1 = 1, f2;
    for(let i = 2; i <= n; i++) {
      f2 = f0 + f1
      f0 = f1
      f1 = f2
    }
    return f2
  }
}
```
