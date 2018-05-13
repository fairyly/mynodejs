# PUG 语法

### install
```
npm install -g pug pug-cli
```

>严格的缩进

### html

```
doctype html
html
    head
            title hello pug 
    body
        h1 pug pug
```

使用命令：

```sh
pug -P -w index.pug
```

编译后的结果为：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>hello pug </title>
  </head>
  <body>
    <h1>pug pug</h1>
  </body>
</html>
```

### 1.类名和ID名
```
a.button
a(class="button")
a(id="button")
```

### 2.属性

属性可以使用()包裹起来,属性值之间用逗号隔开

比如:
```
a(href="google.com",title="google")
```

### 3.文本内容
```
a(href="google.com",title="google") Hello World
```