# node-module-figlet

# figlet.js： 打印 fig font 无花果字体, 如：

```

  _   _      _ _        __        __         _     _ _ _
 | | | | ___| | | ___   \ \      / /__  _ __| | __| | | |
 | |_| |/ _ \ | |/ _ \   \ \ /\ / / _ \| '__| |/ _` | | |
 |  _  |  __/ | | (_) |   \ V  V / (_) | |  | | (_| |_|_|
 |_| |_|\___|_|_|\___/     \_/\_/ \___/|_|  |_|\__,_(_|_)
```

- GitHub： https://github.com/patorjk/figlet.js


## use

- install
```
npm install figlet
```

- demo:
```
var figlet = require('figlet');

figlet('Hello World!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});
----------------------------------------------------
figlet.text('Boo!', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});
----------------------------------------------------
figlet.defaults({fontPath: "assets/fonts"});

figlet.preloadFonts(["Standard", "Ghost"], ready);

function ready(){
  console.log(figlet.textSync("ASCII"));
  console.log(figlet.textSync("Art", "Ghost"));
}
```

## 参考
- https://github.com/patorjk/figlet.js
- 
