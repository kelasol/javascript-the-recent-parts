# Regular Expressions
## Look Ahead & Behind

- But as of ES 2018, a set of very helpful changes were added to JavaScript regular expressions.
- But there were three key ones that landed in ES2018 that we wanna talk about.

### Positive and Negative Lookaheads
The first one is going to be what we call a lookbehind. Before we understand a lookbehind, you need to make sure you understand what a lookahead is. 
If you haven't done much with regular expression, the idea of a **lookahead** is essentially an assertion that says, **when I match a thing, I wanna lookahead and say that my match only happens if something immediately after this also matches.**

```javascript
var msg = "Hello World";

msg.match(/(l.)/g);
// ["ll","ld"]

msg.match(/(l.)$/g);
// ["ld"]

msg.match(/(l.)(?=o)/g);
// ["ll"]

msg.match(/(l.)(?!o)/g);
// ["lo","ld"]
```

So I'm not matching both, I'm only matching this thing, but I only wanna match it if the thing right after it is also true. That's an assertion. So common examples of assertions that you probably already used would be, the beginning or end of string anchors, those are essentially assertions.

`^` - assertion to match charcter if shows up at beginning of string  
`$` - assertion to match charcter is shpws up at end of string.  

You're saying **I wanna match something but only if it shows up at the very beginning of the string. And that's the little carrot symbol**. That's your beginning of string anchor, and that's an assertion. Your dollar sign character if your end of string anchor, and that's essentially an assertion.

This match should only happen if it happens to be at the very end. **So this idea of assertions in regular expressions are saying, in addition to the thing that I'm matching, something else also has to be true**. 
- :star: And lookaheads allow us to not just say simple things like beginning or end of string, but also patterns.

So here, if I start out with a string, `Hello World`, and I wanna match a pattern that is `l.`, you notice that it's gonna give me two responses. It's gonna give me the ll, that's from positions two and three in the string. Or it's also gonna give me the l and d, which is from the end of the string.   

But the `ld` that's at the end of the string. So that's what happens when we don't do any assertion at all. But what if I then put a dollar sign assertion? Well, now I've restricted it to ld. And now we can see in line 9, a different kind of assertion, which is called a _lookahead_.

Lookaheads, by the way, are not new, these have been in JavaScript for 10 plus, almost 15 years probably.  
So we have this parenthesis-question mark syntax that you see on line 9. And the `?=` says, I want to ensure that this pattern, like `o`, does match.

So that's what's called a **positive lookahead**. On line 12, we see a different syntax, which uses the negate symbol, and that is a **negative lookahead**. So here we're saying on line 9, I only wanna match an `l.`, If it is followed by an `o`, which is why we only get the `ll`.

And then, when we say, `l.`, only when it's not followed by an `o`, you'll notice that we get an `lo`, and we get an `ld`, because those two are not followed by an `o`. So that's positive and negative lookaheads.

Well, if we can do lookaheads, it makes sense that we would want to sometimes also do lookbehinds.

### Lookbehinds
And it's been a major kind of missing feature for our regular expressions. Lookbehinds have been hacked into, like we've hacked ways to do lookbehinds.

- As of ES2018, we now officially have support for positive and negative lookbehinds.
```javascript
var msg = "Hello World"

msg.match(/(?<=e)(l.)/g);
// ["ll]

msg.match(/(?<!e)(l.)/g);
// ["lo", "ld"]
```
And it's a very similar syntax to what we had before, but now it has the _less than symbol in it_. So on line 3 we're saying, only matching an `l.`, if it is preceded by an e, which is why we get the `ll` match. And then line six we're saying only match and `l.`, if it's not preceded by `e`, which is why we get the `lo` and the `ld` match.

So we now have both positive and negative lookaheads and lookbehinds. 

## Named Capture Groups
[00:00:00]
Another feature that regular expressions have added is called _named capture groups_. So before you understand what a named capture group is, you need to make sure you understand what a _capture group_ is. So on line 3 here, you'll notice that I am using a parentheses set. On line 3, that parentheses set is saying, (`l.`).
 
```javascript
var msg = "Hello World"

msg.match(/.(l.)/);
// ["ell","ll"]

msg.match(/([jkl])o Word\1/);

msg.match(/(?<cap>l.)/).groups;
// {cap: "ll"}

msg.match(/?<cap>[jkl])o Wor\k<cap>/);
// ["lo Worl", "l"]

msg.replace(/(?<cap>l.)/g,"-$<cap>-");
// "He-ll-o Wor-ld-"

msg.replace(/(?<cap>l.)/g, function re(...args){
    var [,,,,{ cap }] = args;
    return cap.toUpperCase();
});
// "HeLLo WorLD"

```
#### Parentheses in regular expressions..
**And in regular expressions, parenthesis are not just grouping operators, although they have that effect, they are also capturing operators**. Which means that the output that we see here on line 4 has both the  larger scale match, which was `ell`. And then, the next thing in there was the captured group, which in this case, the first capture group, which in this case was `ll`.

#### Capture groups
So a **capture group** is _a way to have a sub part of the pattern pulled out in a separate way_. And we use those for back references, like line 6. So here I'm saying whatever comes before the `o`, and then, I have a back `\1` that says match that same thing later in the pattern.

#### The old approach
But whether you use them to pull them out in matches, or whether you use them for back references, we have always, up to this point, had to use numeric references to these groups. So it ends up where you have this big, long, regular expression, and you have to count your open parenthesis.

And say, that's like capture group seven, and that's capture group four and weird stuff like that. And it makes regular expression really, really hard to manage. So now we have the ability, like you seen on line 9, when you make a capture group, you can give it a good useful name.

So on line 9, for example, I am using the syntax question mark, and then, those angle brackets, and that gives a parentheses set an actual name. In this case, cap. So I'm saying, make a capturing group called `cap`. And how do we reference, or how do we use that?

#### Using Name Capture Groups
You'll notice that the object that we got back had a groups property on it, and inside of groups, we have a named property called cap. **So we can access any named capturing groups from our regular expression and whatever values were in those named groups**. We can also use this syntax over here to refer to the, in a back reference form, instead of saying `\3` capturing group, we can say `\k`, and then the name of the capturing group that we wanna reference.

And it will drop in that into the pattern. We can use those in our replace, like we're doing here on line 15. On line 15, we can say `$ <>`, and then, use the name of our capturing group in a replace pattern. And we can also receive that, as you see on line 18 and 19, we can receive it in the function callback that we pass to replace.

So in other words, when you wanna do capturing groups, instead of having to juggle all theses numbers, and every time you add a new parenthesis, **now all your numbers are off, give your captured groups good semantic names**. Say you have a regular expression that's gonna match a date and we have the US date format, and you wanna name the capture group for month and call it month.

And then name the capture group for day and call it day. And then one for year. Instead of having one, two, and three, which aren't semantic and they're harder to maintain.

- So that's the second of our features that we have added to regular expressions in ES2018.

## dotall (/s) mode
Third feature that is gonna be a big deal in certain use cases, that was added in ES 2018, is what is called the `.all` mode. Specifically, _it's a new flag that you can add onto the end of your regular expression_. So in addition to having `g` for global, and `m` for multiline, and `i` for case insensitive, and those sorts of flags, there's a new flag called `s`.

```javascript
var msg = `
The quick brown fox
jumps over the
lazy dog`;

msg.match(/brown.*over/);
//null

msg.match(/brown.*over/s);
// ["brown fox \njumps over"]

```
**And `s` turns on what is called the dot all mode.**

#### Why is this important?
The reason why this is important is because historically, for all of regular expressions and JavaScript up to this point, the dot operator, the period, like we see on line 6, _it is able to match any character, except it doesn't match across new lines_.   

So you're only able to match on that exact line, which is why the code on line 6 doesn't find any match. Because it can't find brown and over, since the dot in that dot-star can't span across a newline. 

**If we then turn on the dot all mode, the dot is able to match all characters, including new lines.**
So now, we're able to make regular expression matches across lines.

#### JS regExs reaching Parity with Other Langs
Another couple of features, or another regular expression feature that landed, not something that a lot of you will use, but a new flag that was added, which is slash `/u`, and it turns on Unicode-aware mode for your regular expressions.
    - Because JavaScript regular expressions typically only work with the ASCII character set, and they don't really treat the extended Unicode code space as individual characters. But now you can turn on Unicode awareness for your regular expressions, if you need it. It also gives you some additional syntax for Unicode escape sequences in your regular expressions.
 
- But a bunch of really cool stuff that has landed, and is landing in regular expressions, is finally gonna bring this feature up to more parity with regular expression support in other languages. And that should hopefully bring some needed relief to all the frustration that we have. We naturally don't love writing regular expressions, at least most of us.
 
- But it should bring some very necessary relief to those problems. Any questions about these additions, or improvements to regular expressions?

## Regex Exercise
## Regex Solution
```javascript
// The Power of a Smile
// by Tupac Shakur
var poem = `
The power of a gun can kill
and the power of fire can burn
the power of wind can chill
and the power of a mind can learn
the power of anger can rage
inside until it tears u apart
but the power of a smile
especially yours can heal a frozen heart`;

for (let power of powers(poem)) {
	console.log(power);
}
// a gun: kill
// fire: burn
// wind: chill
// a mind: learn
// anger: rage
// smile: heal

function *powers(poem) {
	var re = /(?<=power of )(?<thing>(a )?\w+).*?(?<=can )(?<verb>\w+)/gs;
	var match;
	while (match = re.exec(poem)) {
		let { groups: { thing, verb } } = match;
		yield `${thing}: ${verb}`;
	}
}
```



