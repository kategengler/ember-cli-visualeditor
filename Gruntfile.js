
/*jshint node:true */
module.exports = function ( grunt ) {
  grunt.loadNpmTasks('grunt-subgrunt');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    clean: {
      vendor: [ 'vendor/*' ]
    },
    subgrunt: {
      visualeditor: {
        projects: {
          'node_modules/visualeditor': [ 'build' ]
        }
      }
    },
    copy: {
      "ve-main": {
        files: [
          { expand: true, cwd: 'node_modules/visualeditor/dist/', src: 'visualEditor.*', dest: 'tmp/' }
        ]
      },
      "ve-i18n": {
        expand: true,
        cwd: 'node_modules/visualeditor/i18n/',
        src: '*',
        dest: 'vendor/i18n/ve/'
      },
      "oojs-i18n": {
        expand: true,
        cwd: 'node_modules/visualeditor/lib/oojs-ui/i18n/',
        src: '*',
        dest: 'vendor/i18n/oojs-ui/'
      },
      "oojs": {
        files: [
          { src: 'node_modules/visualeditor/lib/oojs/oojs.jquery.js', dest: 'tmp/oojs.js' }
        ]
      },
      "oojs-ui": {
        files: [
          { expand: true, cwd: 'node_modules/visualeditor/lib/oojs-ui/', src: 'themes/apex/**', dest: 'vendor/styles/' },
          { src: 'node_modules/visualeditor/lib/oojs-ui/oojs-ui-apex.svg.css', dest: 'tmp/oojs-ui.css' }
        ]
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
      },
      "oojs-ui": {
        dest: 'tmp/oojs-ui.js',
        src: [
          'node_modules/visualeditor/lib/oojs-ui/oojs-ui.js',
          'node_modules/visualeditor/lib/oojs-ui/oojs-ui-apex.js'
        ]
      },
      "one-js-file": {
        dest: 'vendor/visualEditor.js',
        src: [
          'tmp/jquery-i18n.js',
          'tmp/jquery-uls.js',
          'tmp/oojs.js',
          'tmp/oojs-ui.js',
          'tmp/visualEditor.js'
        ]
      },
      "one-css-file": {
        dest: 'vendor/styles/visualEditor.css',
        src: [
          'tmp/oojs-ui.css',
          'tmp/visualEditor.css',
        ]
      }
    },
    uglify: {
      "one-js-file": {
        files: {
          'vendor/visualEditor.min.js': ['vendor/visualEditor.js']
        }
      },
    }
  });

  grunt.registerTask( 'build', [ 'clean', 'subgrunt', 'copy', 'concat', 'uglify' ] );
  grunt.registerTask( 'default', [ 'build' ] );

};