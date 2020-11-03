const sass = require("sass");

module.exports = (grunt) => {
  // 加载所有的grunt插件
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    clean: {
      main: ["temp/**", "dist/**"],
    },
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
            dest: "temp/assets/styles",
            ext: ".css",
          },
        ],
      },
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
      },
      main: {
        files: [
          {
            expand: true,
            cwd: "src/assets/scripts",
            src: "*.js",
            dest: "temp/assets/scripts",
            ext: ".js",
          },
        ],
      },
    },
    swigtemplates: {
      options: {
        defaultContext: {
          pageTitle: "My Title",
        },
        templatesDir: "src",
      },
      temp: {
        dest: "temp/",
        src: ["src/*.html"],
      },
    },
    watch: {
      js: {
        files: ["src/assets/scripts/*.js"],
        tasks: ["babel"],
      },
      css: {
        files: ["src/assets/styles/*.scss"],
        tasks: ["sass"],
      },
      html: {
        files: ["src/*.html"],
        tasks: ["contrib-copy"],
      },
    },
    browserSync: {
      bsFiles: {
        src: ["temp/**/*"],
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "./temp",
          routes: { "/node_modules": "node_modules" },
        },
      },
    },
    uglify: {
      main: {
        files: [
          {
            expand: true,
            cwd: "temp/assets/scripts",
            src: "*.js",
            dest: "dist/assets/scripts",
            ext: ".js",
          },
        ],
      },
    },
    cssmin: {
      main: {
        files: [
          {
            expand: true,
            cwd: "temp/assets/styles",
            src: "*.css",
            dest: "dist/assets/styles",
            ext: ".css",
          },
        ],
      },
    },
    copy: {
      temp: {
        files: [
          {
            expand: true,
            cwd: "src/assets/images",
            src: "*",
            dest: "temp/assets/images/",
          },
          {
            expand: true,
            cwd: "src/assets/fonts",
            src: "*",
            dest: "temp/assets/fonts/",
          },
        ],
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: "temp/assets/images",
            src: "*",
            dest: "dist/assets/images/",
          },
          {
            expand: true,
            cwd: "temp/assets/fonts",
            src: "*",
            dest: "dist/assets/fonts/",
          },
          {
            expand: true,
            cwd: "temp/",
            src: "*.html",
            dest: "dist",
          },
          {
            expand: true,
            cwd: "public/",
            src: "*.ico",
            dest: "dist",
          },
        ],
      },
    },
  });

  grunt.registerTask("compile", [
    "clean",
    "sass",
    "babel",
    "swigtemplates",
    "copy:temp",
  ]);

  grunt.registerTask("serve", ["compile", "browserSync", "watch"]);

  grunt.registerTask("build", ["compile", "uglify", "cssmin", "copy:dist"]);
};
