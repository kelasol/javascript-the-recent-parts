// var defaults = {
// 	topic: "JavaScript",
// 	format: "Live",
// 	slides: {
// 		start: 0,
// 		end: 100
// 	}
// };

fakeAjax("http://get-the-workshop.tld",handleResponse);


// *******************************************************


function handleResponse({
	topic = "JavaScript",
	format = "Live",
	slides: {
		start = 0,
		end = 100,
	} = {}
} = {}) {

	TestCase({
		topic, format,
		slides: {
			start, end
		}
	});

}

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
