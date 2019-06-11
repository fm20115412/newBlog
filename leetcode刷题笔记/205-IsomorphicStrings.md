### 一、[Word Pattern题目链接](https://leetcode.com/problems/word-pattern/)
### 二、思路

#### a. 哈希表法
这道题的解法可以参考[World Pattern](./290-WordPattern.md)，方法完全一致。
代码如下：
```
var isIsomorphic = function(s, t) {
    if(s.length != t.length){
        return false;
    }
    var map = new Map();
    for(var i=0;i<s.length;i++){
        if(map.has(s[i])){
            if(map.get(s[i])!=t[i]){
                /* s=foo t=bar*/
                return false;
            }
        }else{
            for(var mapvalue of map.values()){
                if(mapvalue == t[i])
                    /* s=fod t=baa*/
                    return false
            }
            map.set(s[i],t[i])
        }
    }
    return true;
};
```
**时间复杂度：** $O(n)$

**空间复杂度：** $O(n)$