# Forever

* 1.Installation
```
$ [sudo] npm install forever -g
```
* 2.basic use
```
To start a script, use the forever start command and specify the path of the script:

$ forever start script.js
This will run the script in daemon mode (in the background).
```
To run the script attached to the terminal, omit start:
```
$ forever script.js
It is a good idea to log output from forever and the script using the logging options -l, -o, -e, as shown this example:

$ forever start -l forever.log -o out.log -e err.log script.js
To view the list of scripts started by forever:

$ forever list
To stop a script started by forever use the forever stop command and specify the process index (as listed by the forever list command).

$ forever stop 1
Alternatively, specify the path of the file:

$ forever stop script.js
To stop all the scripts started by forever:

$ forever stopall
Forever has many more options, and it also provides a programmatic API.
```
