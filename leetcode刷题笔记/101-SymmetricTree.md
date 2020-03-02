[TOC]
## 一、[Symmetric Tree](https://leetcode-cn.com/problems/symmetric-tree/)
## 二、思路
### 递归
如果一个树的左子树与右子树镜像对称，那么这个树是对称的。
因此，该问题可以转化为：两个树在什么情况下互为镜像？

如果同时满足下面的条件，两个树互为镜像：
- 它们的两个根结点具有相同的值。
- 每个树的右子树都与另一个树的左子树镜像对称。

```
function isMirror(left,right){
    if(left == null && right == null){
        return true;
    }
    if (left == null || right == null) {
        return false;
    }
    return (left.val == right.val) &&
            isMirror(left.left,right.right) &&
            isMirror(left.right,right.left)
}
var isSymmetric = function(root) {
    return isMirror(root,root)
};
```

### 迭代
除了递归的方法外，我们也可以利用队列进行迭代。队列中每两个连续的结点应该是相等的，而且它们的子树互为镜像。最初，队列中包含的是 root.left 以及 root.right。该算法的工作原理类似于 BFS，但存在一些关键差异。每次提取两个结点并比较它们的值。然后，将两个结点的左右子结点按相反的顺序插入队列中。当队列为空时，或者我们检测到树不对称（即从队列中取出两个不相等的连续结点）时，该算法结束。

```
var isSymmetric = function(root) {
    if (root == null) return true;
    if (root.left == null && root.right == null){
        return true
    }
    if(root.left == null || root.right == null){
        return false;
    }
    let queue = [];
    queue.push(root.left)
    queue.push(root.right)
    while(queue.length > 0){
        let first = queue.shift();
        let second = queue.shift();
        if (first == null && second == null) continue;
        if (first == null || second == null) return false;
        if (first.val != second.val) return false;
        queue.push(first.left)
        queue.push(second.right)
        queue.push(first.right)
        queue.push(second.left)
    }
    return true
};

```