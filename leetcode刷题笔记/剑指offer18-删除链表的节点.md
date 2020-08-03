```javascript
 var deleteNode = function (head, node) {
      if (node.next) {
        node.val = node.next.val;
        node.next = node.next.next;
      } else if (node === head) {
        node = null;
        head = null;
      } else {
        node = head;
        while (node.next.next) {
          node = node.next;
        }
        node.next = null;
        node = null;
      }
      return node;
    };
```
分析：
给定单链表的头指针和要删除的指针节点，在O(1)时间内删除该节点。
- 1.删除的节点i不是尾部节点，先把i的下一个节点j的内容复制到i，然后把i的指针指向节点j的下一个节点。（原理：把下一个节点的内容复制到需要删除的节点上覆盖原有的内衣，再把下一个节点删除，就相当于把当前需要删除的节点删除了）；
- 2.删除的节点是尾部节点且等于头节点，只剩一个节点 - 将头节点置为null；
- 3.删除的节点是尾节点且前面还有节点 - 遍历到末尾的前一个节点删除。

平均时间复杂度：
$[(n-1)*O(1) + O(n)] / n = O(1)$
