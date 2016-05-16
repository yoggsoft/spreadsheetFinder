module.exports = function(grunt) {
  // Project configuration.
  // package name = spreadsheet-finder
  grunt.initConfig({
    path:{
        build:{
            js:'build'
        },
        src:{
            js:'src'
        }
    },
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */',
        manage:false
      },
      target: {
        files: {
            '<%= path.build.js %>/<%= pkg.name %>.min.js': ['<%= path.src.js %>/<%= pkg.name %>.js']
        }
      }
    },
    /*
    watch Task 
    */
    watch: {
      uglify:{
        files :'<%= path.src.js %>/*.js',
        tasks : ['uglify']
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};