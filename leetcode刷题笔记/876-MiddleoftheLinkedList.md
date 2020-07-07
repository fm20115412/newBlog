[876. Middle of the Linked List](https://leetcode-cn.com/problems/middle-of-the-linked-list/)
```
var middleNode = function(head) {
    let fast = head;
    let slow = head;
    while(fast.next!=null && fast.next.next != null){
        fast = fast.next.next;
        slow = slow.next;
    }
    if(fast.next == null){
        return slow;
    }else if(fast.next.next == null){
        return slow.next;
    }
};
```