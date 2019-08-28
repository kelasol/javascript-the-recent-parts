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

### My Reponse to the Exercises
```javascript
function upper(strings,...values) {
	var str = "";
	for (let i = 0; i < strings.length; i++) {
		if (i < values.length) {
			str += `${strings[i]}${values[i].toUpperCase()}`
		} else {
			str += `${strings[i]}`
		}
	} 
	return str;
}  

var name = "kyle",
	twitter = "getify",
	topic = "JS Recent Parts";

console.log(
	upper`Hello ${name} (@${twitter}), welcome to ${topic}!`  ===
	"Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!"
);
```
### Tagged Template Solution
- The biggest hurdle was an observational one; (admist forgetting how for loops work for a second) It took me a while to recognize that string and ...values(interpolated variables) order matter based on output.
    - The desired string determines the order of the input: In our case we want the string to output starting with a value from the string array, `"Hello "` so we need to start with an 
    - Ultimately the string will always be some arrangement of `string value`and `data value` otherwise we would use just the string itself or the data value itself, how your final string is structured
    determines how you want to couple those data elements and strings.
    - After reviewing KS's solution I find his more elegant. (although I did want to do the string literal within the tagged function literal)
- When going over the exercise: KS: " Remember that strings, as an array, has one omre element than values" is the observation I was impliying.
- He also includes `String()` to force the type coercion in case the values aren't string.s
- I guess what I get caught up in is thinking about more broadly applicable solutions instead of trying to solve for the problem itself. I think it's good that I think this way, but at the same time it's somewhat hindering. I would recommend trying to find a solution to the problem at hand first, then go back and refactor. By separating these two acts, you can get more insight than just trying to front-load all our thinking and your problem solving can be much more efficient.
- Like in the example problem, it really depends on the outputed string, so  looking for a more universal guiding rule on pairing the  
    - The trying to find more globally applicable solutions to problems, can make your thinking about the problem at hand more inefficient and may work against you (in the short-term). 
        - Having a better understanding of design patterns, near-automatic algorithmic thinking, and more reading/writing of code in general will help make your globally applicable solution approach much easier/faster; however, even still, it may be better to separate problem solving in two acts (1. Solve problem then 2. Refactor for an optimized solution). The only two possible dangers to this divide and conquer approach is (a) if you settled on the first solution and don't refactor (I feel a lot of devs do the hacky thing and it stays hacky because it's like #415 out of #4017 Jira tickets for the day) and (b)

## Padding & Trimming
- Remember doing this as a "right of passage" when first learning JS, now you don't need to as JS finally added sting trimmming and padding built into the standard lib, that is on the String prototype.
- Left / Right padding isn't a great response, because it complicates other international langs using a Right to Left directionality in reading/writing.
- Using start and end and RTL / LTR specificity in language configuration is more clear, the solution that 

### String Padding (added in ES2017)

#### padStart
`.padStart()` - Takes two arguments, first one is required the second one is optional.
    - **You are telling it how many characters to pad to** and not how much padding you want to add.
    - so if you already have a charcter that is 5 characters long (or longer), and you say .padStart, it's not going to do anything.

**~~left~~ start padding**
```javascript
    var str = "Hello";
    str.padStart( 5 );           //"Hello"
    str.padStart ( 8 );          // "   Hello"
    str.padStart( 8, "*" );      // "***Hello" 
    str.padStart( 8, "12345" );  // "123Hello"
    str.padStart( 8, "ab" );     // "abaHello"
```
 - By default it uses the standard ASCII 32 character space (but you can override that for a different kind of character for your padding, you can even do multiple character things, like strings)
- `str.padStart(8, "ab");` --> `//"abaHello"`
- KS has never had any use can where he needed to speciffy anything other than a single character for padding.

#### padEnd
- Again, like padStart you give it the target length.

**~~right~~ end padding**
```javascript
    var str = "Hello";
    str.padEnd( 5 );           //"Hello"
    str.padEnd ( 8 );          // "Hello   "
    str.padEnd( 8, "*" );      // "Hello***" 
    str.padEnd( 8, "12345" );  // "Hello123"
    str.padEnd( 8, "ab" );     // "Helloaba"
```
- So a nuance of using both padStart and padEnd is that, your multi-character padding string you pass in as your second argument will always be inserted left-to right, no matter if you're using padStart or padEnd (e.g. `str.padEnd( 8, "12345" );  // "Hello123"` and not something like --> `//"Hello435` or `//"Hello543"`)
    - the pad source is always pulled from the left to the right no matter the RTL or LTR nature of your input language.
- You can also run both .padStart and .padEnd on the same string to get padding on both sides.

### Strining Trimming (added in ES2019)
- So like padding we don't have left and right trimming we have start and end trimming.
- `.trim` has been a part of the lang for a while now, but ES2019 adds `.trimStart` and `.trimEnd` 
- `.trimStart` and `.trimEnd` take no arguments because there is no configuration to do there: they only trim  whitespace, but not just ASCII 32 whitespace but all unicode representations of whitespace (space, tab, newline, etc.)
**~~left~~ start trimming, ~~right~~ end trimming**
```javascript
    var str = "   some stuff    \t\t";
    str.trim();            // "some stuff"
    str.trimStart();       // "some stuff            "
    str.trimEnd();         // "   some stuff"
```