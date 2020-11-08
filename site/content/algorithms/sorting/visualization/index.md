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


<!-- script src="/assets/js/visualize-sorting.js"></script -->
<script>

{% include _visualization.js %};

let fn =
{% include _improved-bubble-sort-generator.js %};

const visualizations = new Visualizations({
  render({ compare, swap }, value) {
    console.log(value, compare.count, swap.count);
  }
});

visualizations.add({ generatorFunction: fn });

function iterate() {
  if (visualizations.allDone) return;
  visualizations.step();
  setTimeout(iterate, 200);
}

visualizations.renderAll();
iterate();

</script>
s
```js
{% include _improved-bubble-sort-generator.js %}
```
