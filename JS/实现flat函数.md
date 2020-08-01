数组的扁平化，是将一个嵌套多层的数组 array (嵌套可以是任何层数)转换为只有一层的数组
```javascript
var arr = [[1,2,3],4,5,6,[[7]],[]]
var result = flatten(arr); // [1,2,3,4,5,6,7]
```

```javascript
function flatten(arr, result = []) {
    for (let item of arr) {
        if (Array.isArray(item)) {
            flatten(item, result)
        } else {
            result.push(item)
        }
    }
    return result;
}
```