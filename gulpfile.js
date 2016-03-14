var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var notify = require('gulp-notify');

var plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: "Error: <%= error.message %>"
})};

gulp.task('js', function() {
    var uglify = require('gulp-uglify');

    gulp.src([
        'javascripts/services/services.js',
        'javascripts/services/*',
        'javascripts/components/components.js',
        'javascripts/components/*',
        'javascripts/directives/directives.js',
        'javascripts/directives/*',

        'javascripts/main.js'
    ])
        .pipe(plumber(plumberErrorHandler))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));

    gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js'
    ])
        .pipe(plumber(plumberErrorHandler))
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('default', ['js'], function() {

});
