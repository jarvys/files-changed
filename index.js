var fs = require("fs");
var glob = require("glob");
var path = require("path");
var async = require("async");
var gutil = require("gulp-util");
var _ = require("underscore");

module.exports = function(src, dest, ext, cb) {
	if (!cb) {
		cb = ext;
		ext = undefined;
	}

	var filesChanged = [];
	glob(src, function(err, files) {
		async.each(files, function(file, cb) {
			fs.stat(path.join(process.cwd(), file), function(err, stats) {
				if (err) {
					return cb(err);
				}

				var src_mtime = stats.mtime;
				var newPath = path.join(process.cwd(), dest, path.basename(file));
				if(ext) {
					newPath = gutil.replaceExtension(newPath, ext);
				}

				fs.stat(newPath, function(err, stats) {
					if (err) {
						if (err.code === 'ENOENT') {
							filesChanged.push(file);
							return cb();
						}

						return cb(err);
					}

					if(stats.mtime < src_mtime) {
						filesChanged.push(file);
					}
					cb();
				});
			});
		}, function(err) {
			if(err) {
				cb(err);
			} else {
				cb(null, filesChanged);
			}
		});
	});	
};

