## 项目说明文档

### 原理介绍

Gulp 是一个任务执行器，具体的功能任务需要通过代码或者插件来实现。我们需要先设计工作流程，然后选择对应的插件，最后在 gulp 的入口文件中注册任务，使用 series()或者 parallel()组合任务。

### 实现过程

#### 〇 安装 gulp 模块以及会使用到的 gulp 插件

```
// Gulp模块
yarn add gulp
// 自动加载Gulp插件
yarn add gulp-load-plugins --dev
// 删除文件
yarn add del --dev
// 编译scss
yarn add gulp-sass node-sass --dev
// 转译ES6
yarn add gulp-babel @babel/core @babel/preset-env --dev
// swig引擎模板
yarn add gulp-swig --dev
// 热更新浏览器
yarn add browser-sync --dev
// 压缩js代码
yarn add gulp-uglify --dev
// 压缩图片
yarn add gulp-imagemin --dev
// 压缩css代码
yarn add gulp-clean-css --dev
// 获取文件数据，如json
yarn add gulp-data --dev
// 合并css/js引用
yarn add gulp-useref --dev
// 压缩html代码
yarn add gulp-htmlmin --dev
```

① 使用 gulp-load-plugins 自动加载所有的插件

```javascript gulpfile.js
const $ = require("gulp-load-plugins")();
```

② src()创建一个流，用于获取文件，dest()用于写入文件，在他们之间使用插件或者 Node 模块处理文件。例如使用 gulp-sass 插件编译 scss 文件，其他任务类似。

```javascript
const css = () => {
  return src(config.src + config.css + "*.scss")
    .pipe($.sass())
    .pipe(dest(config.temp + config.css));
};
```

③ 启动 Browser-sync，并监视 src 目录下的文件变更，如果文件变化，重新加载项目，并刷新浏览器。

```javascript
const serve = () => {
  bs.init({
    server: {
      baseDir: ["temp", "src", "public"],
      routes: { "/node_modules": "node_modules" },
    },
  });
  watch(config.src + config.css + "*.scss", css);
  watch(config.src + config.js + "*.js", js);
  watch(config.src + "*.html", html);
  watch([
    config.temp + "**",
    config.src + config.image + "**",
    config.src + config.font + "**",
    config.public + "**",
  ]).on("change", bs.reload);
};
```

④ 合并 css/js 引用，减少依赖文件，减少浏览器请求次数，通过 gulp-if 判断文件类型，根据类型选择插件进行压缩。

```javascript gulpfile.js
const useref = () => {
  return src(config.temp + "*.html")
    .pipe($.useref({ searchPath: [config.temp, "."] }))
    .pipe($.if(/\.js$/, $.uglify()))
    .pipe($.if(/\.css$/, $.cleanCss()))
    .pipe($.if(/\.html$/, $.htmlmin({ collapseWhitespace: true })))
    .pipe(dest(config.dist));
};
```

⑤ 创建完任务，使用 series() 或者 parallel()对任务进行组合。

```javascript gulpfile.js
// 编译scss， 转译ES6，生成html，三个任务可同时执行。
const compile = parallel(html, js, css);
// 需要先删除之前产生的测试代码，再编译，最后启动服务器并监视文件变更。
const develop = series(clean, compile, serve);
// 上线之前，压缩代码，合并引用
const build = series(clean, compile, parallel(image, font, extra), useref);
```

⑥ 压缩代码，合并引用等任务无需提供给用户，设置为私有任务。用户可以执行的任务，使用 exports 导出成为公共任务。

```javascript gulpfile.js
module.exports = { clean, develop, build };
```

### 使用说明

项目提供了三个 gulp 任务 `compile`, `develop` 和 `build`

clean ：清除缓存文件，和 build 产生的代码。

develop ：开发者模式，启动服务器并实时更新。

build ：上线前生成压缩文件和代码。
