
class Visualizations {
  constructor({ render }) {
    this.allDone = false;
    this.visualizations = [];
    if (render) this.render = render;
  }

  add(options) {
    this.visualizations.push(new Visualization({
      ...options,
    }));
  }

  renderAll() {
    this.visualizations.forEach(vis => {
      this.render(vis);
    });
  }

  render(vis, value) {
    console.log(vis, value);
  }

  step() {
    if (this.allDone) return;
    let allDone = true;
    this.visualizations.forEach(vis => {
      if (vis.isDone) return;
      const { done, value } = vis.next();
      vis.isDone = done;
      this.render(vis, value);
      allDone &= done;
    });
    this.allDone = allDone;
  }
}

class Visualization {
  constructor({
    generatorFunction,
    render,
  }) {
    this.compare = new Compare();
    this.swap = new Swap();
    this.render = render;

    // The visualisation is a generator function.
    this.generator = generatorFunction([5, 4, 3, 2, 1], {
      compare: this.compare.compare,
      swap: this.swap.swap,
    });

    this.algorithm = 'Improved bubble sort';
    this.initial = 'Reversed';
  }

  next() {
    return this.generator.next();
  }
}

class Compare {
  constructor() {
    this.count = 0;
    this.last = [null, null, null];

    function compare(set, a, b) {
      ++this.count;
      const result = set[a] > set[b] ? 1 : (set[a] < set[b] ? -1 : 0);
      this.last = [a, b, result];
      return result;
    }
    this.compare = compare.bind(this);
  }
}

class Swap {
  constructor() {
    this.count = 0;
    this.last = [null, null];

    function swap(set, a, b) {
      ++this.count;
      this.last = [a, b];
      const temp = set[a];
      set[a] = set[b];
      set[b] = temp;
    }
    this.swap = swap.bind(this);
  }
}
