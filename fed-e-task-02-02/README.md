# fed-e-task-02-02

# 模块二：模块化开发与规范化标准

## 简答题

### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

答：（参考《深入浅出 Webpack》）
1. 初始化参数：根据配置文件和shell语句，得到最终参数。
2. 开始编译：使用最终参数初始化 Compiler 对象，加载 Plugins 中的所有插件。
3. 确认入口：根据 entry 找到所有入口文件。
4. 编译模块：从所有入口文件开始，使用 module.rules 中配置的 loader 编译模块，再找出该模块依赖的模块，递归本步骤。
5. 完成模块编译：得到所有编译后的文件，以及他们之间的依赖关系，生成依赖图。
6. 输出资源：根据所有入口文件和依赖图，组成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表。
7. 输出完成：在确定好输出内容后，根据 output 把文件内容写入文件系统。

### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

答：
1. Loader 和 Plugin 的不同: Loader 是 Webpack 的核心机制，用于转换各种类型的模块，根据配置文件中 module.rules 将源文件经过指定 Loader 处理后输出新的结果。Plugin 用来扩展 Webpack 的功能，通过在构建流程里注入钩子实现。插件可以用于执行范围更广的任务，例如打包优化，资源管理，注入环境变量。
2. 开发 Loader 的思路：如果一个源文件需要通过多个步骤处理，通常是由多个 Loader 链式的去转化源文件内容，上一个 Loader 处理的结果再传给下一个 Loader。所以开发一个 Loader 时，只需关注输入和输出，输入的是需要处理的原内容，输出的是处理后的结果。具体编写 Loader 时，只需导出一个函数，函数的参数为 Compiler 传递给 Loader 的一个文件的原内容，经过函数处理，最后 return 处理后的内容。即可完成一个简单的 Loader。
3. 开发 Plugin 的思路：在 Webpack 运行的生命周期中，会广播许多钩子事件，Plugin 可以监听这些事件，并通过 Webpack 提供的 API 改变输出的结果。编写一个 Plugin 时，需要导出一个函数或者包含 apply 方法的对象。apply 的参数为 compiler，其中包含了所以配置信息，在选定钩子事件后，使用 tap() 注册钩子函数，函数参数为钩子名称和 compilation，compilation 是当前模块资源的上下文，通过覆盖 compilation 的内容，从而修改输出的结果。

## 编程题 

### 使用 Webpack 实现 Vue 项目打包任务

实现代码：[code/vue-app-base](code/vue-app-base)

实现过程：[code/vue-app-base/README.md](code/vue-app-base/README.md)
