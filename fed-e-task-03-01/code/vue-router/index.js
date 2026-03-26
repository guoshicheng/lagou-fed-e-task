const Home = { template: "<p>Home</p>" };
const About = { template: "<p>About</p>" };

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
}).$mount("#app");
