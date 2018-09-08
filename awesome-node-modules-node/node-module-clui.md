# node-module-clui

Node.js的命令行UI工具包



## use

```
var CLI = require('clui'),
    clc = require('cli-color');

var Line          = CLI.Line,
    LineBuffer    = CLI.LineBuffer;

var outputBuffer = new LineBuffer({
  x: 0,
  y: 0,
  width: 'console',
  height: 'console'
});

var message = new Line(outputBuffer)
  .column('Title Placehole', 20, [clc.green])
  .fill()
  .store();

var blankLine = new Line(outputBuffer)
  .fill()
  .store();

var header = new Line(outputBuffer)
  .column('Suscipit', 20, [clc.cyan])
  .column('Voluptatem', 20, [clc.cyan])
  .column('Nesciunt', 20, [clc.cyan])
  .column('Laudantium', 11, [clc.cyan])
  .fill()
  .store();

var line;
for(var l = 0; l < 20; l++)
{
  line = new Line(outputBuffer)
    .column((Math.random()*100).toFixed(3), 20)
    .column((Math.random()*100).toFixed(3), 20)
    .column((Math.random()*100).toFixed(3), 20)
    .column((Math.random()*100).toFixed(3), 11)
    .fill()
    .store();
}

outputBuffer.output();
```



## 参考
- https://github.com/nathanpeck/clui#readme
