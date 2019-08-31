var defaults = {
	topic: "JavaScript",
	format: "Live",
	slides: {
		start: 0,
		end: 100
	}
};

fakeAjax("http://get-the-workshop.tld",handleResponse);


// *******************************************************


function handleResponse({
	topic = "Javascript",
	format = "Live",
	slides : {
		start = 0,
		end = 100
	} = {}
} = defaults = {}) {
// The above shouldn't be pipe it should be like internal object defaults should be set to an empty array

	// Using the verbose: source : target syntax to clarify as you learn this
	TestCase({
		defaults : defaults,
		topic : topic,
		format: format, 
		slides : {
			start: start,
			end: end 
		}
	});
}

// When we are calling TestCase, the TestCase function resides in handleResponse and can 
// access the variables defined within handleResponse. TestCase when executed 
// "restructures" or generates variables in its function environment using an in-parameter-position
// destructuring of the variables it has access to directly outside of itself: defaults, topic, format, slides...
// (and which also happened to have been generated using param-obj-destructuring). The important thing 
// here is recognizing that when TestCase is invoked, it's source for properties are the variables that
// have been defined within the scope of handleResponse, and the targets, with the desired variable names we 
// are generating within the execution scope of TestCase. We are essentially redeclaring those variables within
// the context of the TestCase function call.
function TestCase(data) {
	console.log(
		data.topic == "JS Recent Parts" &&
		data.format == "Live" &&
		data.slides.start === 0 &&
		data.slides.end == 77
	);
}

// *******************************************************


function fakeAjax(url,cb) {
	// fake ajax response:
	cb({
		topic: "JS Recent Parts",
		slides: {
			end: 77
		}
	});
}
