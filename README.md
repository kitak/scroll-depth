# scroll-depth

A JavaScript library for tracking scroll depth.

## install

Install via npm

```
npm install scroll-depth --save
```

## Usage

```javascript
document.addEventListener('DOMContentLoaded', function () {
  var list = document.getElementById('list');
  var scrollDepth = new ScrollDepth({
    target: list,
    depth: 2/3,
    throttle: 500,
    onReach: function () {
      // Something
    }
  });
});
```

## License
MIT: http://kitak.mit-license.org
