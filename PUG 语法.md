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
#container
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

- 多行文本内容
```
p.
    asdfasdfa
    asdfasd
    adsfasd
    asdfasdfa
```
- 或者
```
p
    | dfas
    | dfas
    | dfas
```
- 文本含有标签
```
p

    | dfas <strong>hey</strong>
    | dfas
    | dfas
```

或者

```
p
    | dfas <strong>hey</strong>
        strong hey man
    | dfas
    | dfas
```

### 4.注释
- 单行注释
```
// just some paragraphs
<!-- just some paragraphs-->
```
- 非缓冲注释
```
//- will not output within markup
```

不会被编译到HTML

- 块注释

  - 第一种
    ```
    body
      //
        As much text as you want
        can go here.
    ```

  - 第二种   

    ```
    <body>
      <!--
      As much text as you want
      can go here.
      -->
    </body>
    ```
- IE注释
```
<!--[if IE 8]><html class='ie8'><[endif]-->
<!--[if IE 9]><html class='ie9'><[endif]-->
<!--[if IE ]><html class='ie8'><[endif]-->
```

### 5.变量
```
-var Pug="hello world"
 title #{Pug}
```

转义

```
-var htmlData='<strong>sdf</strong>'
p#{htmlData}
p!=htmlData
```

非转义

```
-var htmlData='<strong>sdf</strong>'
p !{htmlData}
p=htmlData
```

编译前的代码

```
p \#{htmlData}
p \!{htmlData}
```

没有的变量赋值

```
p=data;
```

是空值而不是undefined

### 6.流程代码
```
-var array=[1,2,3,4]
-for (var k in imooc)
    p=array[k]
-each k in array
    p:#{k}
-while
```

```
-var array=[1,2]
        if array.length>2
            p true
        else
            p false
```

unless 为false，才执行，用法与if类似

```
-var array=[1,2]
        unless    !istrue
            p hello
```

switch的功能

```
        -var name='java'
        case name
            when 'java': p Hi,java
        case name
            when 'pug': p Hi,pug
        default
            p Hi
```




### 参考

* https://github.com/pugjs/pug