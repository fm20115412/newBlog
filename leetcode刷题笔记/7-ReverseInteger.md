### 一、[Reverse Integer题目链接](https://leetcode-cn.com/problems/reverse-integer/)
### 二、思路
#### a. 数组法
```
var reverse = function(x) {
    const edge = Math.pow(2, 31)
    const max = edge - 1;
    const min = -edge;
    let result = (x > 0 ? 1 : -1) * String(x).split('').filter(x=>x != '-').reverse().join('')
    return result > max || result < min ? 0 : result
};
```
缺点：提交记录上的性能较差
#### b. 取余法
为了便于解释，我们假设 result 是正数。
(1). 题目中数值范围为 $[-Math.pow(2,31) , Math.pow(2,31)  − 1]$，我们令$edge =  parseInt(Math.pow(2,31)/10);$
(2). 如果 $temp = result * 10+pop$ 导致溢出，那么一定有 $result ≥ edge$
(3). 如果$result>edge$，那么 $temp=result * 10+pop$ 一定会溢出。
(4). 如果$result==edge$，那么$pop>7$，$temp=result * 10+pop$就会溢出。
当result为负时可以应用类似的逻辑。
```
var reverse = function(x) {
   const edge =  parseInt(Math.pow(2,31)/10);
   let result = 0;
   while(x!=0){
        let pop = parseInt(x%10);
        x = parseInt(x/10);
        if (result > edge || result == edge && pop > 7){return 0}
        if (result < -edge || result == -edge && pop < -8) {return 0}
        result = result * 10 + pop;
   }
   return result
};
```
复杂度分析：
时间复杂度：$O(log(x))$,$x$中大约有$log10(x)$位数字。
空间复杂度：$O(1)$。
### 三、补充说明
1. Math.pow(2,31) = 2147483648
2. 先来看看除法运算中求余数的整个过程，a、b、c 和 d 分别为被除数、除数、商和被除数。
```
求商：c = a / b;
求模或者余数：d = a - c * b;
```
3. JS中取余运算符运算结果的正负号由第一个运算子的正负号决定，比如：
```
-1 % 2 // -1
1 % -2 // 1
```
4. JS中取整操作
向零取整，向0方向取最接近精确值的整数，换言之就是舍去小数部分，因此又称截断取整（Truncate）。这种取整方式下：
```
17 / 10 = 1.7 , 向0取整为1, 余数为17 - 10 * 1 = 7
5 / 2 = 2.5, 向0取整为2, 余数为5 - 2 * 2 = 1
-9 / 4 == -2.25, 向0取整为-2, 余数为-9 - 4*(-2) = -1
```
### 四、参考文献
[负数取模怎么算](https://www.jianshu.com/p/452c1a5acd31)
[取模 VS 取余](https://github.com/clarkzsd/blog/issues/4)
