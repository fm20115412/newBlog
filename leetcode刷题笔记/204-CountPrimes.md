### 一、[Count Primes 题目链接](https://leetcode.com/problems/count-primes/)
### 二、思路
找出n范围内所有合数，并做标记。未做标记的即为素数，统计未做标记的数个数即为原题目解。
如何找到n范围内所有合数？

a. 将第一个素数2赋值给i。

b. 当i小于n时:
1. 对于已确定的素数i,将i的全部倍数标记为合数。
2. 离i最近的下一个未被标记为合数的数即为素数。将下一个素数赋值给i.

上面算法有可以优化的地方：（b.1）步找合数时，无需从2开始算i的倍数，而是从i倍开始算，即i * i。举个例子，当 i 为 5 时， 5 * 2, 5 * 3, 5 * 4 的记号，已经在 i 分别为 2,3,4的时候做了。所以，可以直接从i倍开始算。
```
var countPrimes = function(n) {
    if(n<=1){
        return 0;
    }
    var isPrime = new Array(10),count=0;
    for(var i=2;i<Math.sqrt(n);i++){
        for(var j=i;i*j<n;j++){
             isPrime[i*j] = false
        }
    }
    for(var i =2;i<n;i++){
        if(isPrime[i] == undefined){
             count++;
        }
    }
    return count
};

```
**时间复杂度：**$O(n*lglgn)$，暂时还理解不了为啥时间复杂度是这个。

**空间复杂度：** $O(n)$
