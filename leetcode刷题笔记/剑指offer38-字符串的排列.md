```javascript
function fullpermutate(str) {
 var result = [];
 if (str.length > 1) {
   //遍历每一项
   for (var m = 0; m < str.length; m++) {
     //拿到当前的元素
     var left = str[m];
     //除当前元素的其他元素组合
     var rest = str.slice(0, m) + str.slice(m + 1, str.length);
     //上一次递归返回的全排列
     var preResult = fullpermutate(rest);
     //组合在一起
     for (var i = 0; i < preResult.length; i++) {
       var tmp = left + preResult[i]
       result.push(tmp);
     }
   }
 } else if (str.length == 1) {
    result.push(str);
 }
 result.sort();
 return [...new Set(result)];
}
```
分析：
- 遍历字符串的每一个元素，并将字符串中除了该元素的其他元素进行全排列
- 排列好的数组每一项再与这个元素组合在一起
- 由于字符串可能出现重复的字符，因此去重