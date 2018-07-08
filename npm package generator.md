# npm package generator

开发 npm 包的时候，以前需要一步一步创建目录，过程繁琐

希望开发一个 npm 包的基础结构，自动生成目录: 像狼叔写的[koa-generator](https://github.com/17koa/koa-generator)

```
demo 目录结构如下: 
ipv4
├── package.json
├── index.js 
├── .gitignore
├── .npmignore
├── README.md
├── bin
|   ├
│   └── ipv4
│       
├── lib
|   └── ipv4.js
└── test
    └── ipv4.test.js
```
