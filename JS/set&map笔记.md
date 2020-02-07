## Set和Map学习笔记

### Set
✨ 一、ES6 提供了新的数据结构 Set。它类似于数组，但是**成员的值都是唯一的，没有重复的值**。

✨ 二、Set 结构实例的属性和方法 

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
### WeakSet

✨ 一、WeakSet 对象允许你将弱引用对象储存在一个集合中。
```
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```
✨ 二、WeakSet 与 Set 的区别：

- WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
- WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个对象值，则这个对象将会被垃圾回收掉（不考虑该对象还存在于 WeakSet 中）。
- WeakSet 没有size属性，没有办法遍历它的成员。

✨ 三、WeakSet 结构有以下三个方法。

`add(value)`：向 WeakSet 实例添加一个新成员。
`delete(value)`：清除 WeakSet 实例的指定成员。
`has(value)`：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

### Map

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

### WeakMap
✨一、WeakMap 对象是一组键值对的集合，其中的键是弱引用对象，而值可以是任意。

注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

WeakMap 保持了对键名所引用的对象的弱引用，即垃圾回收机制不将该引用考虑在内。只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
```
const wm = new WeakMap();
let key = new Array(5 * 1024 * 1024);
wm.set(key, 1);
key = null;
```
当我们设置 wm.set(key, 1) 时，其实建立了 wm 对 key 所引用的对象的弱引用，但因为 let key = new Array(5 * 1024 * 1024) 建立了 key 对所引用对象的强引用，被引用的对象并不会被回收，但是当我们设置 key = null 的时候，就只有 wm 对所引用对象的弱引用，下次垃圾回收机制执行的时候，该引用对象就会被回收掉。

✨二、属性和方法
**属性：**
`constructor`：构造函数

**方法：**
`has(key)`：判断是否有 key 关联对象
`get(key)`：返回key关联对象（没有则则返回 undefined）
`set(key)`：设置一组key关联对象
`delete(key)`：移除 key 的关联对象

### 总结
- Set
    - 成员唯一、无序且不重复
    - [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
    - 可以遍历，方法有：add、delete、has
- WeakSet
    - 成员都是对象
    - 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
    - 不能遍历，方法有add、delete、has
- Map
    - 本质上是键值对的集合，类似集合
    - 可以遍历，方法很多可以跟各种数据格式转换
- WeakMap
    - 只接受对象作为键名（null除外），不接受其他类型的值作为键名
    - 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
    - 不能遍历，方法有get、set、has、delete
### 参考链接
[1. Set 和 Map 数据结构](http://es6.ruanyifeng.com/#docs/set-map)
[2. ES6 系列之 WeakMap](https://segmentfault.com/a/1190000015774465)
[3. 介绍下 Set、Map、WeakSet 和 WeakMap 的区别](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/6)
