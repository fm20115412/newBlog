```javascript
function reConstructBinaryTree(preOrder, inOrder) {
    if(preOrder.length === 0){
        return null;
    }
    if(preOrder.length === 1){
        return new TreeNode(preOrder[0]);
    }
    const value = preOrder[0];
    const index = inOrder.indexOf(value);
    const inOrderLeft = inOrder.slice(0,index);
    const inOrderRight = inOrder.slice(index+1);
    const preOrderLeft = preOrder.slice(1,index+1);
    const preOrderRight = preOrder.slice(index+1);
    const node = new TreeNode(value);
    node.left = reConstructBinaryTree(preOrderLeft, inOrderLeft);
    node.right = reConstructBinaryTree(preOrderRight, inOrderRight);
    return node;
}
```
分析：
- 二叉树的前序遍历顺序是：根节点、左子树、右子树，每个子树的遍历顺序同样满足前序遍历顺序。
- 二叉树的中序遍历顺序是：左子树、根节点、右子树，每个子树的遍历顺序同样满足中序遍历顺序。
- 前序遍历的第一个节点是根节点，只要找到根节点在中序遍历中的位置，在根节点之前被访问的节点都位于左子树，在根节点之后被访问的节点都位于右子树，由此可知左子树和右子树分别有多少个节点。
