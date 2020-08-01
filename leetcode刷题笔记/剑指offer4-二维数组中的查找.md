```javascript
function Find(target, array) {
    var row = array.length,
        col = array[0].length,
        i = 0,
        j = col - 1;
    while (i < row && j >= 0) {
        if (array[i][j] > target) {
            j--;
            continue;
        } else if (array[i][j] < target) {
            i++;
            continue;
        } else {
            return true;
        }
        return false;
    }
}
```
分析：
首先选取数组中右上角的数字：
- 如果该数字 == 要查找的数字，则查找结束；
- 如果该数字 > 要查找的数字，则剔除这个数字所在的列；
- 如果该数字 < 要查找的数字，则剔除这个数字所在的行。

也就是说，如果要查找的数字不在数组的右上角，则每一次都在数组的查找范围中剔除一行或一列，这样每一步都可以缩小查找范围，直到找到要查找的数字，或者查找范围为空。