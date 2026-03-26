export default class Vue {
  constructor(options) {
    this.data = options.data;
  }
  initData(){
      this.data.forEach(data => {
          Object.defineProperty()
      });
  }
}
