// Quicksort see https://pbuk.uk/algorithms/sorting/visualization
function* quicksortGenerator(a, { compare, swap }, _l, _r) {
  const l = _l != null ? _l : 0;
  const r = _r != null ? _r : a.length;
  let i = l - 1;
  let j = r;
  let p = l - 1;
  let q = r;
  const vIndex = r;

  if (r <= l) return a;

  for (;;) {
    while (compare(a, ++i, vIndex) < 0) {
      yield a;
    }
    while (compare(a, vIndex, --j) < 0) {
      yield a;
      if (j === l) break;
    }
    if (i >= j) break;
    swap(a, i, j);
    if (compare(a, i, vIndex) === 0) {
      yield a;
      p++;
      swap(a, p, i);
    }
    if (compare(a, vIndex, j) === 0) {
      yield a;
      q--;
      swap(a, j, q);
    }
  }
  swap(a, i, r);
  j = i - 1;
  i = i + 1;
  for (let k = l; k < p; k++, j--) {
    swap(a, k, j);
  }
  for (let k = r-1; k > q; k--, i++) {
    swap(a, i, k);
  }
  yield * quicksortGenerator(a, { compare, swap }, l, j);
  yield * quicksortGenerator(a, { compare, swap }, i, r);
}
