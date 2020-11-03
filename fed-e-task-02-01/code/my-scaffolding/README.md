### 实现过程

① 在 package.json 文件中，添加 bin 字段，用来指定脚手架的入口文件。

```javascript
"bin":"main.js"
```

② mian.js 必须有一个特定的文件头，用来告诉系统用什么运行这个脚本。

```javascript
#!/usr/bin/env node

```

③ 使用 yarn，安装交互式命令行工具 -- inquirer.js

```javascript
yarn add inquirer
```

④ 使用 inquirer 的 prompt() 向用户询问配置细节，then() 获取用户反馈。

```javascript
const inquirer = require("inquirer");
inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Project Name?",
    },
  ])
  .then((answers) => {
    // 根据用户回答结果生成文件
  });
```

⑤ 安装模板引擎 ejs

```javascript
yarn add ejs
```

⑥ 最后在 then() 中使用 ejs 渲染文件

```javascript
  .then((answers) => {
    // 模板文件路径
    const tempDir = path.join(__dirname, "templates");
    // 当前node命令执行时所在的文件夹目录
    const destDir = process.cwd();

    fs.readdir(tempDir, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        // 通过模板引擎渲染文件
        ejs.renderFile(path.join(tempDir, file), answers, (err, result) => {
          if (err) throw err;
          // 将渲染后的 HTML 写入目标文件
          // result => 渲染后的 HTML 字符串
          fs.writeFileSync(path.join(destDir, file), result);
        });
      });
    });
  });
```

⑦ 最后，在项目根目录用命令 `yarn link` 将 my-scaffolding link 到全局，就可以使用命令`my-scaffolding`创建项目了。
