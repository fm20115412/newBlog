[TOC]
## 一、[Distribute Candies to People](https://leetcode-cn.com/problems/distribute-candies-to-people/)
## 二、思路
最直观的方法是不断地遍历数组，如果还有糖就一直分，直到没有糖为止。
```
var distributeCandies = function(candies, num_people) {
    let arr = Array(num_people).fill(0);
    let i = 0;
    while (candies > 0){
        arr[parseInt(i%num_people)] += Math.min(candies,i+1);
        candies -=  Math.min(candies,i+1);
        i++;
    }
    return arr;
};
```