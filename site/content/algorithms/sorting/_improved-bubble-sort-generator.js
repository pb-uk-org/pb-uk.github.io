function* improvedBubbleSortGenerator(set, { compare, swap }) {
  let n = set.length;
  do {
    let newN = 0;
    for (let i = 1; i < n; ++i) {
      // Swap if set[i-1] > set[i].
      if (compare(set, i - 1, i)) {
        // Swap if set[i-1] > set[i].
        swap(set, i - 1, i);
        newN = i;
        yield set;
      } else {
        yield set;
      }
    }
    n = newN;
  } while (n > 1);
  // The set is sorted.
  return set;
}
