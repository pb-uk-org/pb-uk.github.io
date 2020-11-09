(function () {
  "use strict";

  function swap(set, a, b) {
    const temp = set[a];
    set[a] = set[b];
    set[b] = temp;
  }

  class Bubble {
    constructor(unsorted) {
      this.set = unsorted;
      this.swaps = 0;
      this.compares = 0;
      this.isSorted = false;

      this.i = 1;
      this.n = this.set.length;
      this.swapped = false;
    }

    step() {
      if (this.isSorted) return this;
      const { set, i } = this;
      ++this.compares;
      if (set[i-1] > set[i]) {
        ++this.swaps;
        this.swapped = true;
        swap(set, i, i-1);
      }
      ++this.i;
      if (this.i >= this.n) {
        if (!this.swapped) {
          this.isSorted = true;
          return this;
        }
        --this.n;
        this.i = 1;
        this.swapped = false;
      }
      return this;
    }
  }

  const classes = {
    Bubble,
  };

  const store = [];
  const id = 0;

  store[id] = new classes.Bubble([9,0,1,2,3,4,5,6,7,8]);

  let anyUnsorted = true;
  let steps = 0;
  store.forEach((state) => {
    console.log(JSON.stringify(state));
  });
  while (anyUnsorted && steps < 1000) {
    ++steps;
    anyUnsorted = false;
    store.forEach((sorter) => {
      const state = sorter.step();
      console.log(JSON.stringify(state));
      anyUnsorted |= !state.isSorted;
    });
  }
})();
