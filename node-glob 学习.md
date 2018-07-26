# node-glob 学习

node的glob模块允许你使用*等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则的文件。

glob工具是基于JavaScript的，它使用了minimatch库来进行匹配。

```

var glob = require("glob")
 
// options 是可选的
glob("**/*.js", options, function (er, files) {
  // files 是匹配到的文件的数组.
  // 如果 `nonull` 选项被设置为true, 而且没有找到任何文件,那么files就是glob规则本身,而不是空数组
  // er是当寻找的过程中遇的错误
})
```

1. * : 匹配该路径段中0个或多个任意字符:  
//*:匹配路径中某部分:0个或多个字符  
```
glob("js/*.js",function (er, files) {
    console.log(files)
})
```
获取js目录下的所有js文件.(不包括以'.'开头的文件)


2. ? : 匹配该路径段中1个任意字符:  
//?:匹配路径中某部分:1个字符  
```
glob("js/?.js",function (er, files) {
    console.log(files)
})
```
获取js目录下所有名字只有1个字的js.


3. [...] : 匹配该路径段中在指定范围内字符:  
注意不能组合,只能是其中一个字符  
//[]:匹配路径中某部分:指定的范围  

```
glob("js/a[0-3].js",function (er, files) {
    console.log(files)
})
```
获取js目录下a开头,第二个字符为0-3之间(包括0和3)的js(a03.js不能被匹配到)


4. *(pattern|pattern|pattern) : 匹配括号中多个模型的0个或多个或任意个的组合  
注意|前后不能有空格  
//*(pattern|pattern|pattern): 匹配路径中的某部分: 多个模型中的0个或多个.  
//除了三个模型本身,如果是组合也可以,比如ab.js,但是仅仅包含某个模型是不行的,比如a4.js.

```
glob("js/*(a|a1|b).js",function (er, files) {
    console.log(files)
})
```
获取js目录下a.js,a1.js,b.js,或者a,a1,b这几个字符的组合的js,比如ab.js


5. !(pattern|pattern|pattern) : 匹配不包含任何模型  
需要注意: !(pattern|pattern|pattern)  不等于 !(*(pattern|pattern|pattern))   
//!(pattern|pattern|pattern): 匹配路径中的某部分: 不包含任何模型.  
//带有a或者b的,都排除.需要注意的是,它并非是*(a|b)的取反  
```
glob("js/!(a|b).js",function (er, files) {
    console.log(files)
})
```
获取js目录下名字中不包含a,也不包含b的所有文件.


6. ?(pattern|pattern|pattern) : 匹配多个模型中的0个或任意1个.  

它和 4 的区别是,不可以组合.必须完全匹配

//?(pattern|pattern|pattern): 匹配路径中的某部分: 多个模型中的0个或1个. 

//精确匹配模型,不可以组合.
```
glob("js/?(a|a2|b).js",function (er, files) {
    console.log(files)
})
```
获取js目录下a.js,a2.js,b.js


7. +(pattern|pattern|pattern) : 匹配多个模型中的1个或多个.  
它和 4 的区别是,必须有一个,为空不匹配  
//+(pattern|pattern|pattern): 匹配路径中的某部分: 多个模型中的1个或多个.  
//可以是任意一个模型,也可以是他们的组合,比如ab.js  
```
glob("js/+(a|a1|b).js",function (er, files) {
    console.log(files)
})
```
获取js目录下a.js,a1.js,b.js,或者a,a1,b这几个字符的组合的js,比如ab.js  


8. @(pattern|pat*|pat?erN) : 匹配多个模型中的任意1个.  
//@(pattern|pattern|pattern): 匹配路径中的某部分: 多个模型中的1个.  
//精确匹配模型,不可以组合.和?的区别就是不可以为空.必须要是其中的一个.  
```
glob("js/@(a|a1|b).js",function (er, files) {
    console.log(files)
})
```
和 6 的区别是不匹配为空的情况


9. ** : 和 1 一样,可以匹配任何内容,但**不仅匹配路径中的某一段,而且可以匹配 'a/b/c' 这样带有'/'的内容,所以,它还可以匹配子文件夹下的文件.  

//**: 不是一个单独的路径中的某部分,而是可以带有'/',所以所有当前文件夹和子文件夹下都进行匹配
```
glob("**/@(a|a1|b).js",function (er, files) {
    console.log(files)
})
```
获取当前目录所有文件夹及子文件夹下的a.js,a1.js,b.js

还有一种方式是设置 matchBase 属性为 true ,同样可以起到在当前路径下搜索所有子文件夹的效果:

```
//matchBase: 设置为true以后,在当前目录下所有的文件夹和子文件夹里寻找匹配的文件
glob("@(a|a1|b).js",{matchBase:true},function (er, files) {
    console.log(files)
})
```
 

- 没有获取到任何匹配文件:

当glob没有获取到任何匹配的文件是,并不会像shell里那样返回模型本身,files参数返回的是一个空数组,

如果需要让files返回的是模型本身,需要设置 nonull 属性为 true
```
//nonull: 设置为true以后,如果没有找到匹配的文件,不返回空字符串,而是返回原始glob语句
glob("@(c|d|e).js",{nonull:true},function (er, files) {
    console.log(files)
})
```
 

- 同步获取匹配文件列表:

前面讲到的都是异步的方法,传入一个回调,当获取到匹配的文件的时候执行回调.如果需要同步的获取文件列表,可以这样做:
```
var files = glob.sync(pattern, [options])
```

## 参考资料
- https://www.cnblogs.com/liulangmao/p/4552339.html
- GitHub：https://github.com/isaacs/node-glob
