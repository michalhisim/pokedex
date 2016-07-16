var BowerWebpack = require('bower-webpack-plugin');
var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');
var webserver = require('gulp-webserver');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var named = require('vinyl-named');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');


gulp.task('sass', function () {
    gulp.src('scss/style-*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('www/css'));
});

gulp.task('cssmin', function () {
    return gulp.src(['www/css/*.css', '!www/css/*.min.css'])
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('www/css'));
});

gulp.task('css', function () {
    runSequence('sass', 'cssmin');
});

gulp.task('transpile', function () {
    var config = {
        name: 'js',
        module: {
            loaders: [
                {test: /\.es6$/, loader: 'babel', query: {presets: ['es2015']}}
            ]
        },
        plugins: [
            new BowerWebpack({modulesDirectories: ["bower_components"]})
        ]
    };

    return gulp.src(['scripts/app-*.es6'])
        .pipe(named())
        .pipe(webpack(config))
        .pipe(gulp.dest('www/js'));
});

gulp.task('jsmin', function () {
    return gulp.src(['www/js/app-*.js', '!www/js/*.min.js'])
        .pipe(uglify().on('error', function (error) {
            console.log('Message: ' + error.massage + ' Line: ' + error.lineNumber);
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('www/js'));
});

gulp.task('js', function () {
    runSequence('transpile', 'jsmin');
});

gulp.task('htmlmin', function () {
    return gulp.src('index.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('www'))
});

gulp.task('server', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            //open: true,
            directoryListing: true
        }));
});

gulp.task('copy', function () {
    // Font Awesome Fonts
    gulp.src('bower_components/font-awesome/fonts/**/*')
        .pipe(gulp.dest('www/fonts'));
});

gulp.task('watch', function () {
    gulp.watch(['scss/**/*.scss'], ['css']);
    gulp.watch(['scripts/**/*.es6'], ['js']);
    gulp.watch(['*.html'], ['htmlmin']);
});

gulp.task('default', function () {
    runSequence(['copy', 'htmlmin'], ['css', 'js'], ['watch', 'server']);
});