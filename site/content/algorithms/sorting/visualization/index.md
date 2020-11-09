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

<canvas id="canvas-01" width="200" height="100"></canvas>

<script>

function render({ compare, swap, set, chart }, value, done, repaint) {
  if (repaint) {
    chart.repaint(set);
    return;
  }
  console.log(set, value, done, repaint);
  const { last } = swap;
  chart.draw(last[0], set[last[0]], last[1], set[last[1]], last[2]);
}

{% include _visualization.js %};

let fn =
{% include _improved-bubble-sort-generator.js %};

const visualizations = new Visualizations({ render });

const set = [5, 4, 3, 2, 1];

visualizations.add({
  generatorFunction: fn,
  set,
  chart: {
    el: '#canvas-01',
    n: set.length,
    max: 5,
  },
});

function iterate() {
  if (visualizations.allDone) return;
  visualizations.step();
  if (visualizations.allDone) {
    setTimeout(() => {
      visualizations.renderAll(true);
    }, 100);
  };
  setTimeout(iterate, 100);
}

visualizations.renderAll(true);
iterate();

</script>
s
```js
{% include _improved-bubble-sort-generator.js %}
```
