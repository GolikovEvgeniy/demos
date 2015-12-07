"use strict";

var gulp = require( "gulp" ),
  watch = require( "gulp-watch" ),
  scss = require( "gulp-ruby-sass" ),
  autoprefixer = require( "gulp-autoprefixer" ),
  uglify = require( "gulp-uglify" ),
  concat = require( "gulp-concat" ),
  image = require( "gulp-imagemin" );

  // handling errors
  function handleError(err) {
    console.log(err.toString());
    this.emit('end');
  }

  // watching changes in javascript files
  function  scripts() {
    return gulp.src([
      "src/js/vendors/*.js",
      "src/js/components/*.js",
      "src/js/init.js"
    ])
    .pipe( concat( "script.js" ).on('error', handleError) )
    .pipe( uglify().on('error', handleError) )
    .pipe( gulp.dest( "src/js" ));
  }


  // watchin changes in scss files
  function styles() {
    return scss( "src/scss/style.scss" )
      .on( "error", scss.logError )
      .pipe( autoprefixer( "last 4 versions" ))
      .pipe( gulp.dest( "src/css" ));
  }


  // main development task
  gulp.task( "watch", function() {
    watch( "src/js/**/*.js", scripts );
    watch( "src/scss/**/*.scss", styles );
  });

  gulp.task( "default", ["watch"]);























