```javascript
var exist = function(board, word) {
    var row = board.length;
    var col = board[0].length;

    var dfs = function(i,j,board,word,index){
        if(i < 0 || i >= row || j < 0 || j > col || board[i][j] !== word[index]) return false; // 判断不符合条件
        if(index === word.length - 1) return true;  // word遍历完了
        var tmp = board[i][j];  // 记录到board的值
        board[i][j] = '-'      // 锁上，因为后续的递归是4个方向上的，无法保证上一个方向的值
        var res =  dfs(i - 1,j,board,word,index + 1) || dfs(i + 1,j,board,word,index + 1) || dfs(i,j - 1,board,word,index + 1) || dfs(i,j + 1,board,word,index + 1);
        board[i][j] = tmp;   // 恢复现场
        return res;   
    }

    // 遍历整个board，找到初始位置点
    for(var i = 0;i < row; i++){
        for(var j = 0; j < col; j++){
            if(dfs(i,j,board,word,0)) return true;
        }
    }
    // 没找到
    return false
};
```
算法剖析：
- 递归参数： 当前元素在矩阵 board 中的行列索引 i 和 j ，当前目标字符在 word 中的索引 k 。
- 终止条件：
  - 返回 false ： ① 行或列索引越界 或 ② 当前矩阵元素与目标字符不同 或 ③ 当前矩阵元素已访问过 （③ 可合并至 ② ） 。
  - 返回 true ： 字符串 word 已全部匹配，即 k = len(word) - 1 。
- 递推工作：
  - 标记当前矩阵元素： 将 board[i][j] 值暂存于变量 tmp ，并修改为字符 '/' ，代表此元素已访问过，防止之后搜索时重复访问。
  - 搜索下一单元格： 朝当前元素的 上、下、左、右 四个方向开启下层递归，使用 或 连接 （代表只需一条可行路径） ，并记录结果至 res 。
  - 还原当前矩阵元素： 将 tmp 暂存值还原至 board[i][j] 元素。
- 回溯返回值： 返回 res ，代表是否搜索到目标字符串。

### 复杂度分析：
M, N分别为矩阵行列大小， K 为字符串 word 长度。

- 时间复杂度 O(3^K * MN)： 最差情况下，需要遍历矩阵中长度为 KK 字符串的所有方案，时间复杂度为 O(3^K)矩阵中共有 MN 个起点，时间复杂度为 O(MN) 。
  - 方案数计算： 设字符串长度为 K ，搜索中每个字符有上、下、左、右四个方向可以选择，舍弃回头（上个字符）的方向，剩下 3 种选择，因此方案数的复杂度为 O(3^K)。
- 空间复杂度 O(K) ： 搜索过程中的递归深度不超过 K ，因此系统因函数调用累计使用的栈空间占用 O(K) （因为函数返回后，系统调用的栈空间会释放）。最坏情况下 K = MN ，递归深度为 MN ，此时系统栈使用 O(MN) 的额外空间。
