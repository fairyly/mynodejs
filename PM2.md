# PM2


fairyly

498745097@qq.com

qing1503534781

Public key: ac0lk5u8nf0dve1 | Private key: s85ky4bgi25qfzm | Machine name: LAPTOP-EPL0MCAO-15e6

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

## 关于pm2的fork启动模式和cluster模式的区别

### cluster_mode：
>用cluster来做负载均衡，你的业务代码不用做任何改动。

### fork_mode：
>用fork模式启动（默认）。这种模式下有个特性，你可以修改exec_interpreter，比如你的代码不是纯js，而是类似coffee script，那么，fork模式可能更适合你。


>fork模式，单实例多进程，常用于多语言混编，比如php、python等，不支持端口复用，需要自己做应用的端口分配和负载均衡的子进程业务代码。
缺点就是单服务器实例容易由于异常会导致服务器实例崩溃。

>cluster模式，多实例多进程，但是只支持node，端口可以复用，不需要额外的端口配置，0代码实现负载均衡。
优点就是由于多实例机制，可以保证服务器的容错性，就算出现异常也不会使多个服务器实例同时崩溃。

>共同点，由于都是多进程，都需要消息机制或数据持久化来实现数据共享。



## keymetrics监控

keymetrics监控是PM2的开发者的开发和维护的一款监控工具
- 参考： [初试 pm2 keymetrics 监控服务](https://cnodejs.org/topic/56554300ad12df5d4e050b56)

## 参考
- [pm2的fork启动模式和cluster模式的区别](https://segmentfault.com/q/1010000005972763/a-1020000006078840)
- [cluster-and-fork-mode-difference-in-pm2](https://stackoverflow.com/questions/34682035/cluster-and-fork-mode-difference-in-pm2)
- [pm2进程管理工具使用总结](https://www.jianshu.com/p/7b10123c8b88)
- [关于pm2远程部署到多台机器](http://pm2.keymetrics.io/docs/usage/deployment/)
- [nodejs高大上的部署方式-PM2](http://www.cnblogs.com/zhoujie/p/nodejs4.html)
