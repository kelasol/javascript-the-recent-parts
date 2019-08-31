# Object Destructuring

## Object Destructuring
Going to be pretty similar to array destructuring but with some nuanced differences...
``` javascript
// IMPERATIVE APPROACH
function data() {
    return { a: 1, b: 2, c: 3 };
}

var tmp = data();
var first = tmp.a;
var second = tmp.b;
var third = tmp.c;
```

``` javascript
// DECLARATIVE APPROACH
function data() {
    return { a: 1, b: 2, c: 3 };
}

var {
    a: first,
    b: second,
    c: third
} = data();
```
No need for a `tmp` variable, we just need to make object destructuring pattern.
- Instead of arrays with indexed position that we use as source, (we know, I mean eventually, we realize, see last sections Summary / Thougts section): if it showed up in first position of array destructuring that the source was the 0 index.
- **In objects, since position doesn't matter, we have to tell it the source to be assigned**
    - We do so by giving it a property name
        - `source : target`
    - Position doesn't matter like in arrays, so we can have these in any position that is most readable for us

- Unmentioned properties/values in pattern get ignored

### What if we wanted to gather the unaccounted for properties in our object?
Imperatively we would have to map over the object and filter/compare about already referenced ones, and all this other stuff. With destructuring it's easy:
- Just like arrays we use the _spread operator_: `...`
- `...third` in object destructuring created for us a whole separate object of our gathered values
```javascript
// DECLARATIVE APPROACH
function data() {
    return { a: 1, b: 2, c: 3, d: 4 };
}

var {
    a: first,
    b: second,
    ...third
} = data();
```
### Setting Default Values
Imperatively we could have done the same ternary... `!== undefined ? tmp.a : 42;`  
In destructuring approach, we just set a default: `a: first = 42,`
    - It looks a bit stranger here since 3 elements, you just need to remeber it's: `source : target = default`  

### Let's talk about Order... Source : Target (= Default)
Why this order? It seems flipped! We're used to the inverse with objects.
```javascript
var o = {
    prop: value,
    target: source
}

var {
    source: target
} = o;
```
- The role is not important, if you instead think about identity...
    -... it is `property: value` 
    - If you can always remember that the object property is on the left, the thing we are getting it from or that we're assigning it to always goes on the right.
>Note: I don't think I was confused by this until KS mentioned it in this section. I think in my head it made sense since we are "de-structuring" that the pattern is descriptive of how we want to dismantle the structure or inverse the structure creation. ( I maybe wrong to think this way)

## Object Assignment Destructuring
### Existing Variable Locations 
So just as with arrays we can assign destructured items to existing variables, however if we try to use the same syntax as we did in arrays we run into a bit of an issue...
```javascript
// DECLARATIVE APPROACH
function data() {
    return { a: 1, b: 2, c: 3, d: 4 };
}

// Running this will throw a syntax error; 
// interprets Object Destructuring pattern as block scope
var first, second;
{
    a: first,
    b: second,
} = data();
```
- Because of JS's history of overloading usage of curly braces we are now presented with a problem simply doing so as in the examplve above.
- JS is expecting block scope syntax and will throw a syntax error since this isn't valid. 
    :star: The workaround is wrapping the whole statement (pattern and source) in parentheses...
```javascript
// DECLARATIVE APPROACH
//...
var first, second;
({
    a: first,
    b: second
} = data());
```
    - Remember, you don't need those parentheses if there is anything else in front of it, a declarator, or a reference to the whole object...
```javascript
// DECLARATIVE APPROACH
//...
var first, second;
tmp = {
    a: first,
    b: second
} = data();
```
## Object Default Assignment
### Property reference on null values 
Just like in arrays, if we tried to reference something that is a null value we will get a type error.
    - Better to use an empty object
```javascript
// DECLARATIVE APPROACH
function data() {
    return;
}
var  {
    a: first,
    b: second
} = data() || {};
```
- With arrays you had that _array elision_ but with objects you don't need that b/c you just don't reference the properties you don't care about.

### Naming Variables the Same as Their Source
- Redundant to say something like: `a: a` and `b: b`
:star: So if the source and the target are the same name you only have to list it once...
```javascript
// DECLARATIVE APPROACH
function data() {
    return;
}
var  {
    a,
    b
} = data() || {};
```
    - Note: must be valid left-hand name (e.g. no spaces in name)

## Nested Object Destructuring
## What about Nested(sub-objects)?
- Just like arrays. We nest the destructuring pattern
- Also just like arrays, we can just set the default value with =
```javascript
// DECLARATIVE APPROACH
function data() {
    return {
        a: 1,
        b: {
            c: 3,
            d: 4
        }
    };
}

var  {
    a,
    b: {
        c,
        d } = {}
} = data() || {};
```
- Be aware: very easy to forget nested defaults. KS recommends using a Linter and having a linting rule to remind you to put in defaults.

## Default Assignment Q & A
- Interesting question about (1h57m) being specific in your default value for the would be empty array/object.
- It's always best to put default values inline with pattern
- If you put defaults within the array/object default, those defaults will only apply in the instance there is no array/object

## Parameter Objects
Just as we talked about destructuring array paramaters, so too can we destructure object directly in the paramater position...  

Instead of doing something like destructuring directly in the body...
```javascript
function data(tmp = {}) {
    var {
        a,
        b
    } = tmp;
}
```
We can destructure in the parameter position...
```javascript
function data({
        a,
        b
} = {}) {
    //func body...
}
```
The object in this example isn't going to be captured by any variable, so use if you don't need the original object anymore, otherwise destructure in the body.
- Also note, this function can still take other parameters, listed right after the pattern, However...
If we do array/object destructuring in a parameter position, KS will just pass all the stuff in the object of the array, never as other separate objects.
 
## Nested Objects & Array Destructuring
- One of KS's fav thing about Obj destructuring.
- When you are array destructuring (bc it's position based automatically), you can only destructure a position once, **when destructuring an object we can actually list it multiple times**.
```javascript
var obj = {
    a: 1,
    b: 2,
    c: 3
};

// Ex.2 -Notice below how we reference the source, "b", more than once
var {
    a,
    b,
    b: W,
    c
} = obj;

// Ex 3 - b as a nested object
var {
    a,
    b,
    b: {
        x: W,
        y
    } = [],
    c
} = obj
```
- We can reference the source property as many times as we need to and target it to different locations
    - Particularly useful when b is a sub-object/nested: Now we can grab both the whole object and destructure it as well.
    - Also means we could destructure array patterns nested within objects and vice-versa.

## Summary / Thoughts
- In _array destructuring_ "source" is determined automatically by it's indexed (since the defining feature of an array is that fact that it is ordered by its sequential indicies).
- That means b/c there isn't a way for the source to be inferred automatically: **we have to specify the source when destructuring objects.**
- Sources from the object being returned that go unmentioned in our pattern will be ignored/not included.
- If we wanted, just like arrays, could gather the unmentioned sources into their own object with the _spread operator_ `***`.
- When destructuring objects it's important to remember that the pattern order is... `source : target = default`
    - `source`: the name/property of the object being returned/provided.
    - `target`: the location (or variable name) that the value of our source should be stored.
    - `default`: the fallback value to be assigned to our target if source is empty.
- Array destructuring allows you to have stand alone [] brackets to establish a destructing pattern for variables that have already been declared... You can't have standalone {} braces for object destructuring because JS interprets that as block-scope and specifying a pattern instead of a block is not valid syntax and an error will be thrown. To get around this we need to wrap the entire destructuring expression in parentheses.
```javascript
// DECLARATIVE APPROACH
var first, second;
({
    a: first,
    b: second
} = data());
```
- Dealing with possible null values/returns for our destructured arrays/objects is by using the or pipe `||` after the whole array/object source (e.g. `var { a, b } = data() || {}` )
- If source name and target name are the same, instead of doing `a : a` you can simply just say `a`.
- Just like array destructuring we can destructure objects in the parameter position
 If your targets are variables that have previously been declared and you're not destructuring the whole object, you'll need to use curly braces, wrapped around the entire destructuring expression (not just the pattern).
```javascript
// DECLARATIVE APPROACH
var first, second;
({
    a: first,
    b: second
} = data());
```
- Nested objects/arrays within objects work just as they do in array destructuring.
- Unlike array destructuring, object destructuring allows you to reference a source property multiple times, which also happens to be useful when we are destructuring objects/arrays within objects.