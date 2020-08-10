```javascript
 //递归实现
    function KthNode(pRoot, k) {
      const arr = [];
      loopThrough(pRoot, arr);
      if (k > 0 && k <= arr.length) {
        return arr[k - 1];
      }
      return null;
    }

    function loopThrough(node, arr) {
      if (node) {
        loopThrough(node.left, arr);
        arr.push(node);
        loopThrough(node.right, arr);
      }
    }


    //非递归实现
    function KthNode(pRoot, k) {
      const arr = [];
      const stack = [];
      let current = pRoot;
      while (stack.length > 0 || current) {
        while (current) {
          stack.push(current);
          current = current.left;
        }
        current = stack.pop();
        arr.push(current);
        current = current.right;
      }
      if (k > 0 && k <= arr.length) {
        return arr[k - 1];
      }
      return null;
    }
```
**思路**
如果按照中序遍历的顺序遍历一颗二叉搜索树，则遍历序列的数值递增排序的，因此只需要用中序遍历的方式遍历一颗二叉搜索树，就可以很容易找出它的第K大节点。