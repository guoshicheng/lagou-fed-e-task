function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i]);
  }
}
function filter(array, fn) {
  let rs = [];
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i])) {
      rs.push(array[i]);
    }
  }
  return rs;
}

array = [1, 3, 5, 7, 8, 10, 12];
new_array = filter(array, (item) => {
  return item % 2 == 0;
});

forEach(new_array, (item) => console.log(item));
