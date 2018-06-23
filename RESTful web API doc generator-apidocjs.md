## RESTful web API Documentation Generator. http://apidocjs.com

## Installation

```console
$ npm install apidoc -g
```

### Alternative docker install

```console
$ docker pull apidoc/apidoc
```

Then you will need to mount your file storage `-v '<apidoc.json dir>:/apidoc'` to docker container.

Example:

```console
$ docker run --rm -v '$(PWD):/apidoc' -it apidoc/apidoc \
    --input ./example \
    --output ./docker-example \
    -v
```

Creates from input files in `example/` a documentation in path `docker-example/`.

## Changelog

[CHANGELOG.md](https://github.com/apidoc/apidoc/blob/master/CHANGELOG.md)


## Run
```
apidoc -i myapp/ -o apidoc/ -t mytemplate/
Creates an apiDoc of all files within dir myapp/, uses template from dir mytemplate/ and put all output to dir apidoc/.
```
Without any parameter, apiDoc generate a documentation from all .cs .dart .erl .go .java .js .php .py .rb .ts files in current dir 
(incl. subdirs) and writes the output to ./doc/.


## examples，使用步骤
- http://apidocjs.com/#examples

- 先创建目录
apidoc
├── example
│   ├──test.js
│   │   
│   └── test2.js
├── doc
├──apidoc.json

```
先创建 apidoc.json

{
  "name": "example",
  "version": "0.1.0",
  "description": "A basic apiDoc example"
}
From apidoc.json apiDoc get the name, version and description of your project.
The file is optional (it depend on your template if the data is required).



example.js

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
```
- 运行生成文档
```
apidoc -i example/ -o doc/
```

## 命令行界面

显示命令行参数：

```
apidoc -h
重要参数：

参数	描述
-f，--file过滤器	正则表达式过滤来选择应该被解析（多-f可以使用）的文件。默认情况下.cs .dart .erl .go .java .js .php .py .rb .ts，
示例（仅解析和名为.js文件.TS）：
apidoc
 -f ".*\\.js$" -f ".*\\.ts$"
 
 
-i，--input	输入/源目录名。。您的项目文件的位置
示例：
apidoc
 -i myapp/
 
 
-o，--output	输出目录名。位置放在哪里来生成文档。
例如：
apidoc
 -o apidoc/
 
 
-t，--template	使用模板输出文件。您可以创建和使用自己的模板。
例如：
apidoc
 -t mytemplate/
 ```
