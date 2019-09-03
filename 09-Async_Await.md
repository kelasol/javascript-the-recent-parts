# Async Await

## Async Functions
#### Quick revisit of Promises:
So to give you a quick glimpse into why we might need async functions, and the await keyword inside of them. Let's look at another feature that landed in ES6, which was promises. **Promises** are a way of representing a future value in a time-independent way. And so you can specify chains of asynchronous steps, much like this...
```javascript
fetchCurrentUser()
.then(function onUser(user){
    return Promise.all([
        fetchArchivedOrders( user.id ),
        fetchCurrentOrders( user.id )
    ]);
})
.then(function onOrder(
    [ archivedOrders, currentOrders ]
){
    //..
})
```
I could call `fetchCurrentUser`, and then I could call .then on the returned promise. And when `fetchCurrentUser` finishes, it would invoke the onUser and provide me the user that was fetched. And then I could fetch both their archived orders and their current orders, and wait for all of those to come back, and then move on to the next step, where I then say print out the user orders.

This is what's called **promise chaining**, and for a good year or two was the pretty much accepted standard for the new way of doing asynchronous programming, instead of what we refer to as the _nested callback hell_. We can organize things into these vertical chains of promises. And I'll admit that, actually, for a number of years, long before promises even landed officially in ES6, for a number of years I was very excited about this syntax compared to its capabilities, its equivalent in callbacks.

This is a much nicer syntax, or at least it seemed that way. But I'll tell you that as things stand now, I _no longer think that we should be writing promise chains like this_. _Not that we shouldn't use promises, they're great_, but I don't think that we should do `.then` chains over and over and over again.

_So, I now consider this to be somewhat of anti-pattern_, and what replaces it is the async-sync pattern that we get from async functions. 

So let's start first, before we understand async functions, let's start with generators. We talked a bit ago about generators. Another way of thinking about what a generator can do is that, because there's an iterator protocol attached to it, it can pause itself by virtue of the `yield` keyword.

### Sync-async (with generators)
```javascript
runner(function *main() {
    var user = yield fetchCurrentUser();

    var [ archivedOrders, currentOrders ] =
        yield Promise.all([
            fetchArchivedOrders( user.id ),
            fetchCurrentORders( user.id )
        ]);

    // ..
})
```
So line two says, fetch the current user, and yield out the result of that, which is a promise. And then wait for that to come back. And that's why I'm then able to say, `user =`, because that whole statement pauses until we get a user back. The way it does the pausing is actually that `runner`.

I'm using a library utility, and there are dozens of them out there. You may have heard of libraries like Co, or Koa, or Q, or Bluebird, or other sorts of promise utility libraries. They all have a utility on them which is able to run generators as if they're this sort of asynchronous/synchronous tradeoff pattern.
 
**Which means that if you yield out a promise, it will wait for it to resolve before resuming your generator, and give you the value back**. So this syntax is much more straightforward. It's a very almost synchronous-looking syntax. I'm saying `user = yield fetchCurrentUser`. And then I'm saying `archivedOrders`, `currentOrders` = the fetched `archivedOrders` and the fetched `currentOrders`.

And I'll just yield until those asynchronous operations have finished. 

This is what we call the **sync-async pattern**. And we could do this starting with ES6 because we had promises, and we had generators. And so, many people started moving from promise chains to this sync-async pattern. The unfortunate part, of course, was that you had to have a runner that could manage that whole pause and resume thing with the iterator for you.

### Async functions
And so almost this soon as ES6 was landing with promises and generators, people were saying, _hey, can you give me syntactic support for doing that whole pause and resume thing without needing a library runner? And that is exactly what the async function does._ The `async` function, now we use an `await` keyword, instead of a `yield` keyword.

```javascript
async function main() {
    var user = await fetchCurrentUser();

    var [ archivedOrders, currentOrders ] =
        await Promise.all([
            fetchArchivedOrders( user.id ),
            fetchCurrentOrders( user.id )
        ]);
    
    //.. 
}

main();
```
**It does the same thing, which is that it locally pauses while that promise finishes resolving**. And once it finishes, it gives us the value back. So inside of `async` functions, all I have to do is await on a promise, and then get the value back. And I have a very synchronous-looking style with assignments, instead of having to have this nested promise chaining kind of style of programming.

And you'll notice down on line 13, all I have to do is call the `async` function. _I don't need some library utility to run the iterator for me_. Essentially they built the whole runner thing into the JavaScript engine, and they gave us this syntax for it. So it's understandable why people have been so excited about the async function, _is because this is so much vastly improved of a syntax over callback hell, and it's even more improved over promise chains_.

And so this is a style of asynchronous programming that many people are comfortable with, and that want to be able to write, and _now we have first-class syntactic support for it_. This shipped, by the way, the async await functions shipped in ES 2017. So they are in almost every browser that you're likely to be using these days.

- It's just it officially shipped in the spec in early 2017.

## Async Await Solution
- We don't wait to do our `await`s if we want things to happen concurrently.
- The `await` keyword can't show up inside of a regular function.

```javascript
function getFile(file) {
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

async function loadFiles(files) {
	// request all files concurrently
	var prs = files.map(getFile);

	// print in order, sequentially
	for (let pr of prs) {
		console.log(await pr);
	}
}

loadFiles(["file1","file2","file3"]);

// **************************************
function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}
```

## Async Iteration
### Some issues with async function
Now, there are some issues with async functions. For example, if you tried to run a function and pass it to `forEach`. And then, inside of it, you wanted to call the `await` keyword, you might have noticed that this would fail.
 
**And the reason it fails is because the `await` keyword has to be used inside of an `async` function, not inside of a regular function.** So what do we do whenever we want to do this sort of deep awaiting, if you will, when we have a function boundary? You might think, okay, well, my solution is, I just need to pass the `async` function to the `forEach` method.

_Except the problem with that is that `async` functions come back with promises, and the `forEach` method does not know what to do with a promise_. It does not know how to wait on promises to finish. So you'd get back an iteration over a bunch of promises, but they wouldn't be waiting on each other, and they would not be printing the contents of this file in the correct order.
 
They would just print them as fast as those three separate promises resolved. So what we're really getting at here is that there's actually a conceptually missing piece to the puzzle. Not just that the syntax isn't what we want, but there's a missing piece to the puzzle. And it is that what we really need is an **asynchronous iterator**.

We need something like for each, or map, or filter, or reduce. But we need it to be able to pause automatically at each iteration, and wait for a promise before it comes back. And that's not what is built into JavaScript, the `.forEach`, the `.map`, the `.filter`, `.reduce`, the `.flat`, _now all of those, those are all what we call synchronous iterators, they run eagerly over the values that are currently in the array._

And they don't know that they should pause if they find a promise. So what we need is an eager iterator that can pause whenever it sees, we need an eager asynchronous iterator, which means it tries to go to a promise. It tries to go to each value, but if it sees a promise, then it moves on, then it waits before it moves on.

#### No JS Proposals, KS built Fasy
That's not built into JavaScript, and as far as I know, there's no proposal that is active to add it to JavaScript. But it is definitely a missing piece. And so, as an illustration of a way to solve that, I have built a library called Fasy. And Fasy provides you with eager asynchronous iterator functions for all of your standard functions, like map, filter, reduce.

It supports transducing, and what we see here, for example, is I can do concurrent map, or I can do serial `forEach`. So it provides all of these iterators in both their concurrent and serial forms. And that, you can use alongside of the standard built-in eager synchronous iterators that JavaScript already provides.

You notice now that I can pass an async function directly into `FA.serial.forEach`, because the async function, when it gives a promise, `FA.serial.forEach` knows what to do with that promise. Whereas the normal built-in `forEach` would not know what to do.


## Async Function Problems

So that helps address one of the shortcomings of async functions which is that if we nest functions inside of them, we create barriers and we can't use it in a way in a deeply nested function or whatever. That fixes one of the problems but to be honest with you, there are some other problems that I think need to be considered when we talk about async functions.

**And these issues taken together as a whole, are one of the reasons I personally still often use the generators with a runner instead of using the normal built in basic async function**,. So I want to talk to you about a few issues, design issues if you will, for async functions.

### await Only Promises
Number one. The async function, the await keyword only knows what to do with actual real promises. Which generally isn't that big of a deal but there are other representations of future values that would be more convenient sometimes to be able to await. For example, it might be useful to be able to await a custom promise that doesn't have the same then function on it, it might be useful to await a what's called a Func, which is a function representation of a future value. The await keyword doesn't offer us any options for that it's not extensible in any way. It only knows what to do with thenables and promises.

So it's a little bit more limited. That's not a huge deal, but it is a little annoying. **When you work with a generator, and you have your own gen runner, you have the complete freedom to be able to yield and pause on any representation of future value that you need to**.

### Scheduling (Starvation)
Number two, this is an even more nuanced issue, but I think a big, big problem which _is the way that the specification implemented promises is that it implemented what we call the micro-task queu_e. So to have a synchrony meaning I don't want this thing to block right now but I want it to happen on the next tick as many people say.

But I don't want it to actually be like subject to waiting on other event handlers, there's essentially internal in the event loop, this thing called the micro task queue. **And promises when ever they need to resolve an asynchronous operation they actually don't queue an event loop item, they queue something in the micro task queue**.
 
- :star: And that means that they essentially are cutting to the front of the line. So anything that's built up waiting like any ajax or other events handlers that are all waiting on the event loop. They don't get a chance to fire as long as something keeps getting added to the micro task queue.
 
_The effect of this is that certain programming patterns can either intentional or accidentally end up creating an infinite loop, where a promise keeps adding a new micro-task queue_. And it keeps consuming that event loop and it never lets anything else in the program resolve. And there's a term for that in broader concurrency programming.
 
That's called **starvation**. It's a big enough problem like whole PhD theses have been done on people studying the problems of starvation and algorithms to avoid starvation within computer programs. Starvation creates a form of denial of service, it creates a form of deadlock. These are big big problems in computer science.
 
And I find it particularly troubling that they naively implemented the _scheduling algorithm for promises, that is inherently susceptible to starvation_. I didn't go looking for this problem to try to expose it. I ran across this accidentally because I was implementing a programming concurrency pattern called CSP which stands for communicating sequential processes.
 
I ran across this problem where I had implemented CSP with a generator and then one of the things you do in CSP that's a common pattern. It ended up producing that infinite microtask loop, and it starved out the rest of the program. And that's what led me down the rabbit hole of, how did this even happen?

And then I found out, this scheduling algorithm is not preventing starvation. And so I went to the specification list I brought this to the attention of several people on TC39. And I said, this is kind of a problem, that we have this naive scheduling algorithm that is susceptible to starvation.

Here's the code that I did, very innocently, not realizing that it would expose this problem. And we went back and forth, and then they basically just said this is probably not a big deal because you're the only person that's ever complained about it. And then they just blew it off, so what we have is promises and specifically the way they were exposed inside of async _function is essentially this ticking time bomb of people accidentally gonna create starvation and not even know why it's happening_.

And it's because we didn't build the algorithm to be robust to that. There are good solid strategies that have been around for decades. And we just didn't employ any of those in the definition of the microtask queue. So that is one of the things that I'm frustrated about with the design of promises and async functions.

### External Cancellation
I think they should have been more defensive about that problem. But this third problem is really the kind of dagger to the heart. It's really the one, you could ignore these other two as being rather niche and nuance, but this third one I think is a really big deal.

And there were several really really long GitHub threads like hundreds of messages long where we were all fighting about this and I kept saying listen we need to fix this, don't ship them without this. And then they just ended up shipping it without fixing this problem. So it's almost self-inflicted, because we knew that this could be a problem.
 
**The problem I'm speaking about is that async functions are essentially black boxes that once they start, it is impossible to externally cancel them**. You can't tell an `async` function, once you invoke it, hey I know you're in the middle of doing a bunch of downloading of stuff, or whatever, but I want you to stop.

There's no way to tell it do that, which means it's gonna continue to spin on the micro task queue, and consume resources, until forever. Until it decides that it wants to stop, if ever. So I'm particularly troubled by cancellation, matter of fact I have a whole talk on the topic of asynchronous cancellation, it's called cancel all my appointments.

**I actually believe that this is such a big deal that all forms of asynchrony that we ever do should have some mechanism for cancellation**. And here, we have potentially one of the most important additions to JavaScript ever added to the language.

And so it is for those three reasons that, in many cases the async function, while it's very attractive syntactically is sort of fatally flawed. And it doesn't mean I never use them, but I still use generators whenever I need to get around one or more of these problems.

#### Cancellation Tokens
And specifically with respect to cancellation I had developed a library to try to show what I thought could be a workable way for asynchronous functions to be cancellable. It's based on the idea of **cancellation tokens**. That is not an invention that I made up. That is a standardized thing for many other languages, like C Sharp.

And in fact we already have in the web platform cancellation tokens. If you've ever used something like fetch. Fetch has a way for you to cancel an ajax request and the way you do it is to pass in a cancellation token. And then when you call abort on the cancellation token it stops the ajax request.

So it's standardized in C Sharp and we already have it in the web platform and I was like this is a really good way for us to make async functions cancellable. Unfortunately as things currently stand it's just a user-land library it didn't end up getting picked up. But this is what it looks like.

#### Cancelable async functions
It's called CAF. Stands for cancellable asynch functions, you make a token like I'm doing on line one. You make a generator that is wrapped with the CAF utility and you notice that you pass in the signal. On line 10, when you call down here token.abort on line 15.

On line 15, when you call token,abort,
It will actually send that signal into the asynchronous funciton and tell it,stop running. Whatever you're in the middle of stop right away. So now we have the way to send a standardized way of sending in a cancellation signal from the external side.

One of the most common ways that you're going to want to, or one of the most common decisions that you're going to want to make about canceling your asynchronous behavior. Is if you have a time-based cancellation like I wanna time out. I wanna let this operation run for a maximum of 5 seconds.

So you see I'm doing it kinda manually here with the set timeout. There's actually a mechanism built right into the API. Line one, you see CAF.timeout. That makes a cancellation token that will automatically cancel itself after five seconds. So then you just passed that in and you don't have to mess around with your own set timeout calls.

So again, I'm not trying to plug this library like I want you to go use it but **I deeply believe that every asynchronous operation that you write in your programs, needs to have a mechanism for cancellation if you're gonna like make a request of the file system. But what happened to the file system is network mounted and the network's down and now you're seemingly benign request to do a directory listing is hanging forever**.

_Every asynchronous operation that we could ever do in any part of the app front or back end, you should have some mechanism for cancelling it at a minimum based on a time mount_. And I was hoping that this kind of research and experimentation into something like CAF would lead to a larger movement of, let's address cancellation in the design of our asynchronous operations.

So maybe someday that ends up happening but unfortunately ships already sailed with async functions. They don't by default, have a way to do cancellation.

## Async Generators with yield
All right, so async* await functions were allowing us to implement the sync, async* pattern syntactically which is a really good thing. It improves the coding style over something like promise chains. Unfortunately there is a little bit of a conceptual limitation. To the idea of an async* await function, and that conceptual limitation is that the await keyword is essentially a **pull operation**.

I am pulling a value from a promise that may resolve after some amount of time. Pulling is great, but pulling is only half of what we often need to do. And we already saw another example of the other half which is when we talked about generators. We talked about generators being able to push things out, yield things out so that they can be consumed somewhere else.

**So what's conceptually missing here, is that we really would like the ability to both pull and push in the same kind of function**. We don't want just the generator where we can only push, or just in async* function where we can only pull. What we really would like is an **async* generator**.

And it turns out in ES2018, they added `async*` generators. This is a new function type, and they love to create new function types in JavaScript. **It's a new function type, which is both an async* function and a generator in one thing**. And you can use both the yield keyword and the await keyword in the same function.

The `yield` keyword for pushing. The `await` keyword for pulling. So let's take a look at a motivating example for that. Here I have an async function, and what I'm really trying to do is loop through a set of URLs and fetch out those responses get the text asynchronously and push it into an array.

And I'm having to do it all at once here because there's no way for me to pull from some ajax call and then push out the result now. I have to collect them all into an array and then do one single return with all of my results. If there's only two or three, that's not a big deal, but what if there were like 1,000 URLs?

Why would I wait to get all of those responses before returning one single array? _Wouldn't it be nice if I could sort of lazily push a response out every single time I got a response from the ajax request_. And if I can push it out then that means that somebody else could be lazily consuming that as a data source.

They could be saying hey just let me know every time you get another response back just iterate me again using the dot dot dot or the four over, something like that conceptually. Wouldn't it be nice if you could consume asynchronously a data source like that. Well theoretically if we were to switch this from an async* function into a generator then theoretically we could actually support that because on line three when I call `yield`.

### Overloaded yield
Because there is a runner here I'm yielding out a promise. So I'm using the yield keyword as a pull mechanism. And then later when I use yield here, I'm using yield, the same keyword but I'm now using it as a push mechanism to push out a result to somebody who might be consuming it.

Now you could theoretically write a runner that was smart enough that if you yield out a promise then it waits, and if you yield out a non-promise, then it sends it out through an iterator interface. You could write something like that, but can you just see that conceptually, this is bad programming?

Or this is confusing programming, **to overload the meaning of the yield keyword to mean two entirely different, opposite things? Pulling and pushing. It doesn't make sense**. And it would be confusing to manage this code and not be able to juggle, wait, what is this yield keyword doing? Is it pulling or is it pushing?
 
So that's the motivation for why we want to have a function type that can both await, to pull things, and yield, to push them. So that's where we get async generators.

### Async genartors
```javascript
async function *fetchURLs(urls) {
    for (let url of urls) {
        let resp = await fetch ( url );
        if (resp.status == 200) {
            let text = await resp.text();
            yield text.toUpperCase();
        }
        else {
            yield undefined;
        }
    }
}
```
We have the async word on the front, and then the star in there. So now we get both, it's like the the child of the `async*` function and the generator,they got together and now we have `async*` generators.

And you'll notice now that I can call a wait to listen for a pull of a promise, like an ajax call. And then I can use yield to push out a value.

## Async Generators Iteration

Now that's not just semantically cleaner coding, it actually produces a different kind of interface for how you would work with this function. As opposed to normal async functions where you call them and get back a single promise that waits to resolve until it has all the results for you.

When you call an async generator, what you're gonna get back is a special kind of iterator, so that you can consume its results as it has them. So you might think, okay, well, that's cool. I ought to just be able to wire up an async generator against a `for-of` loop.
 
Just like I can with regular generators, can I just do a `for-of` loop over an async generator? Well, it's not gonna quite work and let's see why. So if I were to pull all of those URLs upfront and then all of those results upfront, and do the yield keyword as I went along, how would I consume that content?

What would the consumption loop look like? Well, let's take a look. It might look like this, you might say, I'll do for let text of fetchURLs. In other words, I've gone and gotten all of them, and now I'm gonna just loop over them. But there is a problem here, which is that the fetchURLs is not gonna return us, it is returning us an iterator, but the iteration results, we don't know what the iteration result is because it's asynchronous.

So what's gonna break here is that when we call an async generator and we get back, or we call an async iterator and we call `.next `on it, and we would get back something that we thought would be an iterator result. That's what for-of is expecting. What we're actually gonna get back, **every time we call `.next` on an asynchronous iterator, is we're gonna get back a promise for an iterator result**.

Not the iterator result itself, but a promise for the iterator result. Now, this is a nuanced point, but think about the difference between getting an iterator result back that had a promise for the value in it, versus getting back a promise for the iterator result. Those are two different things.

They sound almost the same but they're different, and here's how they're different. Because if I got back an iterator result with a promise for the value, then what I would have is I would know right now if it's done true or false. But what if I can't even know if I'm done yet until after I get the result back?

Well, then I don't want an iterator result with a promise, I want a promise for the iterator result. That's the difference between asynchronous iteration of promises and an asynchronous iteration, which is what we actually want here. So this `for-of `loop couldn't work because it's gonna say, I got a promise not an iterator result.

I don't know what to do with this. So how would we do that? How would we consume such a asynchronous iterator? You can imagine wiring something kind of like this loop up. You could get an iterator from your fetchURLs function,and then you could set up a while loop.

The let `res` here on line 4, res is going to be a promise, right? And that's the problem, because we're trying to look for `res.done`, and there is no .done on it. So that's why, conceptually, the `for-of` loop above is not working, because we tried to call `it.next` and what we got back was not an iterator result.

We got back a promise. Okay, this seems solvable, right? Why don't we just have a while true loop with an await in it? I can call `it.next` and await the result of `it.next`, and then I'll have my iterator result and I can check the .done and then use the .value.

So do you see the difference between those two consumption loops? One of them is trying to go through it right away, and it can't because we don't even know whether we have a next iteration or not. And this one says, okay, I'll wait. I'll do one iteration and wait for you to give me that result.

And then another one, and wait for the result, and another one, and wait for the result. So this is an effective way to what we call asynchronously iterate, okay? It would be a **lazy asynchronous iteration**, _as opposed to, as we talked about earlier when I mentioned the fasy library, which is an eager asynchronous iteration, this is a lazy asynchronous iteration._

But nobody wants to write up their own iterator and while loop format. We want nice, clean, syntactic sugar for it. We want something like the `for-of `loop to be able to consume these lazy asynchronous generators. So you can probably guess what happened next, they added a for await of loop.

So line 2, we have for `await`, and then it is a `for-of `loop over an asynchronous iterator. So under the covers, the `for await loop` **is automatically awaiting the iterator result before moving on to decide if it needs to do another iteration.**

So now we have generators which can push out values, but they are immediate values that we can push out right away or we can push them out lazily.

_That's the benefit of a push interface, is that we can get lazy synchronous iterations_. And then we have asynchronous functions, which are pulls so we can pull values asynchronously. And then we saw something like fasy, which is a iteration that is eager, but asynchronous. And now we're seeing the fourth quadrant, which is I need to be able to push and pull at the same time, so that I can have lazy asynchronous iteration.

This was kind of the last missing conceptual piece that JavaScript didn't have, and so a whole set of use cases we basically couldn't do, or couldn't do well, because we didn't have the right primitives. You need all four of those quadrants to be filled in to be able to to do all of the various different asynchronous tasks.

_So I'm particularly excited about asynchronous generators because they represent kind of completion of the puzzle, if you will_. We finally have all the pieces in place that whatever sort of synchronous or asynchronous, pull or push, we have a primitive in the language that does all four of those things.

## Wrapping Up
- You may feel fatigued or overwhelemed with this mind-dump, but that's not the mission. Right this is complex stuff that takes time to grasp.
- The mission is really to adopt this mindset that this is a train ride, that you should hop on "Hang on right and enjoy the ride!"
- Where we are headed with JS is an amazing future 