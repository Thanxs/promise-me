const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
});

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', () => {
    return gulp.src("src/sass/**/*+(scss|sass)")
        .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('concat-js', () => {
    return gulp.src([
        'src/js/index.js',
    ])
        .pipe(concat('index.min.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe((gulp.dest('src/js/')))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', () => {
    gulp.watch('src/*.html', gulp.parallel('html'));
    gulp.watch("src/sass/**/*+(scss|sass)", gulp.parallel('styles'));
    gulp.watch(['src/js/*.js', '!src/js/index.min.js'], gulp.parallel('concat-js'));
});

gulp.task('default', gulp.parallel('concat-js', 'browser-sync', 'watch'));