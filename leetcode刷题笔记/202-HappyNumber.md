### 一、[Happy Number题目链接](https://leetcode.com/problems/happy-number/)
### 二、思路
解这道题的关键在于知道：所有不快乐数的数位平方和计算，最後都会进入 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 的循环中。
#### a. 判断是否有死循环
因此，我们可以将每次计算的数位平方和放在Set结构里，然后再检查每次得到的数值是否出现过，出现过就说明死循环了，返回false.
```
var isHappy = function(num) {
    let sum = digitSquareSum(num);
    let set = new Set();
    set.add(sum)
    while(sum!=1){
        sum = digitSquareSum(sum);
        if(set.has(sum)){
            return false
        }else{
            set.add(sum)
        }
    }
    return true;
};
function digitSquareSum(num){
    let sum = 0;
    while(num!=0){
        let reminder = num%10;
        num = Math.floor(num/10);
        sum += Math.pow(reminder, 2)
    }
    return sum
}
```
**时间复杂度：** 由于会在有限的步骤里面得到结果，因此时间复杂度是$O(1)$。

**空间复杂度：** $O(1)$
#### b.判断是否有4
如上面的介绍，凡是不开心数，计算过程中肯定有4，因此可以将数位平方和和4比较，相等则返回false,这样做相比于上面而言，可以不用新增set结构。
```
var isHappy = function(num) {
    let sum = digitSquareSum(num);
    while(sum!=1){
        sum = digitSquareSum(sum);
        if(sum == 4){
            return false
        }
    }
    return true;
};
function digitSquareSum(num){
    let sum = 0;
    while(num!=0){
        let reminder = num%10;
        num = Math.floor(num/10);
        sum += Math.pow(reminder, 2)
    }
    return sum
}
```
**时间复杂度：** 由于会在有限的步骤里面得到结果，因此时间复杂度是$O(1)$。

**空间复杂度：** $O(1)$
