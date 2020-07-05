[215-Kth Largest Element in an Array](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)
```javascript
var findKthLargest = function(nums, k) {
    return quickSelect(nums,0,nums.length-1,nums.length-k);
};
function quickSelect(nums,begin,end,k){
    let pivot = partition(nums,begin,end);
    if (pivot == k){
        return nums[pivot]
    } else {
        return pivot > k ? quickSelect(nums,begin,pivot-1,k) : quickSelect(nums,pivot+1,end,k)
    }
}
function partition(nums,begin,end){
    let randomIndex = begin + Math.floor(Math.random()*(end-begin+1));
    swap(nums,begin,randomIndex);
    let value = nums[begin];
    while(begin < end){
        while(begin < end && nums[end] >= value){
            end--;
        }
        nums[begin] = nums[end]
        while(begin < end && nums[begin] <= value){
            begin++;
        }
        nums[end] = nums[begin]
    }
    nums[begin] = value;
    return begin;
}
function swap(nums,begin,end){
    let temp = nums[begin];
    nums[begin] = nums[end];
    nums[end] = temp; 
}
```