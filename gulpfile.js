var gulp 		= require('gulp');
var liveReload  = require('gulp-livereload');
var notify      = require('gulp-notify');
var webserver 	= require('gulp-webserver');
var less        = require('gulp-less');
var concat 		= require('gulp-concat');
var rename 		= require('gulp-rename');
var watch  		= require('gulp-watch');
var uglify 		= require('gulp-uglify');
var ngAnnotate  = require('gulp-ng-annotate');
var moment      = require('moment');

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
		fallback: 'index.html',
		livereload: true,
		open: true
    }));
});

 
gulp.task('scripts', function() {
  return gulp.src('./resource/js/src/*.js')
    .pipe(concat('global.js'))
    .pipe(gulp.dest('./resource/js/'));
});


gulp.task('uglify-js', function() {
    gulp.src(['./resource/js/src/*.js'])
        .pipe(concat('global'))
        .pipe(ngAnnotate())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(uglify())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({
            extname: ".min.js"
         }))
        .pipe(gulp.dest('./resource/js'))
        .pipe(notify('Uglified JavaScript (' + moment().format('MMM Do h:mm:ss A') + ')'))
        .pipe(liveReload({
            auto: false
        }));
});




//'Watch for changes and live reloads Chrome. Requires the Chrome extension \'LiveReload\'.',
gulp.task('watch', function() {
    liveReload.listen();
    watch('./resource/js/src/*.js', function() {
        gulp.start('uglify-js');
    });

    watch('client/styles/*.less'
    , function() {
        gulp.start('less');
    });

    watch('client/views/**/*.html')
		.pipe(liveReload({
        auto: false
    }));
});


gulp.task('default', ['watch', 'webserver']);