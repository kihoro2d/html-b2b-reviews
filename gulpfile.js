import gulp from 'gulp';
import * as sass from 'sass'
import gulpSass from 'gulp-sass';
import gulpSassGlob from 'gulp-sass-glob';
import autoPrefixer from 'gulp-autoprefixer';
import gulpCleanCss from 'gulp-clean-css';
import gulpRename from 'gulp-rename';
import gulpTerser from 'gulp-terser';
import browserSync from 'browser-sync';

const bs = browserSync.create();

const sassIncludePaths = [
  process.cwd() + '/node_modules'
];

export function bootstrap () {
  return gulp.src('scss/bootstrap.scss')
    .pipe(gulpSassGlob())
    .pipe(gulpSass(sass)({
      outputStyle: 'compressed',
      includePaths: sassIncludePaths
    }))
    .pipe(autoPrefixer())
    .pipe(gulpRename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/css'));
}

export function styles () {
  return gulp.src('scss/main.scss')
    .pipe(gulpSassGlob())
    .pipe(gulpSass(sass)({
      outputStyle: 'expanded',
      includePaths: sassIncludePaths
    }))
    .pipe(autoPrefixer())
    .pipe(gulp.dest('assets/css'))
    .pipe(gulpCleanCss())
    .pipe(gulpRename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/css'));
}

export function scripts () {
  return gulp.src('assets/js/main.js')
    .pipe(gulpTerser())
    .pipe(gulpRename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/js'));
}

export function serve () {
  bs.init({
    open: false,
    watch: true,
    notify: true,
    server: true,
    // tunnel: 'b2b-reviews',
    host: '192.168.8.111'
  });

  gulp.watch('scss/**/*.scss', gulp.parallel(bootstrap, styles));
  gulp.watch('assets/js/main.js', gulp.parallel(scripts));
}

export const build = gulp.parallel(bootstrap, styles, scripts);

export default gulp.series(build, serve);
