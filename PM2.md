# PM2

PM2 is a production process manager for Node.js applications with a built-in load balancer.   
It allows you to keep applications alive forever, to reload them without downtime and will facilitate common system admin tasks.   
It also enables you to manage application logging, monitoring, and clustering.  

* https://github.com/Unitech/pm2
* http://pm2.keymetrics.io/

* 1.Installation

```
  npm install pm2 -g
```

* 2.basic use
```
  pm2 start app.js
```

* 3.Monitoring
```
pm2 monit
```

* 4.Microservice
```
List all processes:
pm2 list

Act on them:
pm2 stop    
pm2 restart 
pm2 delete  
```
