# Array Methods

## find, findIndex, & includes
- `array.find` was actually added in ES6, and `array.includes` was added in ES2016.
- If you have an array where it's difficult to look for those values by their identity
    - maybe they are objects
 
### ES6: find / findIndex
 We want to match objects where the a property is greater than 1...
 ```javascript
 var arr = [ { a: 1 }, { a: 2 } ];

//Example 1
 arr.find(function match(v){
     return v && v.a > 1;
 });
 // { a: 2 }

 //Example 2
 arr.find(function match(v) {
     return v && v.a > 10;
 });
 // undefined

 //Example 3
 arr.findIndex(function match(v){
     return v && v.a > 10;
 });
 // -1
 ```

### arr.find
So in Example 1 in the code above, if you return true or something truthy then it will return the **actual value that was found, not the return value**. It's like the array filter method, you're returning a true or a false, or a truthy or falsy to say,this is the thing I want you to return, we get back the ` { a: 2 }`, rather than like a true value or something like that.
    - It's a way to provide a callback that allows you to do that searching in a more custom way than say, 
    the `arr.indexOf` method which does an identity look for a value. 
    - Nuance: if you find a no value whatsoever (Example 2) that is indistinguishable from the case where you found the undefined value in the array. You can't tell whether they didn't find anything, or whether they found the undefined value. If you really needed to distinguish that particular case then you could use `arr.findIndex`...

### arr.findIndex
`arr.findIndex` is kind of like the `arr.indexOf` function, but with a callback where it doesn't return you the object, it returns you the numeric index of where it found it, where it made it's first match.
    - uses -1 to indicate if value not found.

### arr.includes
- kind of like the `arr.find` method, it's going to go tell us true-false that the thing exists.
    - it's not giving us the value itself, that's what we use `arr.find` for.
    - But if we want to test for whether it exists or not, rather than using find, index, or indexOf, the best thing to use is the includes method.
    - Not only does the includees method give us a true or false, it also uses the same value algorithm from the spec which means that even something like NaN, it will tell you, yes, I found the NaN (unlike `.indexOf` which doesn't use the algo from the spec). 
        - .includes not only more semantic, it behaves like we want it to.

## flat & flatMap
- `arr.find` and  `arr.includes` are good examples of helper methods that we would normally be bring in from something like lodash or a different helper library and we're brining them into the JS "standard" library.
    - same with `arr.flat(..)` and `arr.flatMap(..)`

### Array.flat()
```javascript
var nestedValues = [ 1, [2, 3], [[]], [4, [5] ], 6];

nestedValued.flat(0);
// [ 1, [2,3], [[]], [4, [5] ], 6]

nestedValues.flat(/*default: 1 */);
// [ 1, 2, 3, [], 4, [5], 6]

nestedValues.flat(2);
// [ 1, 2, 3, 4, 5, 6]
```
- If you have a nested array, this is the usecase where you might want to flatten that array.
- If you flatten it with a level of 0 that does nothing
- If you flatten it with the default of 1, one level of nesting is removed
- `.flat` also takes values taht you tell it how many levels you want to do.
- should use built-in options of the language if they have been added rather than use external libs. 
- `.flat` is good if you just want to flatten the array. What if you want to flatten and do some operation on that array(flatten+map is extremely common pattern in FP)? That's where .flatMap comes in...

### Array: flatMap()
```javascript
//Example 1
[1,2,3].map(function tuples(v){
    return [ v * 2, String(v * 2) ];
});
// [ [2,"2"], [4, "4], [6, "6"] ]

//Example 2
[1,2,3].map(function tuples(v) {
    return [ v * 2, String(v * 2) ];
}).flat();
// [2, "2", 4, "4", 6, "6"]

// Example 3
[1,2,3].flatMap(function all(v) {
    return [ v * 2, String(v * 2) ];
});
// [2, "2", 4, "4", 6, "6"]

```
If you ended up mapping an array of values to an array of subarrays. In the example above, we've got this function called `tuples` that is producing, from the array [1,2,3], a doubled first value and a stringification of that doubled number in the second.

We could just do it as in Example 2 in the code above, call .map and then .flat to flatten it. 
    - Still get to end result but the way we got there
    - The way we get there is less the desirable because we create an intermediary array that then had to be recreated with its flattened result.

.flatMap is basically flatten while you map instead of flattening after you map.
    - performance and implementation respects is better than Example 2 even if result is the same
    - However, notice, that with .flatMap you're only going to flatten one level. If you did need to flatten more than one you'd have to use an additional flat call.

### Adding/Deleting elements from an array with .flatMap
Another interesting implication of .flatMap is you can actually turn a mapping operation into something that either adds or removes elements from an array.
- We typically think of a map as only producing a new array with the same # of items as the OG array
```javascript
[1,2,3,4,5,6].flatMap(function doubleEvens(v) {
    if (v % 2 == 0) {
        return [v,v *2];
    }
    else {
        return [];
    }
});
// [2, 4, 4, 8, 6, 12]
```
- Rolling out quick...should be out late 2019. Can use polyfills or Babel to implement