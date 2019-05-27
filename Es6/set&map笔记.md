## Set和Map学习笔记

### Set
 ✨ 一、ES6 提供了新的数据结构 Set。它类似于数组，但是**成员的值都是唯一的，没有重复的值**。

 ✨ 二、Set 结构实例的属性和方法 

`Set.prototype.constructor` : 构造函数

`Set.prototype.size` : 返回Set实例的成员总数

操作方法 ：

`add(value)`：添加某个值，返回 Set 结构本身。

`delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。

`has(value)`：返回一个布尔值，表示该值是否为Set的成员。

`clear()`：清除所有成员，没有返回值。

遍历方法：

`keys()`：返回键名的遍历器

`values()`：返回键值的遍历器

`entries()`：返回键值对的遍历器

`forEach()`：使用回调函数遍历每个成员

**说明：** 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。


✨ 三、去除数组重复元素
```
[...new Set(array)]
[...new Set('ababbc')].join('')    // "abc"
```
```
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

### Map

✨ 一、ES6 提供了 Map 数据结构。**它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键**。

✨ 二、Map 结构实例的属性和方法 

 `Map.prototype.constructor` : 构造函数

`Map.prototype.size` : 返回Map实例的成员总数

**操作方法：**

`set(key, value)`: set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。

`get(key)` : get方法读取key对应的键值，如果找不到key，返回undefined。

`has(key)`:has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

`delete(key)`:delete方法删除某个键，返回true。如果删除失败，返回false。

`clear`:方法清除所有成员，没有返回值。

**遍历方法：**

`keys()`：返回键名的遍历器。

`values()`：返回键值的遍历器。

`entries()`：返回所有成员的遍历器。

`forEach()`：遍历 Map 的所有成员。

## 参考链接
[Set 和 Map 数据结构](http://es6.ruanyifeng.com/#docs/set-map)
