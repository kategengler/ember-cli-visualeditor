
/*jshint node:true */
module.exports = function ( grunt ) {
  grunt.loadNpmTasks('grunt-subgrunt');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
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
    copy: {
      "ve-main": {
        expand: true,
        cwd: 'node_modules/visualeditor/dist/',
        src: '*',
        dest: 'dist/',
        filter: 'isFile'
      },
      "ve-i18n": {
        expand: true,
        cwd: 'node_modules/visualeditor/dist/',
        src: 'i18n/*',
        dest: 'dist/modules/ve/'
      },
      "oojs-i18n": {
        expand: true,
        cwd: 'node_modules/visualeditor/',
        src: 'lib/oojs-ui/i18n/*',
        dest: 'dist/'
      },
      "oojs-themes-apex": {
        expand: true,
        cwd: 'node_modules/visualeditor/',
        src: 'lib/oojs-ui/themes/apex/**',
        dest: 'dist/'
      }
    },
    uglify: {
      js: {
        files: {
          'dist/visualEditor.min.js': ['dist/visualEditor.js']
        }
      }
    }
  });

  grunt.registerTask( 'build', [ 'clean', 'subgrunt', 'copy', 'uglify' ] );
  grunt.registerTask( 'default', [ 'build' ] );

};