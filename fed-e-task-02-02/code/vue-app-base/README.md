## 项目说明文档

### 实现过程

#### 安装 webpack 

``` bash
npm install --save-dev webpack webpack-cli
```

``` javascript
// webpack.common.js
const path = require("path");

module.exports = {
  // 入口文件
  entry: "./src/main.js",
  output: {
    // 把模块合并输出到 bundle.js 文件
    path: path.resolve(__dirname, "./dist"),
    filename: "js/bundle.js",
  },
};
```

#### webpack-dev-server 启动一个服务器

``` bash
npm install --save-dev webpack-dev-server
```
``` javascript
// webpack.common.js
module.exports = {
  devServer: {
    contentBase: path.join(__dirname + "/public"),
  },
};
```

#### ES6 语言转译，使用 babel-loader 处理 .js 文件

``` bash
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

``` javascript
// webpack.common.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
    ],
  },
};
```

#### 编译 .css 文件

``` bash
npm install --save-dev css-loader vue-style-loader
npm install --save-dev url-loader file-loader
```

``` javascript
// webpack.common.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          { loader: "css-loader", options: { esModule: false } } 
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 10240,
        },
      },
    ],
  },
};
```

#### 使用 less-loader 编译 .less 文件

``` bash
npm install --save-dev less-loader less
```

``` javascript
// webpack.common.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "vue-style-loader", 
          },
          { 
            loader: "css-loader", options: { esModule: false },
          },
          {
            loader: "less-loader", 
          },
        ],
      },
    ],
  },
};
```

#### 使用 vue-loader 处理 Vue 组件

``` bash
npm install --save-dev vue-loader vue-template-compiler 
```

``` javascript
// webpack.common.js
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  module: {
    rules: [{ test: /\.css$/, use: ["vue-style-loader", "css-loader"] }],
  },
  plugins: [
    // 将 module.rules 中配置处理 .js 文件的 loader，应用到 .vue 文件中的 <script> 块。
    new VueLoaderPlugin(),
  ],
};
```

#### 使用插件 html-webpack-plugin ，根据模板生成 html

``` bash
npm install --save-dev html-webpack-plugin
```

``` javascript 
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  plugins: [
    new HtmlWebpackPlugin({
      title: "vue-app-simple",
      template: path.join(__dirname + "/public/index.html"),
    }),
  ],
};
```

#### 使用 ESLint 校验代码

``` bash
npm install --save-dev eslint eslint-loader
// 初始化 .eslintrc.js 文件
npx eslint --init
```

``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
        enforce: 'pre',
      },
    ],
  },
};
``` 

#### 为开发环境和生产环境编写不同的配置文件

``` bash
npm install --save-dev webpack-merge
```

``` javascript 
// 公共配置文件
const common = require("./webpack.common");
// webpack-merge 允许合并 webpack 配置，而不是覆盖。
const { merge } = require("webpack-merge");

module.exports = merge(common, { mode: "development" });
```

#### 修改 package.json

``` json
// package.json
"scripts": {
  "serve": "webpack serve --config webpack.dev.js",
  "build": "webpack --config webpack.prod.js",
  "lint": "eslint ./src/main.js"
},
```

### 使用说明

项目提供了三个命令`serve`, `build` 和 `lint`。

serve ：通过 webpack-dev-server 启动一个服务器，并监控被打包文件变动，自动刷新浏览器。

build ：生成生产环境代码。

lint ：使用 ESLint 检查 JS 代码风格和代码质量。