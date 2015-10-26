# An Introduction to Express.js

You should be familiar with NodeJS, to understand this tutorial.

For a better layout, head over to the presentation page: http://mazdeh.github.io/express/

### What is Express?
Minimal “unopinionated” web framework
Thin layer over core Node.js http module
Leverages various middleware packages to provide useful functionlity, such as:
parsing HTTP headers, request paramateres and bodies
parsing cookies, etc
automatic response headers based on data type.
MVC-like starker and routing
Most dominant framework for writing Web Apps for Node.js

To start this project, you need to have Node installed on your machine.
Type `node -v` in your console, to see if you are running an up to date version of node.

Create a directory — we’ll call it `/express`, and `cd` into it.
If you did have Node installed, you should be able to run the following command in the `/express` directory, and install the express package via `npm` — the Node Package Manager.
```npm install express```
This will create a new directory called `/node_modules/express`. Inside this directory is all the dependancies of the express package. 

Now that we have Express installed, let’s go ahead an create an `app.js` file, where we will write our Javascript code.

#Express Server
The ultimate goal of a server is to handle http request from client to server and vice versa, and express provides us with a nice way to do just that.

But first, let’s create a WebServer using core Node. Copy the code below into your `app.js` file.

```js
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');
```

The code above is straight from the nodejs.org website. Creating a web server in node is as simple as that.
Now if you type in `node app.js` in your terminal, you will have a server running at `http://127.0.0.1:1337/`.

This server is a core node server — meaning that it comes with node, and is a very low level server function. You basically have one function, that has to handle all your server requests! That gets frustrating very soon, as you can imagine.

What express does is wrap the http server in node.

### require(‘express’);

To get access to all the functionalities of express.js, we need to include it in our `app.js` file. Or to put it in Node form, we `require()` express, like this:
```js
var express = require(‘express’);
```
Now if you had done the express installation, you have access to express within your `app.js` file. 
We want to instantiate an express app by doing:
```js
var app = express();
```
Now our app is ready to listen on a port, we just need to tell it what port to listen to, by doing:
```js
app.listen(1337, function () {
	console.log(‘listening on port 1337’);
});
```
Now run app.js again from the terminal to make sure you’re listening on that port.

Now that we have an express server running, let’s make our first `route`.

### routes
Probably the most important thing about Express, is routing — and rightly so, since it’s a server side framework.

To listen to a route on the url, we need to use `app.get(‘/url-to-listen-to’);` and then specify in the callback function, what we want to do, when that route is hit.
```js
app.get(‘/‘, function (req, res) {
	res.send(‘hello, express!’);
});
```
The code above listens to the root url, and sends a `res` back to the `http` request that was made from the browser.

You can define as many routes as you want with express, and they would each get their own callback function.

Restart your node application from the console, and see the result.

#### `req`, and `res`
In the callback function from `app.get()`, express gives us access to the details of the HTTP `req`, by providing a variety of functions, including but not limited to the ones below:
```js
req.params
req.query
req.get()
req.is
// etc.
```
Express also enables us to modify our `res` back to the HTTP request, using methods like:
```js
res.render()
res.header
// etc. 
```
For example, we use  `res.render()` to render some html onto our page.
However if you tried doing that right now, you would get an error:
``` No view engine // blah blah ```

And that’s because we haven’t configured our express app yet to understand what sort of templating engine it needs to use to render the files that are passed into the `res.render()` function. And also the fact that we don’t have any html yet!

So let’s start by creating a `index.html` file, and put some initial html in there, to start with.

I’m going to use the code from my previous tutorial on Backbone.js — to get the index.html file from that project go to https://github/mazdeh/backbone.

Now if you have some html, let’s set our render engine:
```js
app.set(‘view engine’, ‘html’);
app.engine(‘view engine’, hbs.__express);
```
Note that you need to install the `hbs` (handlebars) node module by doing `npm install hbs.` Also note that there are many more view engines that you can use!

While we’re here, let’s also set our ‘views’ directory to the app’s view as well.
```js
app.set(‘views’, path.join(__dirname, ‘views’));
```

`__dirname` is the current directory — so we’re telling the app to look for the directory `/views` inside the current directory to find some html. 

Note: that you need to require `path` before you can use the line of code above. This should make sense to you by now.

Note: move `index.html` file into the `/views` directory.

Now to render something on our homepage (i.e. ‘/‘), `res.render()` knows what engine to use to render the html — in this case `html`.
```js
app.get('/', function (req, res) {
	res.render('index');
});
```
Notice that the `res.render()` function, takes the name of the view to be rendered, in this case `index`, adds the engine extension to it (html), and looks for that file in the `views` directory. 

Note: I am using the code from my previous tutorial on Backbone JS. I am going to be using dummy data, since we are not going to hook Express onto a database in this tutorial.

Now that we have successfully rendered our html template, we should try to send some data to the client. I’m going to use some dummy data for now.

We send things back to the client via `res.send()`.
So if we were to send an array of users back to the client when they go to `localhost://3000/users`, our express router would look something like this:

```js
app.get('/users', function (req, res) {
	// dummy data
	console.log('called')
	var users = [
		{
			"id": "1234",
			"firstname": "vahid",
			"lastname": "mazdeh",
			"age": 2
		}
	];

	if(users.length === 0) {
		res.send([]);
		} else {
		res.send(users);
	}
});
```

---

This concludes our discussion of some of the basic concepts of Express.js. It is impossible to talk about all the things you can do with this framework — that would basically mean the entire web! From all the middleware that you could slap onto Express, to the methods and functionalities that come with it. 


## Run Locally

Stay tuned for the next tutorial, on how to use this express server to power our previous Backbone tutorial.

