// 实现这个项目的构建任务
// 导出模块成员，定义gulp任务
const { src, dest, series, parallel, watch } = require("gulp");

const $ = require("gulp-load-plugins")();
const bs = require("browser-sync").create();
const del = require("del");

const config = {
  src: "src/",
  temp: "temp/",
  dist: "dist/",
  public: "public",
  css: "assets/styles/",
  js: "assets/scripts/",
  font: "assets/fonts/",
  image: "assets/images/",
};

const data = {
  menus: [
    {
      name: "Home",
      icon: "aperture",
      link: "index.html",
    },
    {
      name: "Features",
      link: "features.html",
    },
    {
      name: "About",
      link: "about.html",
    },
    {
      name: "Contact",
      link: "#",
      children: [
        {
          name: "Twitter",
          link: "https://twitter.com/w_zce",
        },
        {
          name: "About",
          link: "https://weibo.com/zceme",
        },
        {
          name: "divider",
        },
        {
          name: "About",
          link: "https://github.com/zce",
        },
      ],
    },
  ],
  pkg: require("./package.json"),
  date: new Date(),
};

clean = () => {
  return del(config.temp, config.dist);
};

const html = () => {
  return src(config.src + "*.html")
    .pipe($.data(() => data))
    .pipe($.swig({ defaults: { cache: false } }))
    .pipe(dest(config.temp));
};

const css = () => {
  return src(config.src + config.css + "*.scss")
    .pipe($.sass())
    .pipe(dest(config.temp + config.css));
};

const js = () => {
  return src(config.src + config.js + "*.js")
    .pipe(
      $.babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(dest(config.temp + config.js));
};

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

const image = () => {
  return src(config.src + config.image + "**", { base: config.src })
    .pipe($.imagemin())
    .pipe(dest(config.dist));
};

const font = () => {
  return src(config.src + config.font + "**", { base: config.src })
    .pipe($.imagemin())
    .pipe(dest(config.dist));
};

const extra = () => {
  return src([config.public + "**"], { base: config.public }).pipe(
    dest(config.dist)
  );
};

const useref = () => {
  return src(config.temp + "*.html")
    .pipe($.useref({ searchPath: [config.temp, "."] }))
    .pipe($.if(/\.js$/, $.uglify()))
    .pipe($.if(/\.css$/, $.cleanCss()))
    .pipe($.if(/\.html$/, $.htmlmin({ collapseWhitespace: true })))
    .pipe(dest(config.dist));
};

const compile = parallel(html, js, css);

const develop = series(clean, compile, serve);

const build = series(clean, compile, parallel(image, font, extra), useref);

module.exports = { clean, develop, build };
