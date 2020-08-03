```javascript
// function TreeLinkNode(x){
//     this.val = x;
//     this.left = null;
//     this.right = null;
//     this.next = null;
// }
function GetNext(pNode)
{
    // write code here
    if(pNode === null){
        return null;
    }
    //有右子树  找右子树的最左节点
    if(pNode.right !== null){
        pNode = pNode.right;
        while(pNode.left !== null){
            pNode = pNode.left;
        }
        return pNode;
    }
    //没有右子树，但是父节点的左节点
    else if(pNode.next !== null && pNode.next.left === pNode){
        return pNode.next;
    }
    //没有右子树,是父节点的右节点
    else if(pNode.next !== null && pNode.next.right === pNode){
        while(pNode.next !== null && pNode.next.left !== pNode){
            pNode = pNode.next;
        }
        return pNode.next;
    }
    //没有右子树，且是根节点
    else{
        return pNode.next;
    }
}
```
分析，以下面的二叉树为例，其中序为：d b h e i a f c g
```javascript
         a
       /   \
      b     c
     / \   / \
    d   e f   g
       / \
      h   i
```
- 1. 如果给定的节点有右子树，则该节点在中序遍历中的下一个节点就是其右子树中最左侧的节点。例如，给定节点为 b，则 b 的下一个节点就是以 e 为根节点的子树的最左边的节点，即 h。同样的 a 的下一个节点就是 f；
- 2. 如果给定的节点没有右子树，则需要判断其与父节点的关系：
  - 2.1 如果给定的节点是其父节点的左节点，则给定的节点的下一节点就是其父节点。例如，d->b，f->c；
  - 2.2 如果给定的节点是其父节点的右节点，则可以沿着该节点的父指针向上找，直到找到一个是它父节点的左子节点的节点，找到则返回该节点的父节点(i -> a)，找不到则说明给定的节点没有下一节点，返回 null(g -> null)。
  - 2.3 没有右子树，且是根节点。(如下图中的a -> null)

```javascript
a
| 
b
|
c         
```   
    