#### 一、[Plus One 题目链接](https://leetcode.com/problems/plus-one/)
#### 二、代码
```
var plusOne = function(digits) {
    for(let i = digits.length - 1;i >= 0;i--){
        if(digits[i] < 9){
            digits[i]++;
            return digits;
        }else{
            digits[i]=0;
        }
    }
    digits.unshift(1);
    return digits;
};
```
#### 三、思路
这道题比较简单，思路如上面的代码所示。刚开始以为很简单，只需要将数组转化成整数之后再加1，再将+1后的整数转换成数组就可以了，但没有考虑到如果数组比较长，整形数据无法表示的问题，比如
input : [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]
这样num会为：NaN

**错误示范如下：**
```
var plusOne = function(digits) {
    let num = parseInt(digits.join(''));
    let str = String(++num);
    return str.split('');
};
```
