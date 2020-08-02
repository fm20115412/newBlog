### 代码：
```javascript
function Queue() {
  let stack1 = []
  let stack2 = []
  // 从尾部插入
  this.enqueue = function (node) {
    // 插入到stack1中
    stack1.push(node)
  }
  // 从头部抽出
  this.dequeue = function () {
    // 如果为空，从stack1中逐个弹出并压到stack2中
    if (stack2.length === 0) {
      // 如果stack1也为空，则队列为空
      if (stack1.length === 0) {
        throw new Error('the queue is empty')
      }
      while(stack1.length > 0) {
        stack2.push(stack1.pop())
      }
    }
    // 从stack2弹出并返回
    const head = stack2.pop()
    return head
  }
}
```
### 分析：
- 成员变量
    - 维护两个栈 stack1 和 stack2，其中 stack1 支持插入操作，stack2 支持删除操作
- 构造方法
    - 初始化 stack1 和 stack2 为空
- 插入元素
  - 插入元素对应方法 appendTail
  - stack1 直接插入元素
- 删除元素
  - 删除元素对应方法 deleteHead
  - 如果 stack2 为空，则将 stack1 里的所有元素弹出插入到 stack2 里
  - 如果 stack2 仍为空，则返回 -1，否则从 stack2 弹出一个元素并返回