// Bubble sort see pbuk.uk/algorithms/sorting/visualization
function* bubbleSortGenerator(set, { compare, swap }) {
  let n = set.length;
  // Start comparing at the end for better performance when nearly sorted.
  for (let i = n - 1; i > 0; --i) {
    // Bubble towards the start.
    for (let j = n - 1; j > n - i - 1; --j) {
      if (compare(set, j - 1, j) > 0) {
        yield set;
        swap(set, j - 1, j);
      } else {
        yield set;
      }
    }
    // The (n - i - 1)'th element is now correct.
  }
  return set;
}
