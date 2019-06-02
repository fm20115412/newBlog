### 一、[Majority Element题目链接](https://leetcode.com/problems/majority-element/)
### 二、思路

#### a. 暴力解决法
遍历两次计算每一个元素在数组中出现的次数，如果出现的次数大于$⌊ n/2 ⌋$次，则返回这个元素。
这个方法比较简单，就不给出代码了
**时间复杂度：** $O(n^2)$

**空间复杂度：** $O(1)$
#### b. HashMap
先遍历一遍数据，统计每个数字出现的次数，然后再遍历一遍散列表，找出满足条件的数字。
```
var majorityElement = function(nums) {
    var map = new Map();
    var majorityMap = new Map();
    for(var i = 0;i<nums.length;i++){
        if(map.has(nums[i])){
            map.set(nums[i],map.get(nums[i])+1);
        }else{
            map.set(nums[i],1)
        }
    }
    for(var [key,value] of map.entries()){
        if(majorityMap.size>0){
            var majorvalue = [...majorityMap][0][1];
        }
        if(majorityMap.size == 0 || value > majorvalue){
           majorityMap.clear();
           majorityMap.set(key,value);
        }
    }
    return [...majorityMap][0][0]
};
```
**时间复杂度：** $O(n)$。

**空间复杂度：** $O(n)$
#### c. 排序
在数组排序后，众数一定会出现在数组的中间位置。
```
var majorityElement = function(nums) {
    nums.sort((a,b)=>a-b);
    return nums[Math.floor(nums.length/2)]
};
```
**时间复杂度：** $O(nlogn)$，依赖于排序算法的时间复杂度。

**空间复杂度：** $O(1)$
#### d .摩尔投票算法
数组中有一个数字的出现次数超过一半，也就是说这个数字的出现次数比其他的所有的数字的出现次数之和还要多。因此我们可以考虑遍历数组的时候保存两个值，一个是数组中的数字，一个数次数。当我们遍历到下一个数字的时候，如果下一个数字与我们之前保存的数字是相同的，那么次数加1，不同则减1,。如果次数为0，那么我们需要保存下一个数字，并把次数设置为1,。由于我们要找到的数字比其他的所有的数字的出现次数还要高，那么我们要找的数字一定是最后一次把次数设置为1时候所对应的数字。
```
var majorityElement = function(nums) {
    var majorvalue = nums[0],count = 1;
    for(var i=1;i<nums.length;i++){
        if(count == 0){
            majorvalue = nums[i];
            count=1;
        }else{
            if(nums[i]==majorvalue){
                count++;
            }else{
                count--;
            }
        } 
    }
    return majorvalue
};
```
**时间复杂度：** $O(n)$,只需要循环遍历数组一次。

**空间复杂度：** $O(1)$