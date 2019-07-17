## match,location,history

Every time a component is rendered in a specific route, the component receive route props from React Router. There are 3 route props being passed down into component: match, location, history.

下面分别对这3个对象做一个解释：

### match

当路由路径和当前路径成功匹配，会生成一个对象match。match对象有更多关于URL和path的信息。这些信息可以通过它的属性获取，如下所示：

- match.url.返回URL中匹配部分的字符串。用于创建嵌套的<Link>很有用。
- match.path.用于匹配路径模式。用来创建嵌套的<Route>。
- match.isExact.返回布尔值，如果准确（没有任何多余字符）匹配则返回true。
- match.params.返回一个对象包含Path-to-RegExp包从URL解析的键值对。

