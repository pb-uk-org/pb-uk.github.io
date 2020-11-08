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

</script>
s
```js
{% include ../_improved-bubble-sort-generator.js %}
```
