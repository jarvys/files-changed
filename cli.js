#!/usr/bin/env node

var changed = require("./index");

var args = process.argv.slice(2, 5);

if(args.length < 2) {
	console.log();
	console.log(" Usage: files-changed src dest [ext]");
	console.log();
	return;
}

args.push(function(err, files) {
	if(err) {
		throw new Error(err);
	}
	console.log(files);
});

changed.apply(null, args);

