# GraphQL 

- website: http://graphql.cn/
- github: https://github.com/graphql/graphql-js/
- Facebook GraphQL: https://github.com/graphql
- Simple JavaScript Client for GraphQL： https://github.com/kadirahq/lokka

- GraphQL demo
  - https://github.com/GraphQL-Party/graphql-demo-ts





## express 中使用
```
npm install express express-graphql graphql

使用 node server.js 以运行 server.js 中的代码：

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

打开浏览器后输入 
{
  hello
}


===》返回
{
  "data": {
    "hello": "Hello world!"
  }
}

```

* 参考：
  - GitHub using GraphQL： https://developer.github.com/v4/
  - http://graphql.cn/code/#javascript
  - https://blog.csdn.net/chenhaifeng2016/article/details/72843284
