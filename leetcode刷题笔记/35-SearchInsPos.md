
### 一、[Search Insert Position 题目链接](https://leetcode.com/problems/search-insert-position/)
### 二、思路
1. 数组已经排序
2. 数组中没有重复元素

这道题目可以采用二分法实现，每次将nums[middle]与target进行比较，如果：

a. $nums[middle] == target$,则代表target在数组中存在，返回其索引值，循环结束。

b. $nums[middle] < target$,则将start置为middle+1,即数组中nums[start] -> nusm[middle]均小于target。

c. $nums[middle] > target$,则将end置为middle-1,即数组中nums[middle] -> nusm[end]均大于target。

最后，当start > end时，循环结束，即start（包括start）之后的元素都大于target,end(包括end)之前的元素都小于target，因此target应该插在start的位置。

```
var searchInsert = function(nums, target) {
    let start = 0, end = nums.length - 1;
    while(start<=end){
        let middle = Math.floor((start + end)/2);
        if (nums[middle] == target){
            return middle;
        }else if(nums[middle]<target){
            start = middle + 1;
        }else{
            end = middle - 1;
        }
    }
    return start;
};
```
**时间复杂度：**$O(n)$

**空间复杂度：** $O(1)$
