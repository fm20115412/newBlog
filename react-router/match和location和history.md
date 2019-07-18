## match,location,history

Every time a component is rendered in a specific route, the component receive route props from React Router. There are 3 route props being passed down into component: match, location, history.

下面分别对这3个对象做一个解释：

### match

当路由路径和当前路径成功匹配，会生成一个对象match。match对象有更多关于URL和path的信息。这些信息可以通过它的属性获取，如下所示：

- match.url.返回URL中匹配部分的字符串。用于创建嵌套的<Link>很有用。
- match.path.用于匹配路径模式。用来创建嵌套的<Route>。
- match.isExact.返回布尔值，如果准确（没有任何多余字符）匹配则返回true。
- match.params. object ,根据 path 中指定的动态片段，从 URL 中解析出的键值对。

match.url 是指在浏览器中显示的真实 URL，match.path是指写在 <Route>中的path参数；。

match.params : 用于获取url中动态的的参数。
```
<Route path='/:handle' component={Profile} />
```
Then the Profile component would be able to access the dynamic handle from `props.match.params.handle`.

### location

location 代表应用程序的位置。如当前的位置，将要去的位置，或是之前所在的位置。它看起来像这样：
```
{
  key: 'ac3df4', // 使用 hash history 时，没有这个属性
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```
- pathname : pathname（路径名） 是URL中用于描述分层路径的一部分，包括最前的 /。比如，在 http://example.com/the/path?the=query 这个URL中，/the/path 就是 pathname。
  
-  search : 是URL中紧跟在 pathname（路径名） 后面的一部分，包括最前的 ?。比如，在 http://example.com/the/path?the=query 这个URL中，?the=query 就是 search。
  

### history

[](https://github.com/ReactTraining/history)