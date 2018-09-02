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

### 元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你

```
 比如，你可以定义一对值分别为string和number类型的元组。
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK

// Initialize it incorrectly
x = [10, 'hello']; // Error
当访问一个已知索引的元素，会得到正确的类型：
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

当访问一个越界的元素，会使用联合类型替代：
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型
```
### 枚举
enum类型是对JavaScript标准数据类型的一个补充

```
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从1开始编号：
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;

或者，全部都采用手动赋值：

enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：

enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

alert(colorName);  // 显示'Green'因为上面代码里它的值是2

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
