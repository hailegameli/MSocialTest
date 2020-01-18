let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let browserSync = require('browser-sync').create();


function cssStyle(done) {
	
	gulp.src('./scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe( sass({
			errorLogToConsole: true,
			outputStyle: 'compressed'
		}))
		.on('error', console.error.bind(console))
		.pipe( autoprefixer({
			cascade: false
		}))
		.pipe(sourcemaps.write('./css/style.css.map'))
		.pipe( gulp.dest('css/'))
		.pipe(browserSync.stream());

	done();
}

function watchStyle() {

	gulp.watch('./scss/**/*', cssStyle);
	gulp.watch('./**/*.html', browserReload);
}

function Sync(done) {

	browserSync.init({
		server: {
			baseDir:'./'
		},
		port: 3000
	});

	done();
}

function browserReload(done) {

	browserSync.reload();

	done();
}

gulp.task('default', gulp.parallel(Sync, watchStyle));