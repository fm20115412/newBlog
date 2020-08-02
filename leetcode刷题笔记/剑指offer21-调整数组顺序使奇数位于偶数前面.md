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
分析：双指针法
- 我们维护两个指针：第一个指针初始化时指向数组的第一个数字，它只向后移动；第二个指针初始化时指向数组的最后一个数字，它只向前移动。
- 如果第一个指针指向的是偶数，第二个指针指向的是奇数，则交换它们的位置。


