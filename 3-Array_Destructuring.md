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

Something you should pay attention to... On the left hand side of our equal sign, that is lines one through 10 (declarative slide), we have what looks like essentially a JSON object, we have what looks like an array of objects with properties in those object but _that is not what this is_...
- This is not an array of objects, b/c it's on the left-hand side of the equals, it's not a value at all; **b/c it's on the left-hand side it's actually a pattern**. 




## Refactoring Code Using Destructuring
## Spread Operator & Declaring Destructured Arrays
## Declaration & Assignment
## Comma Separation
## Parameter Arrays
## Nested Array Destructuring