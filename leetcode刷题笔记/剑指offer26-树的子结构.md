```javascript
function HasSubtree(pRoot1, pRoot2) {
    let result = false;
    if (pRoot1 && pRoot2) {
        if (pRoot1.val === pRoot2.val) {
          result = compare(pRoot1, pRoot2);
        }
        if (!result) {
          result = HasSubtree(pRoot1.right, pRoot2);
        }
        if (!result) {
          result = HasSubtree(pRoot1.left, pRoot2);
        }
    }
    return result;
}

function compare(pRoot1, pRoot2) {
    if (pRoot2 === null) {
        return true;
    }
    if (pRoot1 === null) {
        return false;
    }
    if (pRoot1.val !== pRoot2.val) {
        return false;
    }
    return compare(pRoot1.right, pRoot2.right) && compare(pRoot1.left, pRoot2.left);
}
```
分析：
- 在树A中找到和树B的根节点的值一样的节点R
- 判断树A中以R为根节点的子树是不是和树B一样的结构