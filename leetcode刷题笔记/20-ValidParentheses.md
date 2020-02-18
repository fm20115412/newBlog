### 一、[Valid Parentheses题目链接](https://leetcode-cn.com/problems/valid-parentheses/)
### 二、思路
- 初始化栈 S。
- 一次处理表达式的每个括号。
- 如果遇到开括号，我们只需将其推到栈上即可。这意味着我们将稍后处理它，让我们简单地转到前面的 子表达式。
- 如果我们遇到一个闭括号，那么我们检查栈顶的元素。如果栈顶的元素是一个 相同类型的 左括号，那么我们将它从栈中弹出并继续处理。否则，这意味着表达式无效。
- 如果到最后我们剩下的栈中仍然有元素，那么这意味着表达式无效。
### 三、代码
```
var isValid = function(s) {
    if(parseInt(s.length%2) == 1){
        return false
    }
    let stack = [];
    let map = new Map()
    map.set('}','{')
    map.set(']','[')
    map.set(')','(')
    for(let i = 0;i<s.length;i++){
        let char = s[i]
        if(map.has(char)){
            let last = stack.pop();
            if(last != map.get(char)){
                return false
            }
        } else {
            stack.push(char)
        }
    }
    return stack.length == 0
};
```
### 四、复杂度分析
**时间复杂度**：O(n)，因为我们一次只遍历给定的字符串中的一个字符并在栈上进行 O(1)的推入和弹出操作。
**空间复杂度**：O(n)，当我们将所有的开括号都推到栈上时以及在最糟糕的情况下，我们最终要把所有括号推到栈上。例如 ((((((((((。
