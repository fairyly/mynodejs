# TypeScript

- github: https://github.com/Microsoft/TypeScript
- TypeScript使用手册: https://github.com/zhongsp/TypeScript
- gitbook: https://zhongsp.gitbooks.io/typescript-handbook/content/


## 数据类型
布尔值, 数字, 字符串, 数组, 元组 Tuple , 枚举, 任意值, 空值, Null 和 Undefined, Never, Object

### 布尔值

```
let isDone: boolean = false;
```
### 数字
```
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```
### 字符串
```
let name: string = "bob";
name = "smith";

还可以使用模版字符串，它可以定义多行文本和内嵌表达式。 这种字符串是被反引号包围（` ），并且以${ expr }这种形式嵌入表达式
let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }.

I'll be ${ age + 1 } years old next month.`;
这与下面定义sentence的方式效果相同：
let sentence: string = "Hello, my name is " + name + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";

```

### 数组
- 有两种方式可以定义数组。 
  - 第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组：
  ```
    let list: number[] = [1, 2, 3];
  ```
  - 第二种方式是使用数组泛型，Array<元素类型>
  ```
    let list: Array<number> = [1, 2, 3];
  ```






```

let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

let name: string = "bob";

let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }.

let list: number[] = [1, 2, 3];
第二种方式是使用数组泛型，Array<元素类型>：

let list: Array<number> = [1, 2, 3];




let u: undefined = undefined;
let n: null = null;
```



## 参考
- https://juejin.im/post/5b5307ce6fb9a04fb136e1d0
