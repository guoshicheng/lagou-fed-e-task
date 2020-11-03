# fed-e-task-02-01

# 模块一：开发脚手架及封装自动化构建工作流

## 简单题：

### 1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。

答：以往前端开发工作十分简单，并不会像看待软件一样，关注性能、维护和管理。但随着前端工作日益的复杂，人们开始用软件工程的角度思考前端开发，通过规范化提高多人协同效率，自动化提高开发和测试效率，模块化和组件化增加复用性和灵活性等等，我觉得这些手段就是前端工程化。

1. 项目创建时使用脚手架来完成项目结构、规范和约定。
2. 页面有很多重复的组件，需要写很多重复的 JS 代码，组件化可以省略很多重复性代码。
3. 自动化构建简化了工作流，例如使用 gulp 监听代码变化，实时在浏览其中更新内容。

### 2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？

答：由于前端开发项目的多样性和复杂性，项目的结构和配置项也相对复杂。如果没有脚手架的话，对于开发人员来说，机械重复性工作降低开发效率，学习项目配置细节让开发成本变高。而在脚手架的帮助下，我们不仅可以快速创建项目的目录，还可以快速地配置项目细节，让我们更专注于业务逻辑，提高效率降低成本，让前端开发更加工程化。

## 编程题

### 1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具

实现代码：[code/my-scaffolding](code/my-scaffolding)

实现过程：[code/my-scaffolding/README.md](code/my-scaffolding/README.md)

### 2、使用 Gulp 完成项目的自动化构建

项目代码：[code/pages-boilerplate-with-gulp](code/pages-boilerplate-with-gulp)

项目说明文档：[code/pages-boilerplate-with-gulp/README.md](code/pages-boilerplate-with-gulp/README.md)

### 3、使用 Grunt 完成项目的自动化构建

项目代码：[code/pages-boilerplate-with-grunt](code/pages-boilerplate-with-grunt)

项目说明文档：[code/pages-boilerplate-with-grunt/README.md](code/pages-boilerplate-with-grunt/README.md)
