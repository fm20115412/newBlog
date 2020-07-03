[leetcode链接](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/submissions/)

代码：
```
var exchange = function(nums) {
    let start = 0,end = nums.length-1;
    while(start < end){
        while(start < end && nums[start]%2 == 1){
            start++;
        }
        while(start < end && nums[end]%2 == 0){
            end--;
        }
        if(start < end){
            let temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
        }
    }
    return nums;
};
```
