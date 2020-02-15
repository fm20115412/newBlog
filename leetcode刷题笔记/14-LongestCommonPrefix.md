### 一、[Longest Common Prefix题目链接](https://leetcode-cn.com/problems/palindrome-number/)
### 二、思路
**1. 暴力解法**
先找到S1，S2的最长公共前缀P1，再找出P1和S3的最长公共前缀P2，直至最长公共前缀为空或是遍历了所有字符串。
$$LCP(S_1...S_n) = LCP(LCP(LCP(S_1,S_2),S_3),...,S_n)$$ 
![](./images/14.png)
```
var longestCommonPrefix = function(strs) {
    if(strs == null || strs.length == 0) {
        return '';
    }
    let prefix=strs[0];
    for(let i = 1;i<strs.length;i++){
        while(strs[i].indexOf(prefix)!=0){
            prefix = prefix.substring(0,prefix.length-1)
        }
        if(prefix == ''){
            return ''
        }
    }
    return prefix;
};
```
时间复杂度：$O(s)$,s是所有字符串的数量总和。
最坏的情况下，n个字符串都是相同的，算法会将 $S_1$ 与其他字符串$[S_2...S_n]$都做一次比较。这样就会进行s次字符比较，其中s是输入数据中所有字符数量。
空间复杂度：$O(1)$。

**2. 水平扫描**

**解法：**
从前往后比较字符串的每一列，先比较每个字符串相同列上的字符，若相同，则进行对下一列的比较；若有一个不同，则停止比较，并返回该列前面的共有字符串。

```
var longestCommonPrefix = function(strs) {
    if(strs == null || strs.length == 0) {
        return '';
    }
    let prefix=strs[0];
    for(let i = 1;i<strs.length;i++){
        while(strs[i].indexOf(prefix)!=0){
            prefix = prefix.substring(0,prefix.length-1)
        }
        if(prefix == ''){
            return ''
        }
    }
    return prefix;
};
```
时间复杂度：$O(s)$ ，s为所有字符串的字符总数。因为最坏情况是数组中的字符串都相同。
空间复杂度：$O(1)$
**3. 分而治之**
**解法：**
![](./images/14_1.png)
```
var longestCommonPrefix = function(strs) {
    if(strs == null || strs.length == 0){
        return ''
    }
    return devide(strs,0,strs.length-1)
};
function devide(strs,l,r){
    if(l==r){
        return strs[l]
    }else{
        let mid = parseInt((l+r)/2);
        let left = devide(strs,l,mid);
        let right = devide(strs,mid+1,r);
        return commonPrefix(left,right);
    }
}
function commonPrefix(left,right){
    let min = Math.min(left.length,right.length);
    for(let i = 0 ; i<min;i++){
        if(left[i]!=right[i]){
            return left.substring(0,i)
        }
    }
    return left.substring(0,min)
}
```