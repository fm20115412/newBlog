```javascript
function EntryNodeOfLoop(pHead) {
      if (!pHead || !pHead.next) {
        return null;
      }
      let P1 = pHead.next;
      let P2 = pHead.next.next;
      // 1.判断是否有环
      while (P1 != P2) {
        if (P2 === null || P2.next === null) {
          return null;
        }
        P1 = P1.next;
        P2 = P2.next.next;
      }
      // 2.获取环的长度
      let temp = P1;
      let length = 1;
      P1 = P1.next;
      while (temp != P1) {
        P1 = P1.next;
        length++;
      }
      // 3.找环的入口节点
      P1 = P2 = pHead;
      while (length-- > 0) {
        P2 = P2.next;
      }
      while (P1 != P2) {
        P1 = P1.next;
        P2 = P2.next;
      }
      return P1;
    }

```
分析：快慢指针法，分三个步骤：
- 1. 判断是否有环：
  - 定义两个指针，同时从链表的头结点出发，慢指针一次走一步，快指针一次走两
  - 如果快指针追上了慢指针，则链表有环；
  - 如果快指针走到了链表的末尾都没有追上慢指针，则链表没有环。

- 2. 获取环的长度：
  - 接上，如果快慢指针相遇，则代表有环。两个指针相遇的节点一定在环中，可以从这个节点出发，一边继续向前移动一边计数，当再次回到这个节点时，就可以得到环中节点数了。

- 3. 找环的入口节点：
  - 定义两个指针P1和P2 指向链表的头结点，如果链表中的环有N个节点，则指针P1现在链表上向前移动N步，然后两个指针以相同的速度向前移动，直到它们相遇，它们相遇的节点正好是入口节点。