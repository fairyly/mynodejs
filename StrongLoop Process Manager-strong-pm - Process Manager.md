# strong-pm - Process Manager

* https://github.com/strongloop/strong-pm/
* http://strong-pm.io/
* StrongLoop Node.js API Platform: https://docs.strongloop.com/pages/viewpage.action?pageId=10879061

* 1.features
  - Build, package, and deploy your Node application to a local or remote system.
  - View CPU profiles and heap snapshots to optimize performance and diagnose memory leaks.
  - Keep processes and clusters alive forever.
  - View performance metrics on your application.
  - Easily manage multi-host deployments with Nginx integration.
  - Unify multiple StrongLoop PMs to a distributed microservices runtime managed from Arc.

* 2.install

```
  npm install -g strongloop
  $ cd <my-app>
  $ slc start
```
* 3.Display app status
  ```
    $ slc ctl
  ```
  
* 4.Change cluster size
  ```
    $ slc ctl set-size express-example-app 2
    $ slc ctl
  ```
* 5.View logs

```
  $ slc ctl log-dump express-example-app --follow
```
* 6.Update your environment with no downtime

```
$ slc ctl env-set express-example-app NODE_ENV=production
```

* 7.View CPU and memory profiles
```
$ slc ctl cpu-start 1.1.58224

$ slc ctl cpu-stop 1.1.58224

$ slc arc

```
