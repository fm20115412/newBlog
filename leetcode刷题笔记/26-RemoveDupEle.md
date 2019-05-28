### 一、[Remove Duplicates from Sorted Array题目链接](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
### 二、思路
首先需要明确以下两点：
a. 数组已经排序
b. 你需要在原地删除重复出现的元素，即不能使用额外的数组空间

数组完成排序后，我们可以放置两个指针i和j,其中i是慢指针,而j是快指针。只要$nums[i] = nums[j]$，我们就增加j以跳过重复项。

当我们遇到$nums[j] != nums[i]$时，跳过重复项的运行已经结束，因此我们必须把它nums[j]的值复制到nums[i + 1]。然后递增i，接着我们将再次重复相同的过程，直到j到达数组的末尾为止。
```
var removeDuplicates = function(nums) {
    let i=0;
    for(let j=1;j<nums.length;j++){
        if(nums[i]!==nums[j]){
            i++;
            nums[i]=nums[j]
        }
    }
    return i+1;
};
```
**时间复杂度：** $O(n)$

**空间复杂度：** $O(1)$


