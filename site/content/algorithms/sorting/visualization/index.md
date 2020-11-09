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
canvas:
  width: 320
  height: 180
---
# {{ title }}

This is where my app goes.
{% raw %}
<div id="app">
<div>{{ message }}</div>
</div>
{% endraw %}

{% include _sorter-card.njk %}

<div>
  <canvas id="canvas-1" width="{{ canvas.width }}" height="200"></canvas>
</div>

<div>
  <canvas id="canvas-2" width="{{ canvas.width }}" height="200"></canvas>
</div>

<div>
  <canvas id="canvas-3" width="{{ canvas.width }}" height="200"></canvas>
</div>

<div>
  <canvas id="canvas-4" width="{{ canvas.width }}" height="200"></canvas>
</div>

<div>
  <canvas id="canvas-5" width="{{ canvas.width }}" height="200"></canvas>
</div>

<div>
  <canvas id="canvas-6" width="{{ canvas.width }}" height="200"></canvas>
</div>

<div>
  <canvas id="canvas-7" width="{{ canvas.width }}" height="200"></canvas>
</div>

<div>
  <canvas id="canvas-8" width="{{ canvas.width }}" height="200"></canvas>
</div>

<div>
  <canvas id="canvas-9" width="{{ canvas.width }}" height="200"></canvas>
</div>

<div>
  <canvas id="canvas-10" width="{{ canvas.width }}" height="200"></canvas>
</div>

<div>
  <canvas id="canvas-11" width="{{ canvas.width }}" height="200"></canvas>
</div>


<script>

function render({ compare, swap, set, chart }, value, done, repaint) {
  if (repaint) {
    chart.repaint(set);
    return;
  }
  const { last } = compare;
  console.log(last);
  chart.draw(last[0], set[last[0]], last[1], set[last[1]], last[2]);
}

{% include _visualization.js %};

let fn =
{% include _improved-bubble-sort-generator.js %};

const visualizations = new Visualizations({ render });
const fps = false;
const max = 100;

function getSet() {
  const set = [];
  for (let i = 1; i <= max; ++i) {
    set.push(i);
  }
  shuffle(set);
  return set;
}

for (let i = 0; i < 10; i++) {
  const set = getSet();
  console.log(set);
  visualizations.add({
    generatorFunction: fn,
    set,
    chart: {
      el: `#canvas-${i}`,
      n: set.length,
      max,
    },
  });
}

function iterate() {
  if (visualizations.allDone) return;
  visualizations.step();
  if (visualizations.allDone) {
    setTimeout(() => {
      visualizations.renderAll(true);
    }, fps === false ? 0 : 1000 / fps);
  };
  setTimeout(iterate, fps === false ? 0 : 1000 / fps);
}

visualizations.renderAll(true);
iterate();

</script>
s
```js
{% include _improved-bubble-sort-generator.js %}
```
