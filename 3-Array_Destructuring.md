# Array Destructuring

## Destructuring
**Destructuring**
*de*composing a *structure* into its individual parts
- Super valuable tool to have under your belt, much more declarative way of writing code

- First and foremost, you need to understand that the purpose of destructuring as a feature is to assign individual parts from some larger structure, assign to individual variables, assign to individual properties from some larger structure  
- Take big thing and assign its division to smaller things 

Good use case of destructuring would be for parsing some huge JSON data structures where you just need a few pieces of data from a larger multi-nested object.
- Checkout below for comparison of Imperative vs. Declarative

Remember our narrative, JS is evolving towards a more declarative style, trying to take the more confusing hard to understand code that is imperative and express it in a declarative style.

Imperative                 |  Declarative
:-------------------------:|:-------------------------:
![Imperative](https://user-images.githubusercontent.com/5563119/63870306-97178f80-c96e-11e9-8306-163fea35d9ee.png)  |  ![Declarative](https://user-images.githubusercontent.com/5563119/63870411-c5956a80-c96e-11e9-9600-f2d67c839fbb.png)

Something you should pay attention to... On the left hand side of our equal sign ([destructing: declarative](https://user-images.githubusercontent.com/5563119/63870411-c5956a80-c96e-11e9-9600-f2d67c839fbb.png)), that is lines 1 through 10, we have what looks like essentially a JSON object, we have what looks like an array of objects with properties in those object but _that is not what this is_...
- This is not an array of objects, b/c it's on the left-hand side of the equals, it's not a value at all; **b/c it's on the left-hand side it's actually a pattern**. 
    - It is a syntax that is describing the value that is expected from the right-hand side (where we call the `getSomeRecords` API)
    - **A pattern to describe what kind of value we're expecting to get.**
    - Again, the purpose of that pattern it's not just to describe code documentation, it's real purpose is so that we can assign those individual values off as we need them.
        - Line 3: essentially saying, go make me a variable called `firstName` that has the value that is in this particular location of the data structure, which is the name property in the first object in an array.
        - It describes to JS declaratively how it should break down that structure and make individual assignments for you.
        - Notice on Line 4: The included equals is the so-called **default value expression** and that default value expression says: "if there is not an email property present, go ahead and use this backup default value to assign it to a variable called firstEmail.
        - Same thing on the second object
- So at a very high level glance, this is destructuring. Any place where you would be trying to break down and assign off pieces off from some larger data structure, destructuring can do that. 
    - Doesn't have to be a huge object. Sometimes it could just be a 2 element array from some API.
- The other takeaway here: **the pattern does not have to account for the entirety of the value, rather, just the part of the value that you care about at that moment.**
- The other takeaway here: **is that this code in it's declarative nature, is self documenting**, because in a way we are documenting with syntax what we expect the value of returned from the API call.

## Refactoring Code Using Destructuring
The following is going to be following along with the live-coding KS is doing...
 
```javascript
// IMPERATIVE APPROACH
function data() {
    return [1,2,3];
}

var tmp = data();
var first = tmp[0]; 
var second = tmp[1]; 
var third = tmp[2]; 
```
 
```javascript
// DECLARATIVE APPROACH
function data() {
    return [1,2,3];
}

// We just state the pattern we expect to get back on the left hand-side of the equals
var [
    first,
    second,
    third
] = data()
// In the first position of the array, I'm expecting whatever that value is to end up getting assigned to the first variable, and in the second position in the array, assign it to a variable called second.
```
- KS recommends that you use multiple lines when destructuring to keep it readable. 
- If we had an `undefined` value in the array and wanted a backup default value ...
    - Imperative: `var second = tmp[1] !== undefined ? tmp[1] : 10;`
    - Declarative: `second = 10,`
    - Note: A refresher on ternary operators; `condition ? value if true : value if false` 
- If there is a `null`value in second position of the array, that value would be null, strict operators used in both approaches, so because null !== undefined, the value that gets assigned would be null.

- What if we didn't know how long the array was and we wanted to gather all other values after the third into an array called fourth? 
    - Imperative: `var fourth = tmp.slice(3);`
        -  `// Would slice a new array from tmp starting at the fourth value in the array and hold it the variable named fourth`
    - Declarative: `...fourth`
        - So similar to our function signatures, we can use the **gather syntax** sometimes referred to as the **rest parameter syntax**. Which essentially says: "gather up everything into an array called fourth" 
## Spread Operator & Declaring Destructured Arrays
Continuing with our previous example...
```javascript
// IMPERATIVE APPROACH
function data() {
    return [1,2,3];
}

var tmp = data();
var first = tmp[0]; 
var second = tmp[1]; 
var third = tmp[2]; 
var fourth = tmp.slice(3);
```
```javascript
// DECLARATIVE APPROACH
function data() {
    return [1,2,3];
}

var tmp;
var [
    first,
    second,
    third,
    ...fourth
] = tmp = data()
```
- In the instance that our return data length is less than 4, in both styles, because of how slice works, we would get returned to us an empty array.
- A note on the _gather syntax_ is that it must occur at the very end of the pattern, because it's gathering everything up the rest of the values.

- Notice there is a difference in outcome between these two programs:
    - There is a `tmp` variable on one side and not the other.
    - an important difference because it speaks to the idea that when you destructure, you're just sort of ephemerally saying, I want this structure to exist for this brief period of time and then throw away the big structure, which is often what you want. But it might be the case that you want to have a reference to the whole structure as well...
        - Imperative: `var temp = dat()`
            - Just have a var temp equal to data and then break it down, which is exactly how we would do it with destructuring...
        - Declarative: `var [ ... ] = tmp = data();`
            - Note the `var tmp` must have previously been declared in proceeding lines.
            - Get tmp assigned the array, and then that array is going to get destructured by this pattern
            - So, useful if you need to get access to both the value and it's destructured parts, you just simpmly chain an equals together.
            - common to have reference over on the right next to where the value is (tmp close to data) and have the destructuring pattern to the left of it, but technically you can do it in the other order

## Declaration & Assignment
Continuing with our previous example...
```javascript
// IMPERATIVE APPROACH
function data() {
    return [1,2,3];
}

var tmp = data();
var first, second, third, fourth;

first = tmp[0]; 
second = tmp[1]; 
third = tmp[2]; 
fourth = tmp.slice(3);
```
```javascript
// DECLARATIVE APPROACH
function data() {
    return [1,2,3];
}

var tmp;
var first, second, third, fourth;
var [
    first,
    second,
    third,
    ...fourth
] = tmp = data()
```
So notice on our Imperative side, that we have done var declarations with the assignment. But if we've already declared those variables (`var first, second, third;`) then we could have done those assignments without any var declarations.
- What we are getting at here is that: **the assignments aren't inherently related to the declarations**, that's just the convenience you can do assignment along with declaration. The same is true of destructuring...
    - We could have just declared those variables first, separate of destructuring
    - **destructuring is actually about the assignment; not the declaration**
    - That means that if we can assign them to variables that already exist, we can also assign them to entirely other locations, any valid left-hand side target...

#### Object Assignment
```javascript
// IMPERATIVE APPROACH
function data() {
    return [1,2,3];
}

var tmp = data();
var o = {};

o.first = tmp[0]; 
o.second = tmp[1]; 
o.third = tmp[2]; 
o.fourth = tmp.slice(3);
```
```javascript
// DECLARATIVE APPROACH
function data() {
    return [1,2,3];
}

var tmp;
var o = {};
var [
    o.first,
    o.second,
    o.third,
    ...o.fourth
] = tmp = data()
```
#### Array Destructuring and Assignment
- You could even do the same with arrays...
```javascript
// IMPERATIVE APPROACH
function data() {
    return [1,2,3];
}

var tmp = data();
var o = [];

o[3] = tmp[0]; 
o[10] = tmp[1]; 
o[42] = tmp[2]; 
o[100] = tmp.slice(3);
```
```javascript
// DECLARATIVE APPROACH
function data() {
    return [1,2,3];
}

var tmp;
var o = [];

var [
    o[3],
    o[10],
    o[42],
    ...o[100]
] = tmp;
```
- **Array destructuring** is just the assignment part, not the declaration part.
- Anything we can validly assign to in the imperative form is also okay to show up in the declarative form
    - for instance, we couldn't do... (imparatively)  
    `var o = [];`...             
    `var o[3] = tmp[0];`
    
    - Just as we couldn't do...(declaratively)
    ``` javascript
    var o = [];   
    var [    
        o[3],
        //...
    ]
    ```
    - Both the above are not syntactically valid.

- Just as we said earlier that we can put the assignment on either side we could do...
```javascript
function data() {
    return [1,2,3]
}

var tmp;
var o = [];
tmp = [
    o[3],
    o[10],
    o[42],
    ...o[100]
] = data();
```
Now here is where people will often get confused because if this was a subset, and left out `o[3]` and `o[10]`...
```javascript
function data() {
    return [1,2,3]
}

var tmp;
var o = [];
tmp = [
    o[42],
    ...o[100]
] = data();
```
- Looking at the above you might be confused, and not think that tmp is not going to point at the entire array.
    - You might think that tmp is only going to point at the subset that we see in the pattern but...
    - You have to understand that the way assignment expressions work (even just `x = 3`) is that, **the result of the assignment expression is the entire value that was subject to assignment.**
    - So looking at the above, the result of this assignment expression is the entire array [1,2,3] regardless of how or how little of it was assignment off.
    - _May be helpful to think about it by looking at both results of the equal signs, in our example, the first equal specifies the pattern of destructure, but the second equals is the array returned by data()_
    - That's why more typically, if we need to also capture and destructure the whole object it's more common to see it like so...
```javascript
var tmp;
var o = [];
[
    o[42],
    ...o[100]
] = tmp = data();
```
- There is a caveat though with the above that we will see with object destructuring.

## Comma Separation
Going back to a previous example to demonstrate comma separation...
```javascript
// IMPERATIVE APPROACH
function data() {
    return [1,2,3];
}

var tmp = data();
var first, second, third, fourth;

first = tmp[0]; 
//second = tmp[1]; 
third = tmp[2]; 
fourth = tmp.slice(3);
```
```javascript
// DECLARATIVE APPROACH
function data() {
    return [1,2,3];
}

var tmp;
var first, second, third, fourth;
var [
    first,
    ,
    third,
    ...fourth
] = tmp = data()
```
So what if we didn't care about the number 2?
Imperatively, we would just not do that assignment, hence the uncomment.

Well in a destructuring syntax, we can essentially have empty positions, which have the effect of not doing any assignment at all.
- An empty position is just simply nothing in between the commas: here we put it on its own line so we aren't tempted to miss there are two commas, or something hideous like `,,,,,`
- If leaving an empty space in a destructuring pattern, give it its own line.
- This is called **array elision** by the way, and you can do this array elision at any place, beginning, middle or end. Might not make too much sense to do it at the end, but it may make sense to do it before a gather if you don't want those things included in the gather.
- You can't do ranges, but you can slice data before destructuring it.

#### Temporary Values
If we had something like x and y and wanted to swap these values we would normally do something like...
```javascript
var x = 10;
var y = 20;
{
    let tmp = x;
    x = y;
    y = tmp;
}
// Example uses ES6 block scoped declaratives.
// Checkout ES6: The Right Parts, Specificaally: Arrow Functions, Block Scope, and Default Values and the Gather/Spread Operator
 ```
Well there is a trick that we can use with destructuring to make the swapping in this case, not need a temp variable...
```javascript
var x = 10;
var y = 20;
[y,x] = [x,y];
 ```
This is saying, I want y to take on whatever value is in this position (of the second "array"), and I want x to take whatever is in position y (of the second "array")
- Not limited to 2, can be any number of swaps you need
- Pretty declarative way of swapping: the values of [x,y] to be transposed to the values of [y,x]

## Parameter Arrays
If we can do array destructurings on our assignment list, we can also do them in parameter positions...
``` javascript

function data(tmp) {
    var [
        first,
        second,
        third
    ] = tmp;
}
```
We could do destructuring like above or we could actually do it in the paramater position...
``` javascript
function data([
    first,
    second,
    third
]) {
    //...
}
```
- we are essentially saying, don't care about the array passing it, just those three named values
- noticed function signature is spread over multiple lines to make it as readable as possible

### Dealing with null or non-array returns
What if instead of an array we had null returned?
```javascript
// IMPERATIVE APPROACH
function data() {
    return null;
}

var tmp = data() || [];

var first = tmp[0]; 
var second = tmp[1]; 
var third = tmp[2]; 
var fourth = tmp.slice(3);
```
```javascript
// DECLARATIVE APPROACH
function data() {
    return null;
}

var tmp;
var [
    first,
    second,
    third,
    ...fourth
] = tmp = data() || [];
```
- Destructuring syntax is essentially sugar for doing this imperative thing that we done before
    - any error we would have before, we would still have declaratively with destructuring

- Graceful fallbacks? 
    - Default empty array... using the || operator
    - We handle both cases in the same way

### How would we handle a similar return for parameter arrays?
``` javascript
function data(tmp = []) {
    var [
        first,
        second,
        third
    ] = tmp;
}
```
Which would look like...
``` javascript
function data([
    first,
    second,
    third
] = []) {
    //...
}
```
:star: In fact it's a really good idea to put in default values, better to return undefined and fail gracefully than to fail hard with a type error.
- We could even take it further and write fallback values as well....`first = 10`, etc...

## Nested Array Destructuring
- What about subarrays?
```javascript
// IMPERATIVE APPROACH
function data() {
    return [1,[2,3],4];
}

var tmp = data() || [];

var first = tmp[0]; 
var tmp2 = tmp[1]; 
var second = tmp2[0];
var third = tmp[1]; 
var fourth = tmp[2];
```
- In a destructuring pattern, we need to use another destructuring pattern... nested....
```javascript
// DECLARATIVE APPROACH
function data() {
    return [1,[2,3],4];
}

var tmp;
var [
    first,
    [
    second,
    third,
    ] = [],
    ...fourth
] = tmp = data() || [];
```
And you handle the subarray fallbacks as you would with other fallback value handling within the pattern with ...  `...[ second, third ] = [],...`
    - Note in the declarative version (for subarrays) you would use the || operator.

## Summary / Thoughts
I think the thing that threw me for a second until I stepped away and thought about it was: how can you even predict the expected position of a desired value from the returned object? Like how do you know how far down you would need to write your patterns for? How is it that JS knows and auto-assigns the variables in an ordered fashion? Why can't I change that order? What if I wanted to the grab values starting in the middle of the returned data structure? Because we mentioned returned JSON objects from an API as a usecase for destructuring I had it in my mind to think of objects...so silly, Dumdum, this is array destructuring (we get into object destructuring later)! 

 
 