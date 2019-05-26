### 一、[Two Sum题目链接](https://leetcode.com/problems/two-sum/)
### 二、思路
#### a. 暴力解决方法
暴力法很简单，遍历每个元素$nums[i]$，并查找是否存在一个值$nums[j]$,使得$nums[i]+nums[j] = target$。
```
var twoSum = function(nums, target) {
    for(let i = 0;i<nums.length;i++){
        for(let j = i+1;j<nums.length;j++){
            if(nums[i] + nums[j] == target){
                return [i,j]
            }
        }
    }
    throw new IllegalArgumentException("No two sum solution");      
};
```
**时间复杂度：** $O(n^2)$,对于每个元素，我们试图通过遍历数组的其余部分来寻找它所对应的目标元素，这将耗费$O(n)$的时间。因此时间复杂度为$O(n^2)$。

**空间复杂度：** $O(1)$
#### b. 哈希表
为了对运行时间复杂度进行优化，我们需要一种更有效的方法来检查数组中是否存在目标元素。如果存在，我们需要找出它的索引。保持数组中的每个元素与其索引相互对应的最好方法是什么？哈希表。

通过以空间换取速度的方式，我们可以将查找时间从$O(n)$降低到$O(1)$。哈希表正是为此目的而构建的，它支持以近似恒定的时间进行快速查找。我用“近似”来描述，是因为一旦出现冲突，查找用时可能会退化到$O(n)$。但只要你仔细地挑选哈希函数，在哈希表中进行查找的用时应当被摊销为 $O(1)$。
```
var twoSum = function(nums, target) {
    for(let i = 0;i<nums.length;i++){
        let another = target - nums[i];
        if(nums.indexOf(another) != -1 && nums.indexOf(another) != i){
            return [i,nums.indexOf(another)]
        }
    }
    throw new IllegalArgumentException("No two sum solution"); 
};
```
**时间复杂度**：$O(n)$， 我们只遍历了包含有n个元素的列表一次。在表中进行的每次查找只花费$O(1)$的时间。

**空间复杂度**：$O(n)$， 所需的额外空间取决于哈希表中存储的元素数量,该表最多需要存储n个元素。