[TOC]
## 一、[Minimum Depth of Binary Tree](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)
## 二、思路
### 1. 递归
思路很简单：即二叉树的最小深度 = min(左子树的最小深度,右子树的最小深度）+ 1
```
var minDepth = function(root) {
    if(root == null){
        return 0
    }
    let leftDepth = minDepth(root.left);
    let rightDepth = minDepth(root.right);
    if(leftDepth == 0){
        return 1+rightDepth;
    } else if(rightDepth == 0){
        return 1+leftDepth;
    } else {
        return Math.min(leftDepth,rightDepth)+1;
    }
};
```
### 2. 宽度优先迭代
我们按照树的层次去迭代，第一个访问到的叶子就是最小深度的节点，这样就不要遍历所有的节点了。
```
var minDepth = function(root) {
    let queue = [];
    let depth = 0;
    queue.push(root)
    while(queue.length > 0){
        let len = queue.length
        for(let i = 0;i<len;i++){
            let curr = queue.shift();
            if (curr == null){
                return depth;
            }
            if (curr.left == null && curr.right == null){
                return depth+1;
            }
            if(curr.left != null){
                queue.push(curr.left);
            }
            if (curr.right != null){
                queue.push(curr.right);
            }
        }
        depth++;
    }
};
```