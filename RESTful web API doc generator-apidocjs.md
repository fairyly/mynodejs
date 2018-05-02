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
