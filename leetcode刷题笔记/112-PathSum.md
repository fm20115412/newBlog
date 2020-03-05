[TOC]
## 一、[Path Sum](https://leetcode-cn.com/problems/path-sum/)
## 二、思路
### 递归
最直接的方法就是利用递归，遍历整棵树：如果当前节点不是叶子，对它的所有孩子节点，递归调用 hasPathSum 函数。
```
var hasPathSum = function(root, sum) {
    if (root == null){
        return false;
    }
    if (root.left == null && root.right == null){
        return root.val == sum;
    }
    return hasPathSum(root.left,sum-root.val) || hasPathSum(root.right,sum-root.val)
};
```
### 广度优先迭代
先把根节点和target压入队列，然后开始迭代：弹出当前节点和target
- 如果该节点为叶子节点并且val == target，则找到一条这样的路径，迭代结束；
- 如果该节点不是叶子节点，则将其不为空的子节点和更新后的target压入队列。

```
var hasPathSum = function(root, sum) {
    if (root == null){
        return false;
    }
    let node_queue = [];
    let sum_queue = [];
    node_queue.push(root);
    sum_queue.push(sum);
    while(node_queue.length > 0){
        let cur_node = node_queue.shift();
        let cur_sum = sum_queue.shift();
        if (cur_node.left == null && cur_node.right == null && cur_node.val == cur_sum){
            return true;
        }
        if (cur_node.left != null){
            node_queue.push(cur_node.left);
            sum_queue.push(cur_sum - cur_node.val)
        }
        if (cur_node.right != null){
            node_queue.push(cur_node.right);
            sum_queue.push(cur_sum - cur_node.val)
        }
    }
    return false;
};
```

