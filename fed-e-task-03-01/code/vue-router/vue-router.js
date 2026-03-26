let Link = {
  name: "RouterLink",
  props: ["to"],
  render(h) {
    return h(
      "a",
      { attrs: { href: this.to }, on: { click: this.go } },
      this.$slots.default
    );
  },
  methods: {
    go: function (e) {
      e.preventDefault();
      window.location.hash = "#" + this.to;
      this.$router.data.current = this.to;
    },
  },
};
let View = {
  name: "RouterView",
  render(h) {
    return h(this.$router.routerMap[this.$router.data.current]);
  },
};
let _vue = null;
class VueRouter {
  static install(Vue) {
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    _vue = Vue;
    Vue.mixin({
      beforeCreate: function () {
        if (this.$options.router) {
          _vue.prototype.$router = this.$options.router;
          this.$options.router.init();
        }
      },
    });
  }
  constructor(options) {
    this.options = options;
    this.routerMap = [];
    let href = window.location.href;
    let index = href.indexOf("#");
    this.data = _vue.observable({
      current: index < 0 ? "/" : href.slice(index + 1),
    });
  }
  init() {
    this.initEvent();
    this.initComponent(_vue);
    this.createRouteMap();
  }
  initEvent() {
    window.addEventListener("hashchange", () => {
      let href = window.location.href;
      let index = href.indexOf("#");
      this.data.current = index < 0 ? "/" : href.slice(index + 1);
    });
  }
  initComponent(Vue) {
    Vue.component("router-link", Link);
    Vue.component("router-view", View);
  }
  createRouteMap() {
    if (this.options.routes) {
      this.options.routes.forEach((route) => {
        this.routerMap[route.path] = route.component;
      });
    }
  }
}
window.Vue.use(VueRouter);
