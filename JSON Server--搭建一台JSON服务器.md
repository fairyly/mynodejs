# JSON Server

零编码的完整虚假REST API

## use
```
Create a db.json file

{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
Start JSON Server

$ json-server --watch db.json
Now if you go to http://localhost:3000/posts/1, you'll get

{ "id": 1, "title": "json-server", "author": "typicode" }
```
