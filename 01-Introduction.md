# Introduction
## JavaScript New Feature Process
- JavaScript Fatigue? How do I keep up? JS is changing to fast! Well, ES3-ES5: the dark ages of JS. Essentially for 10 years nothing really happened, stagnation of JS the language.
    - due to a lot of infighting
    - finally came together in 2009 and agreed to all agree 
    - Making sure there is only one JS
    - 2009 - 2015, still working out the kinks of ES5, letting the dust settle
    - Once ES6 landed: lots of changes (300 new features, small to big things, felt like essentially 16 years of built up changes finally release).
    - People still reeling from release of ES6 felt bombarding
    - Decided moving forward, every year, JS spec should update yearly. ES2017, ES2018, ES2019...
    - 5 Stages of the TC39 process
    - Once it's in the spec it's in, can't step back from that so a lot of pressure to make sure the updates to the spec are tested/valuable.
- Alternatives of JS Fatigue (no updates vs updates all at once) are worse: JS gets left behind, or becomes overencumbered.

## Declarative JavaScript
- Larger more important narratives
### Declarative vs Imperative
- Declarative (declare the outcome, the what and we allow the ab stractions of the language to handle the how, so the reader is more focused on the what, the outcome and even more importantly on the why) vs Imperative.
- Declarative code typically communicates better: e.g the .. spread operator replacing something like a `.apply` like arguments that you use with array.slice.call to turn objects argument into an array.
- spread operator allows you to communicate things in a cleaner more concise way.
- less of the way we've been hacking things for years, and it's time for the language to support it, and as clear, and concise, and communicate as possible. 

## Browswer Support & Transpilers
- What about browswer support?
- We saw a trend of devs refusing to use features of ES5 (strict mode for instance)
- Devs feeling safer with older things for fear of browser compatability
- An attitude of devs not wanting to adopt the new stuff 
- Well, the answer to this attitude is: **transpilers**

### Transpilers
- Most popular is Babel
- takes your JS code and compiles to older form for older browsers.
- Always be a gap between what you need to support and where the leading edge of the langauge is.
- Features being developed so we can _communicate better_ in our code, we should take advantage. Not fancy feature hipsterdom just to look cool. Just be aware of the arc/narrative of the language to improve your code with improvements to the language.

- Complex Build Systems Fears
Sure people feel intimidated by all this tooling, but the downside is worse. You have to learn this stuff and apply it so that you move forward with the progress of the language to and let transpilers handle the rest.

## Course Overview
- Selection from ES2015-2019.
- KS recommendations of things you should focus on first.
- Todo list for staying up to date:

### Features
    - Template Strings
    - String padding/trimming
    - destructuring
    - array find() / includes()
    - array flat() / flatMap()
    - iterators, generators
    - regexp Improvements
    - async .. await
    - async* ..yield await

JS finally evolving its asynchronicity and managing parallelism.