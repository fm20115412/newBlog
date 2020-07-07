[203. Remove Linked List Elements](https://leetcode-cn.com/problems/remove-linked-list-elements/)
```
function ListNode(val) {
    this.val = val;
    this.next = null;
}
var removeElements = function(head, val) {
    // 哨兵节点
    let dummyCode  = new ListNode(-1);
    dummyCode.next = head;
    let prev = dummyCode;
    let cur = head;
    while(cur != null){
        if(cur.val == val){
            prev.next = cur.next;
        } else {
            prev = cur;
        }
        cur = cur.next;
    }
    return dummyCode.next;
};
```