1. 使用unshift方法，不改变原始链表
```javascript
var reversePrint = function(head) {
  const result = []
  
  while(head !== null) {
    result.unshift(head.val)
    head = head.next
  }
  
  return result
};
```
分析：
- 使用一个数组 result 保存结果
- 使用 while 循环遍历链表
- 每次循环将值使用 unshift 方法将节点值存到数组中，指向下一个节点
2. 反转链表，改变原始链表
   
3. 反转链表，改变原始链表，递归实现