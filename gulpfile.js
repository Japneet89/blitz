/*eslint-env node */

// establishes gulp dependencies
var gulp = require('gulp');
//var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var gutil = require('gulp-util');
var WebpackCluster = require('webpack-cluster');

//publishes content, calls tasks that copy content over
gulp.task('build', [
	'bundle-html',
	'bundle-png',
	'bundle-gif',
	'bundle-sw',
	'bundle-jsSW',
	'bundle-minify',
	'bundle-styles',
	'bundle-manifest',
	'bundle-fonts'
]
);

// handles sass compression

/*gulp.task('sass', [
	'sass-styles'
]
);*/
// copies over js SW files
gulp.task('bundle-jsSW', function() {
	gulp.src('sw-register.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist'));
});
// copies ALL html over from root to the public folder. This can be used for json / template files
// USE THIS to setup these two tasks in the future when json files are in the right place
gulp.task('bundle-html', function() {
	gulp.src('index.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./dist'));
});

// copies SW over from root to the public folder. 
gulp.task('bundle-sw', function() {
	gulp.src('service-worker.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist'));
});
gulp.task('bundle-manifest', function() {
	gulp.src('manifest.json')
		.pipe(gulp.dest('./dist/'));
});
// copies images over to the public folder
gulp.task('bundle-png', function() {
	gulp.src('src/img/*.png')
		.pipe(gulp.dest('./dist/src/img'));
});
gulp.task('bundle-gif', function() {
	gulp.src('src/img/*.gif')
		.pipe(gulp.dest('./dist/src/img'));
});
gulp.task('bundle-fonts', function() {
	gulp.src('src/style/font/**')
		.pipe(gulp.dest('./dist/src/style/font'));
});
gulp.task('bundle-minify', function() {
	gulp.src('bundle.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/'));
});

/*
gulp.task('watch', function() {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event 
    gulp.watch('src/style/sass/**', ['sass-styles']);
});
gulp.task('sass-styles', function() {
	gulp.src('src/style/sass/main.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./src/style'))
});

gulp.task('watch', function() {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event 
    gulp.watch('src/style/sass/**', ['sass-styles']);
});*/
// copies css over to the public folder, after converting from scss
gulp.task('bundle-styles', function() {
	gulp.src('src/style/*.css')
		.pipe(cleanCSS())
    	.pipe(gulp.dest('./dist/src/style'));
});
gulp.task('serveprod', function() {
  connect.server({
    root: dist/index.html,
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});
var webpackCluster = new WebpackCluster({
    dryRun: false,
    concurrency: 10,
    failures: {
        sysErrors: true,
        errors: true,
        warnings: true
    }
});
 
gulp.task('create-bundle', [], callback => {
    webpackCluster.run([
        './webpack.config.js'
    ]);
});
 