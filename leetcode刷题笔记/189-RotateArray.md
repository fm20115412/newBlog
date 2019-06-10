### 一、[Rotate Arrar题目链接](https://leetcode.com/problems/rotate-array/)
### 二、思路

#### a. 利用Array的方法
代码如下：
```
var rotate = function(nums, k) {
   for(i=1;i<=k;i++){
       var last = nums.pop();
       nums.unshift(last)
   }
};
```
**时间复杂度：** $O(n)$

**空间复杂度：** $O(1)$

#### b. 翻转数组
思路是先把整个数组翻转一下，再把前[0,k-1]个数字翻转一下，最后再把后[k,num.length-1]个数字翻转一下。
Original List                   : 1 2 3 4 5 6 7
After reversing all numbers     : 7 6 5 4 3 2 1
After reversing first k numbers : 5 6 7 4 3 2 1
After revering last n-k numbers : 5 6 7 1 2 3 4 --> Result
注意：该方法有可能存在k>length的情况，因此首先需要 k%length 一下。

代码如下：
```
var rotate = function(nums, k) {
    k = k%nums.length;
    rotateArray(nums,0,nums.length-1);
    rotateArray(nums,0,k-1);
    rotateArray(nums,k,nums.length-1);
};
function rotateArray(nums,start,end){
    while(start<end){
        var temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
};
```
**时间复杂度：** $O(n)$

**空间复杂度：** $O(1)$

#### c. 空间换时间
用一个额外的数组来存放，旋转之后每个位置应该放的元素。
注意该方法有可能存在k>length的情况，因此首先需要 k%length 一下。
代码如下：
```
var rotate = function(nums, k) {
    var temp = [];
    var length = nums.length;
    k = k%length;
    for(var i =0;i<length;i++){
        temp[i] = nums[(length-k+i)%length]
    }
    for(var i=0;i<length;i++){
        nums[i] = temp[i]
    }
};
```
**时间复杂度：** $O(n)$

**空间复杂度：** $O(n)$