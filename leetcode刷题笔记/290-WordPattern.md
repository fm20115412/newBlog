### 一、[Word Pattern题目链接](https://leetcode.com/problems/word-pattern/)
### 二、思路

#### a. 哈希表法
这道题给我们一个模式字符串，又给我们一个单词字符串，让我们求单词字符串中单词出现的规律是否符合模式字符串中的规律。那么首先想到就是用HashMap来做，建立模式字符串中每个字符和单词字符串每个单词之间的映射，而且这种映射必须是一对一关系的，不能 'a' 和 'b' 同时对应 'dog'，也不能 'a' 同时对应到 'dog' 和 'cat'。
1. 首先我们将单词字符串转化成一个字符串数组，然后判断字符串数组和模式字符串的长度是否一致，若不一致，则肯定不匹配，直接返回false。
2. 碰到一个新字符时，首先检查其是否在HashMap中出现，若出现，其映射的单词若不是此时对应的单词，则返回false。
3. 如果没有在HashMap中出现，我们还要遍历一遍HashMap，看新遇到的单词是否已经是其中的映射，若已经有其他映射，直接返回false。
4. 上述情况都没有的话，则建立新的映射关系。
代码如下：
```
var wordPattern = function(pattern, str) {
    var strArr = str.split(' ');
    if(pattern.length != strArr.length){
        return false
    }
    var map =new Map()
    for(var i =0;i<pattern.length;i++){
        var key = pattern.charAt(i);
        var value = strArr[i];
        if(map.has(key)){
           if(map.get(key) != value){
               return false;
           }
        }else{
            for(var mapvalue of map.values()){
                if(mapvalue == value){
                    return false
                }
            }
            map.set(key,value)
        }
    }
    return true
}
```
**时间复杂度：** $O(n)$

**空间复杂度：** $O(n)$