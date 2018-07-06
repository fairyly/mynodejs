# JSON Server 前端造 json 数据

零编码的完整虚假REST API

## use
```

npm install -g json-server



1.Create a db.json file

{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
2.Start JSON Server

$ json-server --watch db.json

 // http://localhost:3000/posts
 // http://localhost:3000/comments
 // http://localhost:3000/profile


3.Now if you go to http://localhost:3000/posts/1, 

you'll get

{ "id": 1, "title": "json-server", "author": "typicode" }
```
