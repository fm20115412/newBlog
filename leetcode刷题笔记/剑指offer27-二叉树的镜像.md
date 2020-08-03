```javascript
function Mirror(root)
{
    if(root == null) {
        return;
    }
    if(root.left == null && root.right == null){
        return;
    }

    const temp = root.right;
    root.right = root.left;
    root.left = temp;
    if(root.left){
        Mirror(root.left);
    }
    if(root.right){
        Mirror(root.right);
    }
}
```
分析：
递归交换二叉树所有节点左右节点的位置。