### 一、[Valid Anagram题目链接](https://leetcode.com/problems/valid-anagram/)
### 二、思路

#### a. 哈希映射
首先判断两个字符串长度是否相等，不相等则直接返回false。若相等，则初始化26个字母哈希表，遍历字符串s和t，s负责在对应位置增加，t负责在对应位置减少
如果哈希表的值都为0，则二者是字母异位词。

代码如下：
```
var isAnagram = function(s, t) {
    if(s.length != t.length){
        return false;
    }
    var counter = [];
    for(var i = 0 ;i<26;i++){
        counter[i] = 0;
    }
    for(var i=0;i<s.length;i++){
        counter[s.charCodeAt(i) - 'a'.charCodeAt()]++;
        counter[t.charCodeAt(i) - 'a'.charCodeAt()]--;
    }
    for (var count of counter){
        if(count != 0){
            return false
        }
    }
    return true;
};
```
**时间复杂度：** $O(n)$

**空间复杂度：** $O(1)$

### b.排序
```
var isAnagram = function(s, t) {
    if(s.length != t.length){
        return false;
    }
    var sarr = s.split('').sort();
    var tarr = t.split('').sort();
    return (sarr.join('') == tarr.join(''))
};
```
**时间复杂度：** $O(nlogn)$

**空间复杂度：** $O(1)$