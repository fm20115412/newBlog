1. 正则
```javascript
function replaceSpace(str) {
    return str.replace(/\s/g,'%20');
}
```
2. 双指针创建新数组
```javascript
var replaceSpace = function(s) {
    if (!s || !s.length) {
        return "";
    }
    let emptyNum = 0,
        chNum = 0;
    for (let i = 0; i < s.length; ++i) {
        if (s[i] === " ") {
            ++emptyNum;
        } 
    }
    const length = emptyNum * 2 + s.length;
    const chs = new Array(length);
    // i 是新字符串的下标
    // j 是原字符串的下标
    for (let i = 0, j = 0; j < s.length; ++j) {
        if (s[j] === " ") {
            chs[i++] = "%";
            chs[i++] = "2";
            chs[i++] = "0";
        } else {
            chs[i++] = s[j];
        }
    }

    return chs.join("");
};
```
3. 双指针在原数组上替换
```JavaScript
function replaceSpace(str)
{
  // 算出空格数
  const len = str.length
  let blankCount = 0
  for (let i = 0; i < len; i++) {
    if (str[i] === ' ') {
      blankCount++
    }
  }
  // 从后往前替换
  const arr = str.split('') // js不能直接修改字符串的值，所以转换成数组
  let id = len - 1 // 指向原字符串的末尾
  let newId = len + 2 * blankCount - 1 // 指向新字符串的末尾
  while(newId > id && id >= 0) {
    if (arr[id] === ' ') {
      arr[newId--] = '0'
      arr[newId--] = '2'
      arr[newId--] = '%'
    } else {
      arr[newId--] = arr[id]
    }
    --id
  }
  str = arr.join('') // 再转换为字符串
  return str
}
```
分析：
1. 首先遍历一次字符串，找出字符串中空格总数，每替换一个空格，长度增加2,因此替换后的字符串长度等于原来的长度 + 2 * 空格数；
2. 用两个指针分别指向原始字符串的末尾id和新字符串的末尾newId，向前移动id，逐个把它指向的字符复制到newId指向的位置，直到碰到空格；
3. 碰到空格后，把id向前移动1格，newId插入'%20'，同时把newId向前移动3格；
4. 重复这个步骤，直到id和newId指向同一个位置。