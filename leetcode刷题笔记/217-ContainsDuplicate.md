### 一、[Contains Duplicate题目链接](https://leetcode.com/problems/contains-duplicate/)
### 二、思路
这道题比较简单，这里就不分析了，直接上代码。
#### a. 哈希表法
```
var containsDuplicate = function(nums) {
    var set = new Set();
    for(var i =0;i<nums.length;i++){
        if(set.has(nums[i])){
            return true
        }else{
            set.add(nums[i])
        }
    }
    return false;
};
```
**时间复杂度：** $O(n)$。

**空间复杂度：** $O(n)$。
#### b. 数组排序
```
var containsDuplicate = function(nums) {
    nums.sort((a,b) => a-b);
    for(var i =0;i<nums.length;i++){
        if(nums[i] == nums[i+1]){
            return true;
        }
    }
    return false;
};
```
**时间复杂度**：$O(nlgn)$。

**空间复杂度**：$O(1)。
