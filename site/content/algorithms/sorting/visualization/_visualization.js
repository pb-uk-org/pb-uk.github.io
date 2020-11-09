

class Chart {
  constructor({ el, n, max }) {
    const $el = document.querySelector(el);
    this.n = n;
    this.max = max;
    this.ctx = $el.getContext('2d');
    this.height = $el.height;
    this.width = $el.width; 
 
    this.xScale = Math.floor(this.width / n);
    this.yScale = this.height / max;
    this.last = false;
  }

  draw(aIndex, aValue, bIndex, bValue, swap) {
    const { xScale, yScale, height } = this;

    if (this.last) {
      const [ai, av, bi, bv, sw] = this.last;
      if (sw > 0) {
        // They were swapped so paint out the old positions.
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(ai * xScale, height - av * yScale, xScale, height);
        this.ctx.fillRect(bi * xScale, height - bv * yScale, xScale, height);
        // Paint the new positions in in grey.
        this.ctx.fillStyle = 'grey';
        this.ctx.fillRect(ai * xScale, height - bv * yScale, xScale, height);
        this.ctx.fillRect(bi * xScale, height - av * yScale, xScale, height);
      } else {
        // They were not swapped so just repaint in grey.
        this.ctx.fillStyle = 'grey';
        this.ctx.fillRect(ai * xScale, height - av * yScale, xScale, height);
        this.ctx.fillRect(bi * xScale, height - bv * yScale, xScale, height);
      }
    }

    if (swap > 0) {
      // They will be swapped so repaint in red.
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(aIndex * xScale, height - aValue * yScale, xScale, height);
      this.ctx.fillRect(bIndex * xScale, height - bValue * yScale, xScale, height);
    } else {
      // They are not going to be swapped so repaint in green.
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(aIndex * xScale, height - aValue * yScale, xScale, height);
      this.ctx.fillRect(bIndex * xScale, height - bValue * yScale, xScale, height);
    }

    // Remember what we did for next time.
    this.last = [ aIndex, aValue, bIndex, bValue, swap ];
  }

  repaint(set) {
    console.log('repainting');
    const { xScale, yScale, height, width } = this;

    // Paint out everything.
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.fillStyle = 'grey';
    set.forEach((value, i) => {
      // Paint the new positions in in grey.
      this.ctx.fillRect(i * xScale, height - value * yScale, xScale, height);
    });
  }
}

class Visualizations {
  constructor({ render }) {
    this.allDone = false;
    this.visualizations = [];
    if (render) this.render = render;
  }

  add(options) {
    this.visualizations.push(new Visualization(options));
  }

  renderAll(repaint) {
    this.visualizations.forEach(vis => {
      this.render(vis, vis.set, vis.isDone, repaint);
    });
  }

  render({ compare, swap, set }, value, done, repaint) {
    console.log(done || false, value || set, compare.last, compare.count, swap.count);
  }

  step() {
    if (this.allDone) return;
    let allDone = true;
    this.visualizations.forEach(vis => {
      if (vis.isDone) return;
      const { done, value } = vis.next();
      vis.isDone = done;
      this.render(vis, value, done);
      allDone &= done;
    });
    this.allDone = allDone;
  }
}

class Visualization {
  constructor({
    generatorFunction,
    render,
    set,
    chart,
  }) {
    this.compare = new Compare();
    this.swap = new Swap();
    this.render = render;
    this.set = set;
    this.chart = new Chart(chart);

    // The visualisation is a generator function.
    this.generator = generatorFunction(set, {
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
