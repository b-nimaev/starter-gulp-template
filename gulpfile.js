var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./europark/"
        }
    });
});

gulp.task('html', function() {
	return gulp.src('europark/*.html')
		.pipe(browserSync.stream())
});

gulp.task('sass', function() {
	return gulp.src('europark/scss/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('europark/css'))
		.pipe(browserSync.stream())
});		

gulp.task('clean', function(){
	return gulp.src([
		'europark/css/style.css'
	])
	.pipe(clean({compatibility: 'ie8'}))
	.pipe(gulp.dest('europark/'))
});

gulp.task('image', function(){
	gulp.src('europark/images/*.png')
		.pipe(imagemin([
				imagemin.optipng({optimizationLevel: 5})
			]))
		.pipe(gulp.dest('dist/images'))
});

gulp.task('scripts', function(){
	return  gulp.src([
			'europark/js/*.js'
		])
		.pipe(browserSync.stream())
});

gulp.task('watcher', function() {
	gulp.watch('europark/scss/**/*.scss', function(event, cb) {
    setTimeout(function(){gulp.start('sass')}, 1000)
  }),
	gulp.watch('europark/*.html', ['html'])
});

gulp.task('default', ['browser-sync', 'watcher'])
