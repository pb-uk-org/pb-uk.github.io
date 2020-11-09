function* improvedBubbleSortGenerator(set, { compare, swap }) {
  let n = set.length;
  for (let i = 0; i < n - 1; ++i) {
    for (let j = 0; j < n - i - 1; ++j) {
      if (compare(set, j, j + 1) > 0) {
        yield set;
        swap(set, j, j + 1);
      } else {
        yield set;
      }
    }
  }
  return set;
}
