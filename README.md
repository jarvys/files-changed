files-changed
=============
> help finding changed files like [gulp-changed](https://github.com/sindresorhus/gulp-changed)

##Install

```Bash
$ npm install files-changed
```

##Usage

```Javascript
var filesChanged = require("files-chagned");

filesChanged("less/*.less", "css", ".css", function(err, files) {
	if (err) {
		throw new Error(err);
	}

	console.log(files);
});
```

use cli
```Bash
$ files-changed 'less/*.less' css .css
```
