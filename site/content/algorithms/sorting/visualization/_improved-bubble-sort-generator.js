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

/*
function* improvedBubbleSortGenerator(set, { compare, swap }) {
  let n = set.length;
  do {
    let newN = 0;
    for (let i = 1; i < n; ++i) {
      // Swap if set[i-1] > set[i].
      if (compare(set, i - 1, i)) {
        yield set;
        // Swap if set[i-1] > set[i].
        swap(set, i - 1, i);
        newN = i;
      } else {
        yield set;
      }
    }
    n = newN;
  } while (n > 1);
  // The set is sorted.
  return set;
}
*/
