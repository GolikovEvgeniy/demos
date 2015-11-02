module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      style: {
        files: {
          'source/css/style.css': ['source/less/style.less']
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 4 version', 'ie 8', 'ie 9']
      },
      style: {
        src: 'source/css/style.css'
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['source/js/libraries/*.js',
              'source/js/components/*.js',
              'source/js/main.js'],

        dest: 'source/js/script.js',
      },
    },

    watch: {

      all: {
        files: ['source/less/*.less',
                'source/less/foundation/*.less',
                'source/less/components/*.less',
                'source/js/libraries/*.js',
                'source/js/components/*.js',
                'source/js/main.js'],

        tasks: ['less', 'autoprefixer', 'concat'],
      }
    },

    clean: {
      build: ['build']
    },

    copy: {
      build: { 
        files: [{ 
          expand: true, 
          cwd: 'source', 
          src: [ 
            'img/**',
            'fonts/**',
            'js/script.js',
            'css/**', 
            '*.html' 
          ], 
          dest: 'build' 
        }] 
      }
    },

    imagemin: {
      images: { 
        options: { 
          optimizationLevel: 3 
        }, 
        files: [{ 
          expand: true, 
          src: ['build/img/*.{png,jpg,gif,svg}'] 
        }] 
      } 
    },

    csscomb: {
      style: {
        expand: true,
        src: ['build/css/style.css'] 
      }
    },

    cmq: {
      style: {
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },

    cssmin: {
      style: { 
        options: { 
          keepSpecialComments: 0, 
          report: 'gzip' 
        }, 
        files: { 
          'build/css/style.css': ['build/css/style.css'] 
        }
      }
    },

    htmlmin: { 
      options: { 
        removeComments: true, 
        collapseWhitespace: true, 
        collapseBooleanAttributes: true, 
        caseSensitive: true, 
        keepClosingSlash: false 
      }, 
      html: {
        expand: true,
        cwd: 'build',
        src: ['**/*.html'],
        dest: 'build/'
      }
    },

    uglify: {
      start: {
        files: {
          'build/js/script.js': ['build/js/script.js']
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'less',
    'autoprefixer',
    'concat',
    'watch'
  ]);

  grunt.registerTask('build', [
    'less',
    'autoprefixer',
    'concat',
    'clean',
    'copy',
    'csscomb',
    'cmq',
    'imagemin',
    'htmlmin',
    'cssmin',
    'uglify'
  ]);


};




















