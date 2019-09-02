# Iterators & Generators
## Iterators
So what do we mean by Iterator? What is this pattern?  
- Well basically whenever you have some data source, doesn't have to be a DB, can just be a value like an array.  
- anything that is a datasource, if you would like to consume the values in that data source one at a time, one of the most common ways to do that is called the _iterator pattern_.  
- Essentially you construct a controller that gives you a view of that data source and it presents values on value at a time.  
    - You do that by constructing an object and then calling `.next`over and over and every time you call `.next`, you get back the next value from that data source. You call `.next` until completion.  
    - Why this matters for JS, is not just for normal data structures, **but in ES6, they took all of the basic built-in data value types that exist in the lanugage and they made them iterable**.  
    - An **iterable** is something that can be iterated over. As of ES6 that means, strings, arrays would be considered, iterables, which means you can construct an iterator to consume their constituent values.  
```javascript {.line-numbers}
var str = "Hello";
var world = ["W", "o", "r", "l", "d"];

var it1 = str[Symbol.iterator]();
var it2 = world[Symbol.iterator]();

it1.next(); // { value: "H", done: false }
it1.next(); // { value: "e", done: false }
it1.next(); // { value: "l", done: false }
it1.next(); // { value: "l", done: false }
it1.next(); // { value: "o", done: false }
it1.next(); // { value: undefined, done: true }

it2.next(); // { value: "W", done: false };
```
- I'm calling this `symbol.iterator` which is this special value finds a location on the string object and produces an iterator from it. Line 4, we are accessing the special meta location of the object, and then we are invoking it as a function, and that gives us our iterator instance `it1`
- When we call `it.next()` we get back what is called at **iterator result**, an **iterator result** is just an object with two properties on it, one of them is the value property the other one is the done property, with done being a boolean telling you whether or not you are done iterating over the object.
    - even though Hello is done at o, in order to know there is nothing else to consume, you must iterate past the end of the data source (line 12 )

- Most data you deal with in JS are now iterables
- iterator protocol does not support going backwards

## Declarative Iterators
- If you wanted to iterate over a string programatically, in some kind of looping construct...
### iterators: imperative iteration
```javascript {.line-numbers}
var str = "Hello";

for (
    let it = str[Symbol.iterator](), v, result;
    (result = it.next()) && !result.done &&
        (v = result.value || true);
) {
    console.log(v);
}
// "H" "e" "l" "l" "o"
```
- We could do like the above, but its somewhat hard to understand, instead we can use as of ES6 a `for of`loop to consume an iterator...

### iterators: declarative iteration
```javascript
var str = "Hello";
var it = str[Symbol.iterator]();

for (let v of it) {
    console.log(v);
}
// "H" "e" "l" "l" "o"

for (let v of str) {
    console.log(v);
}
// "H" "e" "l" "l" "o"
```
- The `for of` loop is distinct from the `for in` loop and the regular `for` numeric iterator loop.
- The `for of` loop takes iterables, meaning things that can be iterated over.

- I'm making an iterator instance here called IT. 
    - I can iterate over an iterator, because an iterator is an iterable, it just returns itself.
 - But also, line 9, I can just say `for of `with the iterable itself, the string. I can do it in either way.
 - :star: One advantage of making your own iterator is that, if that was a function that you wanted to call, or call it from a different location, or pass some sort of arguments to it, you can make your own iterator, and then iterate over it.

### Iterable all the things!
- strings, arrays, sets, and maps, and typed arrays, all of these are iterables, which means you can use the for of loop on them.

### Spread operator 
```javascript
var str = "Hello";

var letters = [...str];
letters;
// ["H","e","l","l","o"]
```
- You can also use another syntax for iterating over them. Which is the `...` operator. T 
- So above, `...` operator says, I'm gonna go get all of those values one at a time from the thing, and iterate them out, and here I'm spreading it out, or iterating it out, into the enclosing array, line 3.

### The "bigger picture" value-add of iterators/iterables
- Kyle Simpson: So `...` and `for of` are both syntactic support for the iterator protocol, which is now a first-class built-in citizen in JavaScript.  
    - But why it matters that it's now a first-class protocol, is that that means your own custom data structures, if you adhere to the iterator protocol. If you expose an iterator that adheres to that protocol, then any user of your code can use these syntactic built-in mechanisms with your data structure.
    - All you have to do is expose an iterator on it that, when it calls .next, it returns another one of those point objects. And then somebody can use a `...` or a for of loop to iterate over your data structure.
- It creates a standardized way of iterating through data sources.

## Data Structure without Iterators

### Not everything is an iterable...
- We have this iterator protocol built in, super cool, but...
- It turns out that not all data structures have iterators.
- The object is a great example, object does not have a built in iterator. 

So if I make a regular plain old object and I call `for of` on it, I'm gonna end up getting a type error. 
    - It's a type error because the for of loop tries to access the `symbol.iterator` location on that obj object, and it doesn't find anything defined there. 

- There's a variety of reasons why they didn't ship by default, butit is not actually that difficult to define our own iterator. 

- And that's why we're talking about this is, is we wanna make our own data structures, and we wanna make our data structures adhere to the iterator protocol.

- :star: So if we know that the `for of` loop or the `...` operator, the way that it works is it automatically tries to find something at that position, `symbol.iterator`, **then all we need to do is define one at that location.**

### iterators: imperative iterator
```javascript
var obj = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.iterator]: function(){
        var keys = Object.keys(this);
        var index = 0;
        return {
            next: () => 
                (index < keys.length) ?
                    { done: false, value: this[keys[index++]] } :
                    { done: true, value: undefined }        
        };
    }
};

[...obj];
//[1,2,3]
```
- So let's try first to create our own _iterator factory function_. I call it a factory function because every time you call it you would produce a new instance of your iterator.
- You can iterate something multiple, multiple times if you want to. So here it's a function, and on line 6, for example, you'll notice here that basically I'm just getting the list of keys for my object, which would be A, B, and C.

- And then I am returning back an object. And my object has one property on it called `next`, that's what interators have, is they have a next on them. And when I call that next method, you'll notice that the next method does one thing, which is check to see if there's anymore to iterate over.

- And if so, it returns an iterator result that is done false, and then it has the value. Otherwise it returns an iterator results with done true, and value undefined. Exactly the same way as all the built in iterators do, they return of two kinds of iterators results. So I'm simply returning the results until I've gone through all the keys.

- That now has the effect down on line 17, of actually, if you look down here on line 17, it has the effect of pulling out the values from that object into an array one, two and three. Same if I had done a for of loop, I would have been getting the values one, two and three out, okay?

- KS not not a big fan of arrow functions. So what am I doing here
Well, it turns out, this particular scenario is a great illustration of why you want to use the arrow function Because I need `this` keyword inside of that function, and I need it to lexically adopt the parent context. I don't want it to define its own, I want it to adopt the parent context. That's exactly what the arrow context shines at doing, and so this is an appropriate usage of the arrow function.

### Thoughts
- :star: I include longer transcripts for the above, because it contextualizes the question that I personally had, that is how is an array of values being returned on line 18?
    - I believe the answer is how the spread operator works under the hood. As mentioned earlier is that we are expected to implement our own `Symbol.iterator` method for our objects which in turn expects to have a `.next()` method at that location. We can test this by running the above code with the method name `advance` instead of `next` and we will get the type error mentioned: `obj is not iterable`.

## Generators
 
- It would be nice if there was some other way of more declaratively creating an iterator producing function.
And that leads us to generators...
```javascript
function *main() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}

var it = main();

it.next();   // { value: 1, done: false }
it.next();   // { value: 2, done: false }
it.next();   // { value: 3, done: false }
it.next();   // { value: 4, done: true }

[...main()];
// [1,2,3]
```
- On line 1 you see an `*` appear at the very top. Right at the very top you see an `*` **that indicates that we are dealing with a special kind of function called a generator**.

- This is a new type of function that was added in the ES6, and there's lots of complexities to generators that we're not gonna cover now.

- **When you invoke them, they don't run, they produce an iterator**(like we see here on line 8). And that iterator, since it's a standard iterator, has a  `.next` method on it like we see on line 10.

- And when you call `.next` on a iterator that's attached to a generator, it is going to give you the value that was yielded out from that generator. 
- This new keyword `yield` **allows a generator to produce additional values every time it's iterated over.** So when I say yield 1, we get out and iterate a result that says value 1 done false, etc. 

- And then you'll notice because I use a `return` keyword on line 5 when we get the value 4 out, now it says done true, because we know for sure that iterator doesn't have any other results to produce.

### yield and Gotcha using return
- Gotcha with the usage of the `return` keyword inside a generator. Look down on line 15, it consumes the iterator according to that protocol, as soon as it sees a done true, it stops.

- It doesn't keep the value at that moment it assumes that it is iterated past it, so that is the effect of throwing away the value 4. Therefore, **if you're gonna make your own iterator using a generator like this you wanna make sure that you always yield values instead of returning values**.

- If you yield those values, they will come out according to the iterator protocol and then they'll be iterated over. It's generally considered a bad practice to return a value from a generator.

- If we know that making a generator and yielding values that seems like a really good way of defining our own iterators and any object that we want...

### iterators: declarative iterators
And if I could do a yield 1, 2, and 3, then I could also imagine, for example, having a `for` loop. And having a yield keyword inside of a for loop, and then yielding out values for each iteration of my loop. And that's how we'll actually define our iterator for our `obj` object.
```javascript
var obj = {
    a: 1,
    b: 2,
    c: 3,
    *[Symbol.iterator]() {
        for (let key of Object.keys(this)) {
            yield this[key];
        }
    }
};

[...obj]
// [1,2,3]
```
Line 5, you'll notice that I have this star here that indicates that this function is going to be that generator type. I'm putting it at that special location `symbol.iterator`, and it's just a concise method it doesn't take any inputs here. Its behavior by default is to iterate over all the keys.

- Notice,  I'm using a ``for-of`` loop inside of my iterator. Why does that work? Because `object.keys` returns me an array, and arrays are iterables. So here I'm gonna loop over all of the elements in the array, being keys, and then I'm simply going to yield out this `[key]`, which would be the value, so it would be the value 1 and then the value 2 and the value 3.

- :star: And the generator takes care of all of that plumbing about making iterators that have next methods that can be called, and preparing the iterator results, **and all of that and all I need to focus on in this code is what value to yield out**. That's what makes this a more declarative approach, is that I simply yield out my values.

### Iterating over keys, values, entries...
So there are multiple kinds of iterations that might be useful. Iterating over an object's values would be useful. Iterating over its keys would be useful. And by the way it turns out we have `object.keys` and we have `object.values` and they produce an iteration over the keys and the values.

 What if I wanted to get both the key and the value? Well then, I could define something called entries. An entry is a **tuple**, _and a tuple is just a two-element array, and that's a fancy way of saying a two-element array._

A tuple where the first element in the tuple is the key, and the second element is the value. So what would I do on line 7? I would return square bracket array and I'd return key comma, this of key. And then someone would be able to receive both the keys and the values as they iterated over my data structure.

### Object.keys, Object.values, Object.entries
So we have `object.values` to iterate over an object's values that you don't have to define your own anymore,you can just use that built-in utility.  
- We have `object.keys`, which actually, we've had since ES5, and that gives us an array of all the keys. 
- And now we have `object.entries`, which gives us an array of all those tuples.  

### Making Data Consumption Easy
So if that's the built-in way of doing that then all you have to do is on your data structures define those three iterators yourself. Iterate over your values, iterate over your keys, and iterate over your entries. **You don't have to but it's a good idea to make it as easy for someone to consume your data structure as possible**.

If I then wanted to do something like `...`, and not get the default, because if you do `...` over an array, the default is to essentially give you array values. But If I wanted to be able to do `...` and get an iteration over its indexes, then instead of saying `...` array, I could say `...` array dot keys.
 
Or I could say `...` array dot values or `...` array dot entries, or a `for-of` loop over the dot values, dot entries or dot keys. All of those would be standard ways. So when you make your own data structures, it's a good idea not only to define your default iterator, like we have here on line 5, you're making a default iterator.

But also go ahead expose any other way that would be useful for somebody to iterate over your data structure.

**Question:**  Can you mutate your iterable in a `for-of` loop, like if I wanted to remove something in the middle and I want to do it in a `for-of` loop how much is that gonna hurt?

- The standard answer to that is that the built in iterators that JavaScript has, the standardized iterator protocol, is that they essentially act as if they are iterating over a snapshot of the thing at the beginning.
- So it's a good idea to consider _not_ doing mutation in line with your iteration.
- JS will let you do it, but just because you can doesn't mean you should.
- Especially for the consumer of your system where they iterate something out, and they are like wait what happened to this value, or why did I get this value?
- Don't make mutations in line with it.

**Question 2:** So I think that question is saying, do I have to list the generator as an in line concise method in the object literal, or can that be defined somewhere else?
- And the answer you can point a property, like symbol.iterator, at an existing function reference that exists externally to the object. 

- It doesn't physically have to actually be added to the object literal, just has to be accessible to that object when somebody tries to iterate over it.

## Iterator & Generator Exercise
 
 
## Iterator & Generator Solution
[00:00:00]
>> Kyle Simpson: All right, welcome back. I trust you found that nice and challenging. Let's take a look at how to define an iterator, to make our numbers, object initerable. First we know we need to define a generator, and we're going to put it at this location .Symbol.iterator. And it's a function that we're going to want to receive some inputs.

[00:00:23]
But for now let's just skip the inputs. What does that function need to do? Well, it needs to loop over, essentially an i increment here and just yield out the values. So if I said something like let i = 0, i less than 100. i++, we could say less than or equal to 100.

[00:00:44]
i++ and then I could just simply yield i. And that generator is gonna spit out the values from 0 up to 100. So if we take that code and let me switch over to our console and we run it.
>> Kyle Simpson: You see it prints out from 0 up to 100.

[00:01:11]
Okay, so now let’s talk about we give it some inputs. Well we want to use our named parameter. Our named arguments in text with an object destructuring. So I’m gonna put an object here and make sure to give it the default object so that if it's not passed in, it picks up on the defaults.

[00:01:30]
We need essentially three inputs. We need a start which defaults to 0, we need an end which defaults to 100 and we need a step which defaults to 1. So let's use those three variables.
>> Kyle Simpson: Instead of i =, we'll say i += step.
>> Kyle Simpson: Now how are we going to use that number as iteration with our lucky numbers.

[00:02:04]
All right, I'm gonna go ahead and switch this to an interpre-literal, and I'll open up an expression. And what we wanna do is have an array that can be printed out. So I'm gonna use an array here and I'm going to be spreading something into the array which is the iterable.

[00:02:26]
So I'm going to be spreading numbers but I don't want to just spread numbers itself because that would be 0 through 100. I actually want to call the Symbol.iterator function. And that is what I will be spreading out. Remember iterators are also iterables. So we can spread out a custom made iterator instance, okay?

[00:02:51]
So how are we going to call this and pass in those inputs? Well, we're gonna pass in an object that sets start = 6, that sets end equal to 30, and set step equal to 4. So if we take that.
>> Speaker 2: A dollar sign?
>> Kyle Simpson: Dollar sign?
>> Speaker 2: Am I correct?

[00:03:22]
For the template literal, am I wrong?
>> Kyle Simpson: Sorry, you're right.
>> Speaker 2: Okay.
>> Kyle Simpson: That's why I wasn't syntax highlighting, good catch, all right.
>> Speaker 3: You need to take everything cuz you have to redefine that function?
>> Kyle Simpson: What's that.
>> Speaker 3: You better copy in the rest of it, cuz you redefine the function on top.

[00:03:38]

>> Kyle Simpson: I redefine the function on top?
>> Speaker 3: We didn't have it taking parameters, last time you copied it over.
>> Kyle Simpson: Yes, you're right, you're right.
>> Kyle Simpson: Okay, let's go over here and we don't need this for loop for right now. So remove that. And let's see what it prints out.

[00:03:58]
My lucky number 6,10,14,18,22,26 and 30. If you win $1 billion lottery of those lucky numbers, I expect a 1% cut, so.



