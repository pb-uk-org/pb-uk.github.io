/* eslint-env browser */

class Chart {
  constructor({ $el, n, max, height, width }) {
    // Set the dimensions for the canvas.
    // These are fixed as integer multiples of n so it looks good.
    this.n = n;
    this.max = max;
    this.xScale = Math.floor(width / n);
    this.yScale = Math.floor(height / max);

    this.width = this.xScale * n;
    this.height = this.yScale * max;

    $el.innerHTML = `<canvas width="${this.width}" height="${this.height}"></canvas>`;
    this.ctx = $el.firstChild.getContext('2d');
 
    this.last = false;
    this.colours = {
      background: '#efefef',
      normal: '#afafaf',
      swap: '#9f0000',
      compare: '#007f00',
    };
  }

  draw(aIndex, aValue, bIndex, bValue, swap) {
    const { xScale, yScale, height } = this;

    if (this.last) {
      const [ai, av, bi, bv, sw] = this.last;
      if (sw > 0) {
        // They were swapped so paint out the old positions.
        this.ctx.fillStyle = this.colours.background;
        this.ctx.fillRect(ai * xScale, height - av * yScale, xScale, height);
        this.ctx.fillRect(bi * xScale, height - bv * yScale, xScale, height);
        // Paint the new positions in in grey.
        this.ctx.fillStyle = this.colours.normal;
        this.ctx.fillRect(ai * xScale, height - bv * yScale, xScale, height);
        this.ctx.fillRect(bi * xScale, height - av * yScale, xScale, height);
      } else {
        // They were not swapped so just repaint in grey.
        this.ctx.fillStyle = this.colours.normal;
        this.ctx.fillRect(ai * xScale, height - av * yScale, xScale, height);
        this.ctx.fillRect(bi * xScale, height - bv * yScale, xScale, height);
      }
    }

    if (swap > 0) {
      // They will be swapped so repaint in red.
      this.ctx.fillStyle = this.colours.swap;
      this.ctx.fillRect(aIndex * xScale, height - aValue * yScale, xScale, height);
      this.ctx.fillRect(bIndex * xScale, height - bValue * yScale, xScale, height);
    } else {
      // They are not going to be swapped so repaint in green.
      this.ctx.fillStyle = this.colours.compare;
      this.ctx.fillRect(aIndex * xScale, height - aValue * yScale, xScale, height);
      this.ctx.fillRect(bIndex * xScale, height - bValue * yScale, xScale, height);
    }

    // Remember what we did for next time.
    this.last = [ aIndex, aValue, bIndex, bValue, swap ];
  }

  repaint(set) {
    const { xScale, yScale, height, width } = this;

    // Paint out everything.
    this.ctx.fillStyle = this.colours.background;
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.fillStyle = this.colours.normal;
    set.forEach((value, i) => {
      // Paint the new positions in in grey.
      this.ctx.fillRect(i * xScale, height - value * yScale, xScale, height);
    });
  }
}

/* eslint-disable-next-line no-unused-vars*/
class Visualizations {
  constructor({ render, log, fps }) {
    this.allDone = false;
    this.fps = fps != null ? fps : false;
    this.visualizations = [];
    this.log = log;
    if (render) this.render = render;
  }

  add(options) {
    this.visualizations.push(new Visualization({
      log: this.log,
      ...options,
    }));
  }

  renderAll(repaint) {
    this.visualizations.forEach(vis => {
      this.render(vis, vis.set, vis.isDone, repaint);
      this.log(vis.id, vis);
    });
  }

  render() {} // ({ compare, swap, set }, value, done, repaint) {

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

  iterate() {
    if (this.allDone) return;
    this.step();
    if (this.allDone) {
      setTimeout(() => {
        this.renderAll(true);
      }, this.fps === false ? 0 : 1000 / this.fps);
    }
    setTimeout(() => this.iterate(), this.fps === false ? 0 : 1000 / this.fps);
  }
}

class Visualization {
  constructor({
    generatorFunction,
    render,
    set,
    chart,
    id,
  }) {
    this.id = id;
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

/* eslint-disable-next-line no-unused-vars*/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
