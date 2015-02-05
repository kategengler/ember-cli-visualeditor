
/*jshint node:true */
module.exports = function ( grunt ) {
  grunt.loadNpmTasks('grunt-subgrunt');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    clean: {
      dist: [ 'dist/*' ]
    },
    subgrunt: {
      visualeditor: {
        projects: {
          'node_modules/visualeditor': [ 'clean', 'cssUrlEmbed', 'concat', 'cssjanus', 'copy' ]
        }
      }
    },
    concat: {
      "jquery-i18n": {
        dest: 'tmp/jquery-i18n.js',
        src: [
          'node_modules/visualeditor/lib/jquery.i18n/src/jquery.i18n.js',
          'node_modules/visualeditor/lib/jquery.i18n/src/jquery.i18n.messagestore.js',
          'node_modules/visualeditor/lib/jquery.i18n/src/jquery.i18n.parser.js',
          'node_modules/visualeditor/lib/jquery.i18n/src/jquery.i18n.emitter.js',
          'node_modules/visualeditor/lib/jquery.i18n/src/jquery.i18n.language.js',
          'node_modules/visualeditor/lib/jquery.i18n/src/jquery.i18n.fallbacks.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/bs.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/dsb.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/fi.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/fi.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/ga.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/he.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/hsb.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/hu.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/hy.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/la.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/ml.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/os.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/ru.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/sl.js',
          // 'node_modules/visualeditor/lib/jquery.i18n/src/languages/uk.js',
        ]
      },
      "jquery-uls": {
        dest: 'tmp/jquery-uls.js',
        src: [
          'node_modules/visualeditor/lib/jquery.uls/src/jquery.uls.data.js',
          'node_modules/visualeditor/lib/jquery.uls/src/jquery.uls.data.utils.js',
        ]
      }
    },
    copy: {
      "ve-main": {
        files: [
          { expand: true, cwd: 'node_modules/visualeditor/dist/', src: 'visualEditor.*', dest: 'dist/' }
        ]
      },
      "ve-i18n": {
        expand: true,
        cwd: 'node_modules/visualeditor/i18n/',
        src: '*',
        dest: 'dist/i18n/ve/'
      },
      "oojs-i18n": {
        expand: true,
        cwd: 'node_modules/visualeditor/lib/oojs-ui/i18n/',
        src: '*',
        dest: 'dist/i18n/oojs-ui/'
      },
      "oojs-ui": {
        files: [
          { expand: true, cwd: 'node_modules/visualeditor/lib/oojs-ui/', src: 'oojs-ui-apex.svg.css', dest: 'dist/' },
          { expand: true, cwd: 'node_modules/visualeditor/lib/oojs-ui/', src: 'themes/apex/**', dest: 'dist/' },
        ]
      }
    },
    uglify: {
      "jquery-i18n": {
        files: {
          'dist/jquery-i18n.min.js': ['tmp/jquery-i18n.js']
        }
      },
      "jquery-uls": {
        files: {
          'dist/jquery-uls.min.js': ['tmp/jquery-uls.js']
        }
      },
      "oojs": {
        files: {
          'dist/oojs.min.js': ['node_modules/visualeditor/lib/oojs/oojs.jquery.js']
        }
      },
      "oojs-ui": {
        files: {
          'dist/oojs-ui.min.js': [
            'node_modules/visualeditor/lib/oojs-ui/oojs-ui.js',
            'node_modules/visualeditor/lib/oojs-ui/oojs-ui-apex.js'
          ]
        }
      },
      "ve": {
        files: {
          'dist/visualEditor.min.js': ['dist/visualEditor.js']
        }
      }
    }
  });

  grunt.registerTask( 'build', [ 'clean', 'subgrunt', 'concat', 'copy', 'uglify' ] );
  grunt.registerTask( 'default', [ 'build' ] );

};