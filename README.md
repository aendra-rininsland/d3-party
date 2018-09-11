d3-party
========

This is bit of a joke library intended to both showcase rapid prototyping
with [d3-bootloader][1] for [London D3.js][2], as well as make everything just
a bit more colourful.

Usage:
------

```bash
$ npm i d3-party
```

```js
import party from 'd3-party';

const svg = d3.select('svg');
const meMaybe = party(svg);
const bars = d3.selectAll('rect').call(meMaybe);
```


[1]: https://github.com/ft-interactive/d3-bootloader
[2]: https://www.meetup.com/London-d3js/events/253810807/
