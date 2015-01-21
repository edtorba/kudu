var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var cssmin = require('gulp-minify-css');

var paths = {
    'sass' : ['scss/*.scss', 'scss/**/*.scss'],
    'clientJS' : ['public/js/*.js'],
    'serverJS' : ['components/*.js']
};

gulp.task('sass', function() {
    return gulp.src(paths.sass)
                .pipe(sass())
                .pipe(cssmin())
                .pipe(gulp.dest('public'));
});

gulp.task('serverJS', function() {
    return gulp.src(paths.serverJS)
                .pipe(uglify({'preserveComments' : 'some'}))
                .pipe(gulp.dest('build'));
});

gulp.task('clientJS', function() {
    return gulp.src(paths.clientJS)
                .pipe(uglify({'preserveComments' : 'some'}))
                .pipe(gulp.dest('public/js/min'));
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.serverJS, ['serverJS']);
    gulp.watch(paths.clientJS, ['clientJS']);
});

gulp.task('default', [ 'sass', 'serverJS', 'clientJS', 'watch' ]);