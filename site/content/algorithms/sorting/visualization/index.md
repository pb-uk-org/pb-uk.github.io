---
layout: page
title: Visualizing sorting algorithms
# templateClass: tmpl-post
# eleventyNavigation:
#   key: About
#   order: 3
tags:
  - pages
  - code
---
# {{ title }}

This is where my app goes.
{% raw %}
<div id="app">
<div>{{ message }}</div>
</div>
{% endraw %}

<!-- script src="/assets/js/visualize-sorting.js"></script -->
<script>

let fn =
{% include ../_improved-bubble-sort-generator.js %};
 


function Compare() {
  this.count = 0;
  this.last = [null, null, null];

  function compare(set, a, b) {
    ++this.count;
    const result = set[a] > set[b] ? 1 : (set[a] < set[b] ? -1 : 0);
    this.last = [a, b, result];
    return result;
  };

  this.compare = compare.bind(this);
}

Compare.factory = function () {
  return new Compare();
}

function Swap() {
  this.count = 0;
  this.last = [null, null];

  function swap(set, a, b) {
    ++this.count;
    this.last = [a, b];
    const temp = set[a];
    set[a] = set[b];
    set[b] = temp;
  };
  this.swap = swap.bind(this);
}

Swap.factory = function () {
  return new Swap();
}

const compare = Compare.factory();
const swap = Swap.factory();

// The visualisation is a generator function.
const vis = fn([5, 4, 3, 2, 1], { compare: compare.compare, swap: swap.swap });

vis.compare = compare;
vis.swap = swap;
vis.algorithm = 'Improved bubble sort';
vis.initial = 'Reversed';

vis.render = function(value) {
  console.log('Rendering', this.isDone, value, this.compare.count, this.swap.count);
};

const visualizations = [
  vis,
];

let allDone = false;
const finish = Date.now() + 2000;
visualizations.forEach(vis => {
  vis.render();
});
while (!allDone && Date.now() < finish) {
  allDone = true;
  visualizations.forEach(vis => {
    if (vis.isDone) return;
    const { done, value } = vis.next();
    vis.isDone = done;
    vis.render(value);
    allDone &= done;
  });
}

/*
let fn =
{% include ../_improved-bubble-sort-generator.js %};
 
function Compare() {
  function compare(set, a, b) {
    ++this.count;
    const result = set[a] > set[b] ? 1 : (set[a] < set[b] ? -1 : 0);
    this.last = [a, b, result];
    return result;
  };
  return compare.bind({
    count: 0,
    last: [null, null, null],
  });
  compare.count = 0;
  compare.last = [null, null, null];
  return compare;
}

function Swap() {
  function swap(set, a, b) {
    ++this.count;
    this.last = [a, b];
    const temp = set[a];
    set[a] = set[b];
    set[b] = temp;
  };
  swap.count = 0;
  swap.last = [null, null];
  return swap;
}

console.log('Sorting function', fn.name, fn);

const set = [5, 6, 7, -1,-1,3,5,3, 2, 1];
const compare = new Compare;
const swap = new Swap;

console.log('Prepared', set, compare, swap);


const sorter = fn(set, { compare, swap });

console.log('Generator', sorter);
console.log('Next', sorter.next(), compare.count, swap.count);
console.log('Next', sorter.next(), compare.count, swap.count);
console.log('Next', sorter.next(), compare.count, swap.count);
console.log('Next', sorter.next(), compare.count, swap.count);
console.log('Next', sorter.next(), compare.count, swap.count);
console.log('Next', sorter.next(), compare.count, swap.count);
console.log('Next', sorter.next(), compare.count, swap.count);
console.log('Next', sorter.next(), compare.count, swap.count);
*/

</script>
s
```js
{% include ../_improved-bubble-sort-generator.js %}
```
