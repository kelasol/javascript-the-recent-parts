var numbers = {
	*[Symbol.iterator]({
		start = 0,
		end = 100,
		step = 1
	} = {}) {
		for (let i = 0; i <= 100; i += step) {
			yield i;
		}
	}
};

// should print 0..100 by 1s
for (let num of numbers) {
	console.log(num);
}

// should print 6..30 by 4s
console.log(`My lucky numbers are: ${
	[...numbers[Symbol.iterator({
		start: 6,
		end: 30,
		step: 4
	})]]
}`);
