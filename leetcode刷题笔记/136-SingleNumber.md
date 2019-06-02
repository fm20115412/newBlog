### 一、[Single Number题目链接](https://leetcode.com/problems/single-number/)
### 二、思路
#### a. 数学的方法
$2∗(a+b+c)−(a+a+b+b+c)=c$
```
var singleNumber = function(nums) {
    var set = new Set();
    for(var i =0;i<nums.length;i++){
        set.add(nums[i])
    }
    return 2*sum(set)-sum(nums)
    
};
var sum = function(nums){
    var arr = Array.from(nums)
    return arr.reduce((a,b) => a+b)
}
```
**时间复杂度：** $O(n)$。

**空间复杂度：** $O(n)$，需要新建一个set来保存数据。
#### b. 哈希表
用hashmap建立nums中每一个num -> 它在数组中出现次数的映射。最后再遍历map,找出其值为1的元素，并输出key。
```
var singleNumber = function(nums) {
    var map = new Map()
    for(var i =0;i<nums.length;i++){
        if(map.has(nums[i])){
            map.set(nums[i],2)
        }
        else{
            map.set(nums[i],1)
        }
    }
    for(var item of map.entries()){
        if(item[1] == 1){
            return item[0]
        }
    }
};
```
**时间复杂度**：$O(n)$。

**空间复杂度**：$O(n)。

#### 3. 异或门
 $A ^ B ^ B = A ^（B ^ B） = A$。两个相同的数进行按位异或运算结果一定为0，一个数与0按位异或结果即为该数本身，所以将数组中所有数按位异或，留下的那个数即是那个single number。
```
var singleNumber = function(nums) {
    let result =nums[0];
    for(var i =1;i<nums.length;i++){
        result ^= nums[i]
    }
    return result;
};
```
**时间复杂度**：$O(n)$。

**空间复杂度**：$O(1)$。