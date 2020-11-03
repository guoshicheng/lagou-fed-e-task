#!/usr/bin/env Node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const ejs = require("ejs");
const { tmpdir } = require("os");
const { strict } = require("assert");

inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "question Title",
    },
    {
      type: "input",
      name: "categories",
      message: "question Categories",
    },
    {
      type: "input",
      name: "description",
      message: "question Description",
    },
  ])
  .then((answers) => {
    // 模板文件路径
    const tempDir = path.join(__dirname, "templates");
    // 当前node命令执行时所在的文件夹目录
    const destDir = process.cwd();

    fs.readdir(tempDir, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        // 通过模板引擎渲染文件
        ejs.renderFile(path.join(tempDir, file), answers, (err, str) => {
          if (err) throw err;
          fs.writeFileSync(path.join(destDir, file), str);
        });
      });
    });
  });
