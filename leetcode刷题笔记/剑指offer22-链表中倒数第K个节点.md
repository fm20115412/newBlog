```javascript
function FindKthToTail(head, k) {
    // head为null，k为0
    if (!head || !k) return null;
    let front = head;
    let behind = head;
    let index = 1;
    while (front.next) {
        index++;
        front = front.next;
        if (index > k) {
          behind = behind.next;
        }
    }
    // k大于链表长度的情况
    return (k <= index) && behind;
}
```
分析：快慢指针法
- 我们定义两个指针front 和 behind；
- front指针从链表的头指针开始遍历向前走k-1步，behind指针保持不动；
- 从第k步开始，behind指针也开始从链表的头指针开始遍历
- 由于两个指针的距离保持在k-1，当front指针到达链表的尾结点时，behind指针正好指向倒数第k个节点。
