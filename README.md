HyperQueue

This is queue manager written in NodeJS

You must install NodeJS and expreesJS.

To run it, type 'node ./bin/www'

Everything is manage from a browser.

1st, you must register each producer and consumer users : 
   http://localhost:4430/newUsers?event={"userid": 123,"name": "Alicia"}
   http://localhost:4430/newUsers?event={"userid": 456,"name": "Bill"}
   http://localhost:4430/newUsers?event={"userid": 789,"name": "Cindy"}
   http://localhost:4430/newUsers?event={"userid": 10,"name": "Consumer Foo"}
   http://localhost:4430/newUsers?event={"userid": 20,"name": "Consumer Bar"}   http://localhost:4430/newUsers?event={"userid": 30,"name": "Consumer Moo"}
   
2nd, you login as a producer and you keep in mind the session id. You send topics to the broker
   http://localhost:4430/login?event={"userid": 123}  // sessionid = 1
   http://localhost:4430/produce?event={"sessionid":1,"command": "foo"} // An event is sent to the queue foo
   http://localhost:4430/produce?event={"sessionid":1,"command": "moo"} // An event is sent to the queue moo
   http://localhost:4430/produce?event={"sessionid":1,"command": "foo"} // Another event is sent to the queue foo
   
   http://localhost:4430/login?event={"userid": 789}  // sessionid = 2
   http://localhost:4430/produce?event={"sessionid":2,"command": "bar"} // An event is sent to the queue bar
   http://localhost:4430/produce?event={"sessionid":2,"command": "moo"} // An event is sent to the queue moo
   http://localhost:4430/produce?event={"sessionid":2,"command": "foo"} // An event is sent to the queue foo

   http://localhost:4430/login?event={"userid": 456}  // sessionid = 3
   http://localhost:4430/produce?event={"sessionid":3,"command": "bar"} // An event is sent to the queue bar
   http://localhost:4430/produce?event={"sessionid":3,"command": "bar"} // An event is sent to the queue bar
   http://localhost:4430/produce?event={"sessionid":3,"command": "bar"} // Another event is sent to the queue bar
   
3rd, you login as a consumer and you keep in mind the session id. You get topics from the broker
   http://localhost:4430/login?event={"userid": 10}  // sessionid = 4
   http://localhost:4430/consume?event={"sessionid":4,"command": "foo"} // Get an event from the queue foo
    ...
   http://localhost:4430/consume?event={"sessionid":4,"command": "foo"} // Get another event from the queue foo
   
   http://localhost:4430/login?event={"userid": 20}  // sessionid = 5
   http://localhost:4430/consume?event={"sessionid":5,"command": "moo"} // Get an event from the queue foo
    ...
   http://localhost:4430/consume?event={"sessionid":5,"command": "moo"} // Get another event from the queue foo
   
   http://localhost:4430/login?event={"userid": 30}  // sessionid = 6
   http://localhost:4430/consume?event={"sessionid":6,"command": "bar"} // Get an event from the queue foo
    ...
   http://localhost:4430/consume?event={"sessionid":6,"command": "bar"} // Get another event from the queue foo
   
