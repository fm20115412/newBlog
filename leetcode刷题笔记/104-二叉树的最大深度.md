[TOC]
## 一、[Maximum Depth of Binary Tree](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
## 二、思路
### 递归
```
var maxDepth = function(root) {
    if (root == null){
        return 0
    }
    return Math.max(maxDepth(root.right),maxDepth(root.left))+1
};
```
**时间复杂度**：我们每个结点只访问一次，因此时间复杂度为 $O(N)$，
其中 N 是结点的数量。
**空间复杂度**：在最糟糕的情况下，树是完全不平衡的，例如每个结点只剩下左子结点，递归将会被调用 N 次（树的高度），因此保持调用栈的存储将是 $O(N)$。但在最好的情况下（树是完全平衡的），树的高度将是 $log⁡(N)$。因此，在这种情况下的空间复杂度将是 $O(log⁡(N))$。

### 迭代
我们从包含根结点且相应深度为 1 的队列开始。然后我们继续迭代：将当前结点弹出队列并推入子结点。每一步都会更新深度。
```
var maxDepth = function(root) {
    if (root == null){
        return 0;
    }
    let queue = [];
    let maxdepth = 0;
    queue.push([root,1])
    while(queue.length>0){
        let pair = queue.shift()
        let node = pair[0]
        if(node!=null){
            let depth = pair[1]
            maxdepth = Math.max(maxdepth,depth)
            queue.push([node.left,depth+1])
            queue.push([node.right,depth+1])
        }
    }
    return maxdepth;
};
```
**时间复杂度**：$O(N)$。
**空间复杂度**：$O(N)$。
