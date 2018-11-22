module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: ['public/client/*.js', 'public/lib/*.js'],
        dest: 'public/dist/scripts.js'
      },
      css: {
        src: ['public/*.css'],
        dest: 'public/dist/styles.css'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      my_target: {
        files: [{
          'public/dist/scripts.js': 'public/dist/scripts.js'
        }]
      }
    },

    eslint: {
      options: {
        configFile: '.eslintrc.js',
      },
      target: [
        'app/collections/*.js',
        'app/models/*.js',
        'app/config.js',
        'lib/requst-handler.js',
        'utility.js',
        'public/client/*.js',
        'server.js',
        'server-config.js'
      ]
    },

    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/dist/styles.css': ['public/dist/styles.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'app/collections/*.js',
          'app/models/*.js',
          'app/config.js',
          'lib/*.js',
          'public/client/*.js',
          'server.js',
          'server-config.js',
          'public/lib/*.js'
        ],
        tasks: [
          'concat',
          'uglify',
          'eslint'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run(['nodemon', 'watch']);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('eslintIt', [
    'eslint'
  ]);

  grunt.registerTask('nodemonIt', [
    'nodemon'
  ]);


  grunt.registerTask('concat-js', ['concat:js']);

  grunt.registerTask('concat-css', ['concat:css']);


  grunt.registerTask('uglifyIt', ['uglify']);

  grunt.registerTask('cssminIt', ['cssmin']);

  grunt.registerTask('build', ['concat-js', 'concat-css', 'uglifyIt', 'cssminIt', 'eslintIt', 'test']);

  grunt.registerTask('upload', function (n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run(['server-dev']);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);


};
