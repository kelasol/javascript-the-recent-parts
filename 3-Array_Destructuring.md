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

var [
    first,
    second,
    third,
    ...fourth
] = data()
```
- In the instance that our return data length is less than 4, in both styles, because of how slice works, we would get returned to us an empty array.
- A note on the _gather syntax_ is that it must occur at the very end of the pattern, because it's gathering everything up the rest of the values.


## Declaration & Assignment
## Comma Separation
## Parameter Arrays
## Nested Array Destructuring