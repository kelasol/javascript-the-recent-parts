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


## Data Structure without Iterators
## Generators
## Iterator & Generator Exercise
## Iterator & Generator Solution


