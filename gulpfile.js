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
var fileinclude = require('gulp-file-include');

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            fallback: 'index.html',
            livereload: true,
			host: '192.168.100.10',
            open: true
        }));
});


/*gulp.task('scripts', function() {
  return gulp.src('./resource/js/src/*.js')
    .pipe(concat('global.js'))
    .pipe(gulp.dest('./resource/js/'));
});*/



gulp.task('concat-global', function() {
    gulp.src(['./src/js/*.js'])
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


gulp.task('htmlinclude', function() {
    gulp.src(['./src/html/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./'))
        .pipe(liveReload({
            auto: false
        }))
        .pipe(notify('Html incluido! (' + moment().format('MMM Do h:mm:ss A') + ')'));
});


/*gulp.task('concat-html', function() {
    gulp.src(['./src/html/*.html'])
        .pipe(concat('index'))
        .pipe(ngAnnotate())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(gulp.dest('./resource/js'))
        .pipe(notify('Uglified JavaScript (' + moment().format('MMM Do h:mm:ss A') + ')'))
        .pipe(liveReload({
            auto: false
        }));
});*/



//'Watch for changes and live reloads Chrome. Requires the Chrome extension \'LiveReload\'.',
gulp.task('watch', function() {
    liveReload.listen();

    watch('./src/js/*.js', function() {
        gulp.start('concat-global');
    }).pipe(liveReload({
        auto: false
    }));

    /*
    watch('client/styles/*.less'
    , function() {
        gulp.start('less');
    });*/

    watch(['./src/html/**/*.html'], function() {
        gulp.start('htmlinclude');
    }).pipe(liveReload({
        auto: false
    }));


    watch('./index.html')
        .pipe(liveReload({
            auto: false
        }));

    watch('./resource/**/*')
        .pipe(liveReload({
            auto: false
        }));

});


gulp.task('default', ['watch', 'webserver']);