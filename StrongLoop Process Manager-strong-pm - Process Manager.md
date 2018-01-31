# strong-pm - Process Manager

* https://github.com/strongloop/strong-pm/
* http://strong-pm.io/

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
  * Display app status
  ```
    $ slc ctl
  ```
  
  * Change cluster size
  ```
    $ slc ctl set-size express-example-app 2
    $ slc ctl
  ```
