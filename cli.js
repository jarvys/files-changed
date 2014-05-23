var changed = require("./index");
changed("./*.js", "test", function(files) {
	console.log(files);
});
