## 项目说明文档

### 原理介绍

grunt 和 gulp 很类似，区别在于 grunt 基于磁盘进行文件操作，gulp 基于内存。在使用上，grunt 需要先为任务配置选项，然后加载插件，最后注册任务。

### 实现过程

〇 安装 grunt 模块以及会使用到的 grunt 插件

```
yarn add grunt
yarn add load-grunt-tasks --dev
yarn add grunt-contrib-clean --dev
yarn add grunt-sass sass --dev
yarn add grunt-babel @babel/core @babel/preset-env --dev
yarn add grunt-contrib-copy --dev
yarn add grunt-swigtemplates --dev
yarn add grunt-browser-sync --dev
yarn add grunt-contrib-watch --dev
yarn add grunt-contrib-uglify --dev
yarn add grunt-contrib-cssmin --dev
```

① 使用 load-grunt-tasks 自动加载所有的插件。

```javascript
require("load-grunt-tasks")(grunt);
```

② 在 grunt.initConfig 中为插件配置选项，下面代码是 grunt-sass 插件的配置

```javascript
sass: {
    options: {
        sourceMap: true,
        implementation: sass,
    },
    main: {
        files: [
            {
            expand: true,
            cwd: "src/assets/styles",
            src: "*.scss",
            dest: "dist/assets/styles",
            ext: ".css",
            },
        ],
    },
},
```

② 注册任务，gulp 会安装参数中的数组顺序执行任务。

```javascript
grunt.registerTask("compile", [
  "clean",
  "sass",
  "babel",
  "swigtemplates",
  "copy:temp",
]);

grunt.registerTask("serve", ["compile", "browserSync", "watch"]);

grunt.registerTask("build", ["compile", "uglify", "cssmin", "copy:dist"]);
```

### 使用说明

项目提供了三个 grunt 任务 `compile`, `develop` 和 `build`

compile ：编译转译浏览器能执行的代码。

serve ：开发者模式，启动服务器并实时更新。

build ：上线前生成压缩文件和代码。
