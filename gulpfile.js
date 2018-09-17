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
         '@babel/env',
         {
            targets: {
               node: true
            }
         }
      ]
   ]
}

gulp.task('babel:lib', () => {
   gulp.src(path.lib)
      .pipe(plumber({
         errorHandler: (err) => {
            console.log(err)
         }
      }))
      .pipe(babel(babelrc))
      .pipe(gulp.dest('./lib'))
})

gulp.task('babel:index', () => {
    gulp.src(path.index)
      .pipe(plumber({
         errorHandler: (err) => {
            console.log(err)
         }
      }))
      .pipe(babel(babelrc))
      .pipe(gulp.dest('./'))
})

gulp.task('watch', () => {
   gulp.watch(path.lib, ['babel:lib'])
   gulp.watch(path.index, ['babel:index'])
});

gulp.task('default', ['watch'])
