[TOC]
## 一、[Binary Tree Level Order Traversal](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)
## 二、思路
### 递归
最简单的解法就是递归，首先确认树非空，然后调用递归函数 helper(node, level)，参数是当前节点和节点的层次。程序过程如下：
- 输出列表称为 levels，当前最高层数就是列表的长度 levels.length。比较访问节点所在的层次 level 和当前最高层次 levels.length 的大小，如果前者更大就向 levels 添加一个空列表。
- 将当前节点插入到对应层的列表 levels[level] 中。
- 递归非空的孩子节点：helper(node.left / node.right, level + 1)。
```
var levelOrder = function(root) {
    if (root == null) return [];
    let levels = [];
    helper(root,levels,0);
    return levels;
};
function helper(node,levels,level){
    if (levels.length == level){
        levels.push([])
    }
    levels[level].push(node.val)
    if (node.left != null){
        helper(node.left,levels,level+1)
    }
    if (node.right != null){
        helper(node.right,levels,level+1)
    }
}
```

### 迭代
经典的用广度优先的方式逐层遍历节点。
- 如果根节点为空，返回`[]`，否则将根节点压入节点队列；
- 当节点队列非空
    - 计算每层节点的个数，并依次弹出该层节点；
    - 将弹出节点的val压入该层结果数组，并把非空子节点压入节点队列中；
    - 将每层结果数组压入最终返回的结果数组。
```
var levelOrder = function(root) {
    if(root == null) return [];
    let result = []
    let queue = []
    queue.push(root)
    while(queue.length > 0 ){
        let size = queue.length;
        let level = []
        for(let i = 0;i<size;i++){
            let head = queue.shift()
            level.push(head.val)
            if (head.left != null){
                queue.push(head.left)
            }
            if (head.right != null){
                queue.push(head.right)
            }  
        }
        result.push(level)
    }
    return result
};
```