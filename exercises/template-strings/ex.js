// Original Exercise Prompt
//function upper(strings,...values) {}

// var name = "kyle",
// 	twitter = "getify",
// 	topic = "JS Recent Parts";

// console.log(
// 	`Hello ____ (@____), welcome to ____!` ===
// 	"Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!"
// );

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