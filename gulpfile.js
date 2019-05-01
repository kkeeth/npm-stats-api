const gulp    = require("gulp"),
      babel   = require("gulp-babel"),
      plumber = require('gulp-plumber')

const path = {
   "index": "./src/index.js",
   "lib"  : "./src/lib/*.js"
}

const babelrc = {
   presets: [
      [
         '@babel/preset-env',
         {
            targets: {
               node: true
            }
         }
      ]
   ]
}

gulp.task('babel:lib', () => {
   return gulp.src(path.lib)
      .pipe(plumber({
         errorHandler: (err) => {
            console.log(err)
         }
      }))
      .pipe(babel(babelrc))
      .pipe(gulp.dest('./lib'))
})

gulp.task('babel:index', () => {
    return gulp.src(path.index)
      .pipe(plumber({
         errorHandler: (err) => {
            console.log(err)
         }
      }))
      .pipe(babel(babelrc))
      .pipe(gulp.dest('./'))
})

gulp.task('watch', () => {
   gulp.watch(path.lib, gulp.task('babel:lib'))
   gulp.watch(path.index, gulp.task('babel:index'))
});

gulp.task('default', gulp.parallel('watch'))
