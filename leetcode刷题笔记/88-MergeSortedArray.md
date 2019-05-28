### 一、[Merge Sorted Array题目链接](https://leetcode.com/problems/merge-sorted-array//)
### 二、思路
#### 前提条件
1. 两个数组均已经排序好
2. nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素
#### a. 采用之前Search Insert Position
首先循环遍历nums2中的每个元素，然后采用[35. Search Insert Position](./leetcode刷题笔记/35-SearchInsPos.md)计算出nums2[i]在nums1中应该插入的位置。(注意，此处计算位置的时候应该考虑到nums1中后面都是0，所以应该将后面的元素排除)。
1. 如果插入的位置在nums1现有元素之间，则采用Array.splice方法插入之后，需要采用Array.pop将最后一个元素弹出。
2. 如果插入的位置在nums1现有元素之后，则代表nums2[i]以及其后面的元素均大于nums1中所有的元素，故而将nums2[i]以及其后面的元素移到nums1的后面即可。
```
var merge = function(nums1, m, nums2, n) {
    for(var i=0;i<n;i++){
        var start = searchInsert(nums1.slice(0,m),nums2[i]);
        if(start>=m){
            slice2 = nums2.slice(i);
            nums1.splice(start,slice2.length,...slice2);
            break;
        }else{
            nums1.splice(start,0,nums2[i]);
            nums1.pop();
            m++;
        }
    }
    return nums1;
    
};
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
**时间复杂度：** $O(n^2)$, searchInsert方法的时间复杂度是$O(n)$,且该算法最多对n个元素进行遍历，故而时间复杂度是$O(n^2)$。

**空间复杂度：** $O(1)$
#### b. 逐个比较法
从尾部开始合并，每次找出最大的，这样一遍扫描即可完成.
```
var merge = function(nums1, m, nums2, n) {
    var i = m-1, j = n-1, k = m+n-1;
    while(i>=0 && j>=0){
        if(nums1[i]>nums2[j]){
            nums1[k--] = nums1[i--]
        }else{
            nums1[k--] = nums2[j--]
        }
    }
    while(j>=0){
        nums1[k--] = nums2[j--]
    }
    
};
```
**时间复杂度**：$O(n)$， 我们只遍历了包含有n个元素的列表一次。在表中进行的每次查找只花费$O(1)$的时间。

**空间复杂度**：$O(n)$， 所需的额外空间取决于哈希表中存储的元素数量,该表最多需要存储n个元素。