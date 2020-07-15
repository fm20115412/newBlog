实现JS中的indexOf方法：

```javascript
String.prototype.indexOf = function (target) {
    let source = this;
    let slen = this.length;
    let tlen = target.length;
    if (tlen > slen) {
        return -1;
    }
    if (tlen == slen) {
        return source == target ? -1 : 0;
    }
    for (i = 0; i <= slen - tlen; i++) {
        if (this.substr(i, tlen) == target) {
            return i;
        }
    }
    return -1;
}
String.prototype.substr = function (start, len) {
    let source = this;
    let str = '';
    for (let i = start; i < start + len; i++) {
        str += source[i];
    }
    return str;
}
'abbcde'.indexOf('bc'); //2
```