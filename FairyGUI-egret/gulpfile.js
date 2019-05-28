var gulp = require("gulp");
var concat = require('gulp-concat');
var ujs = require('uglify-js');
var composer = require('gulp-uglify/composer');
var uglifyjs = composer(ujs, console);
var uglify = uglifyjs;

gulp.task("fairygui_mini",function(){
	gulp.src("bin/fairygui/fairygui.js")
		.pipe(uglify())
		.pipe(concat("fairygui.min.js"))
		.pipe(gulp.dest("bin/fairygui/"))
})
