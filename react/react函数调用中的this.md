### 三种方法解决react中函数调用丢失this
1. 调用时bind
```
click() {
    console.log('hhh');
}
<button onClick={this.click.bind(this)}>click me </button>
```
2. 构造函数bind
```
constructor(props) {
    super(props);
    this.click = this.click.bind(this);
}
click() {
    console.log('hhh');
}
```
3. 箭头函数
缺陷：
```
click = () => {
    console.log('hhh');
}
等价于在构造函数里写成:
constructor(props) {
    this.click = () => {
      console.log(this.state.message);
    };
}
这样每一个实例都会有这个click方法，会浪费内存。
```