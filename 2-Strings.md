# Strings
## Template Strings
### Template Strings (Interpolated Literals)
- KS using template strings on a daily basis.
- "Interpoliterals" (the name KS likes to call these)
- KS doesn't believe this is a really good name for them, because template implies reusablity where as these are like a one-time thing like IIFEs.

### What problem are Template Strings trying to solve for?
- String concatenation
- data type combination, variables, and numbers, etc.
- **Interpolation**: Concatenating strings with other data types is a feature in mayn other languages. e.g. Double quotes strings vs Single quoted in PHP behave differently.
- The string concatenation that we're all used to is a great example of a very imperative approach of programming (its not ideal at all because we have to essentially, mentally execute this code, break into pieces and figure out where the concatenation operators are)
- A much better approach would be to declare what we want our final string to be and keep placeholders f or where we want values to be dropped in.
- The spec can't change double or single quotes. So a new symbol had to be used, that is the _backtick operator_ or `` ` `` to indicate its a template string.

``` javascript
var name = "kyle"
var msg = `Welcome ${name}`
```
- Dollar sign + curly braces filled with any expression or variable.

- Why template is confusing is because it's not really appropriate to think of it as a thing that will produce a string (like a template) it is the string itself.
    - it's just the fact that there's a bit of pre-processing that goes in as that string is happening.
    - Kind of like an IIFE (contructs and builds that string immediately, an actual primtive string is generated)

- A note on backticks: frustrating for those of us who use markdown. Understand why it was chosen visually.

- Use this a lot in `console.log `messages.
- Backticks: also break across lines, continue strings on to another line without a backslash. Just be aware tab or newline in that string will be in that string.

## Tagged Templates
- Also string literals or template literals have another feature on them which allows you to more fully control that pre-processing process when the string is generated...
```javascript
var amount - 12.3;

var msg = 
    formatCurrency
`The total for your order is ${amount}`;

// The total for your 
// order is $12.30
```
- **Tagged Literals**  
In our example above, we have this word `formatCurrency` it's on another line, but there is no operator between the two. This seems strange because you wouldn't be able to put an identifier immediately in front of a double or single quote (that would be a JS error, here it's allowed).
- What it's doing is it's declaratively tagging that string to say before it finishes I want it to be processed with this function.  
- It's actually a function call, it doesn't look like it, bit it's a special kind of function call, called a **tagged template string** / **tagged template literal**.

### Our Example:  
We don't just want that value in string format, we want to actually format it to look like US currency.
 - First parameter is strings array, then a `...values`, that's just gathering up all the individual values into an array. So `strings` is already an array, but the other values that come in, those are indivdual and then I'm gaterhing them up into an array.
 - JS is going to immediately invoke this function for you and it's going to pass to you, all of of the little bits of literal strings in one array, and then all the different values that you've chosen to interpolate in these individual positions that you can gather up into an array. Left with two arrays of things: 

- **tag functions** are essentially a way to pre-process your string, do some sort of formatting on it, either of the strings or the values or both depending on what you need. Useful for things like, escaping HTML, or Language substitution, localization, etc,. 
    - The great part is that you don't have to write your own as many existing tag functions exist in other libraries, npm, wherever.

## Applying Tagged Templates
KS kept console.logging things when debugging, but [object object] or [ error ] isn't particularly useful, so he wrote a logger tagged function that will parse stack traces or JSON to give him readable debugging output.
- Some people have taken them even further, because a string literal doesn't even have to return a string, it could in fact return something else entirely.
    - making regex tag functions, to make regexs more human multi-line readable.
    - JSX for instance, is HTML like stuff inside of JS, returns actual dom object like you'd expect in JSX
    - it's almost like a mini-language inside of JS (in fact people have created this mini-languages)
        - Tremendously powerful
        - great extension point for extending declarative power of JS

## Tagged Template Solution
Following along with this as an example might be more helpful than the currency example above without that `formatCurrency` function code...
```javascript
function upper(strings,...values) {
	console.log(`This is what's in strings: ${strings}`);
	console.log(`This is what's in values: ${values}`);
} 

var name = "kyle",
	twitter = "getify",
	topic = "JS Recent Parts";

console.log(
	upper`Hello ${name} (@${twitter}), welcome to ${topic}!` 
)
//--> This is what's in strings: Hello , (@,), welcome to ,!
//--> This is what's in values: kyle,getify,JS Recent Parts
//--> undefined
```
- If you notice the `strings` array has a length of 4; essentially `${}` acts as the value separator for the indicies of the `strings` array, notice how spaces are preserved...  
    - `[Hello , (@,), welcome to ,!]`
        -  `strings[0] === "Hello "`
        -  `strings[1] === " (@,)"`
        -  `strings[2] === " welcome to "`
        -  `strings[3] === "!"`

- `...values` is just the array of interpolated values.


## Padding & Trimming
