### 一、[Reverse Linked List](https://leetcode-cn.com/problems/reverse-linked-list/)
### 二、思路

#### a. 递归法
```

```
#### b. 迭代法
```
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while(curr!=null){
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
};
```
**时间复杂度：** $O(n)$
**空间复杂度：** $O(1)$