# TypeScript

### 强类型与弱类型

强类型：实参与形参一致，类型不可隐式转换。
弱类型：实参与形参不一致，类型可以隐式转换。

### 静态类型与动态类型

静态类型：声明阶段，明确类型，不可更改。
动态类型：运行阶段才明确类型，随时更改变量类型

### JavaScript 自由类型系统的问题

因为 JavaScript 是弱类型和动态类型，可以说没有类型系统。
这个使得 JavaScript 很灵活，但也失去了可靠性。

### Flow 静态类型检查方案

它弥补弱类型的弊端，提供类型系统。
通过添加类型注释，标记变量或参数的类型，实现在开发阶段类型检查。

### TypeScript

Object 泛指所有非原始类型，包括对象，数组和函数。  
元组 Tuple  
枚举 enum  
接口 interface  
可选成员?:  
只读成员 readonly  
类修饰词 公开 public  
私有 private  
只有子类可调用 protected  
readonly 只读  
抽象类 abstract  
泛型<T>  
declare
