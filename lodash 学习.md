# lodash: 实用工具库

- npm: https://www.npmjs.com/package/lodash
- website： https://lodash.com/
- GitHub：https://github.com/lodash/lodash

## install

```
$ npm i -g npm
$ npm i --save lodash
```

## use

```
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
```

## Array 方法
- _.chunk(array, [size=1]): 分割数组 ； size: 每一块的长度
  ```
  _.chunk(['a', 'b', 'c', 'd'], 2);
  // => [['a', 'b'], ['c', 'd']]
 
  _.chunk(['a', 'b', 'c', 'd'], 3);
  // => [['a', 'b', 'c'], ['d']]
  ```
- _.compact(array)：合并数组，并删除一些值像 false, null, 0, "", undefined, and NaN 
  ```
  _.compact([0, 1, false, 2, '', 3]);
  // => [1, 2, 3]
  ```
- _.concat(array, [values]) 创建一个新的数组连接数组与任何额外的数组和/或值
  ```
  var array = [1];
  var other = _.concat(array, 2, [3], [[4]]);
 
  console.log(other);
  // => [1, 2, 3, [4]]
 
  console.log(array);
  // => [1]
  ```
- _.difference(array, [values]) ：创建一个数组的数组值不包括在其他给定数组，
  ```
  _.difference([2, 1], [2, 3]);
  // => [1]
  
  _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
  // => [1.2]
  ```




## 参考资料
- https://lodash.com/docs/4.17.10
