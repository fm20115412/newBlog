```javascript
// 顺时针打印
    function printMatrix(matrix) {
      var start = 0;
      var rows = matrix.length;
      var coloums = matrix[0].length;
      var result = [];
      if (!rows || !coloums) {
        return false;
      }
      while (coloums > start * 2 && rows > start * 2) {
        printCircle(matrix, start, coloums, rows, result);
        start++;
      }
      return result;
    }

    // 打印一圈
    function printCircle(matrix, start, coloums, rows, result) {
      var entX = coloums - start - 1;
      var endY = rows - start - 1;
      for (var i = start; i <= entX; i++) {
        result.push(matrix[start][i]);
      }
      if (endY > start) {
        for (var i = start + 1; i <= endY; i++) {
          result.push(matrix[i][entX]);
        }
        if (entX > start) {
          for (var i = entX - 1; i >= start; i--) {
            result.push(matrix[endY][i]);
          }
          if (endY > start + 1) {
            for (var i = endY - 1; i > start; i--) {
              result.push(matrix[i][start]);
            }
          }
        }
      }
    }
```
分析：
1. 设起点坐标为(start,start)，矩阵的行数为rows，矩阵的列数为columns
2. 循环结束条件为 rows>start*2 并且 columns>start*2
3. 将打印一圈拆解为四部，
- 第一步：从左到右打印一行
- 第二步：从上到下打印一列
- 第三步：从右到左打印一行
- 第四步：从下到上打印一列
4. 最后一圈很有可能出现几种异常情况,打印矩阵最里面一圈可能只需三步、两步、甚至一步