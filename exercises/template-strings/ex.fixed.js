function upper(strings,...values) {
	var s = "";
	for (let i=0; i<strings.length; i++) {
		if (i > 0) {
			s += String(values[i-1]).toUpperCase();
		}
		s += strings[i];
	}
	return s;
}

var name = "kyle",
	twitter = "getify",
	topic = "JS Recent Parts";

console.log(
	upper`Hello ${name} (@${twitter}), welcome to ${topic}!` ===
	"Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!"
);
