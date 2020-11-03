# ES 新特性

### let 声明

1. let 不同于 var，其声明变量只在 let 声明的代码块内有效。

```javaScript
for (let i = 0; i < 3; i++) {
    // ...
}
console.log(i); // ReferenceError: i is not defined
```

2. for 循环()部分是 for 循环{}部分的父级作用域, 下面代码证明小括号里的变量 i 和大括号的变量 i 处在不同的作用域中。

```javaScript
for (let i = 0; i < 3; i++) {
    let i = 'abc'
    console.log(i);
} // 结果： abc abc abc
```

3. 只要块级作用域中包含 let 声明，那么它所声明的变量就不再受外部的影响。而 let 声明的变量不存在变量提升，也就是不能在声明之前调用。所以从代码块开始到变量声明这个区域，变成了‘暂时性死区’。这块区域的变量不受外部影响，但也没有被变量提升，调用就会报错。

```javaScript
for (let i = 0; i < 3; i++) {
  if (i == 2) { // ReferenceError: Cannot access 'i' before initialization
    console.log(i);
  }
  let i = 2;
}
```

### 数组解构

```javaScript
let arr = [100, 200, 300];
let [foo, bar, baz] = arr;
```

### 对象解构

```javaScript
let obj = { name: "tom", age: 19 };
let { name } = obj;
```

### 模板字符串

```javaScript
// 反引号包裹
const str = `This is a string.`;

// 允许换行
const str_2 = `This is a string.
hello world!`;

// 通过${}插入表达式
const name = "tom";
const str_3 = `hello ${name}`;
```

### 参数默认值

```javaScript
function foo (enable = true) {
  // 默认参数要放到最后
}
```

### ...args 剩余参数和展开功能

```javaScript
let arr = [1,2,3,4]
Math.min(...arr) // 展开数组
```

### 箭头函数

使用 '=>' 定义函数，不可以用作构造函数，不可以使用 arguments。

### object.assign()

```javaScript
// 将源对象合并到目标对象，属性同名则覆盖前面的属性
const source = {a:111 , b:222}
const target = {b:333 , d:444}
const result = Object.assign(target,source)
```

### object.is()

和比较运算符(===)基本一致，但弥补了后者 Nan 不等于自身，和+0 等于-0 的问题。

```javaScript
+0===-0 // true
Object.is(+0,-0) // false
NaN === NaN // false
Object.is(NaN,NaN) // true
```

### Proxy 代理

在目标对象之前架设一层拦截，外界访问对象，都需要通过这层拦截。通过这个机制，可以对外界的访问进行改写。

### Reflect 反射

1. 利用 Reflect，可以拿到语言内部的方法。
2. 将一些命令式操作编程函数行为，例如 delete obj[name],可以用 Reflect.deleteProperty(obj,name)替代。

### 静态方法

static 关键词声明静态方法。父类静态方法会被子类继承

### 类的继承

### Set

类似数组，但成员不可以重复。常用来过滤重复数据。

```javascript
// 去除数组里的重复成员
let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let new_arr = [...new Set(arr)];
```

### Map

Map 数据解构类似对象，是键值对集合，但 key 不限于字符串，可以是各种数据类型或对象。

### Symbol

Symbol 是原始数据类型，可以获取一个独一无二的值.

### for ... of

for...of 可以用来遍历数组、Set 和 Map，只要有 Symbol.iterator 属性，就可以用 for...of 遍历。、

```javascript
const arr = [1, 2, 3];

for (let i of arr) {
  console.log(i); // 1 2 3
}
```

### 可迭代接口

Iterator 是一种接口，自定义数据解构只要实现了这个接口，就可以进行遍历操作。

### 生成器 Generator

```javascript
function* myGenerator() {
  yield "hello";
  return "world";
}
let g = myGenerator();
console.log(g.next()); // { value: 'hello', done: false }
console.log(g.next()); // { value: 'world', done: true }
```
