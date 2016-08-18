
module.exports= function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
    		build: {
            src: 'src/js/*.js',
      			// src: ['node_modules/jquery/dist/jquery.js', 'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js', 'src/js/*.js'],
      			dest: 'build/js/scripts.min.js',
    		},
    		dev: {
    			options: {
    				beautify: true,
    				mangle: false,
    				compress: false,
    				preserveComments: 'all',
    			},
      			src: 'src/js/*.js',
      			// src: ['node_modules/jquery/dist/jquery.js', 'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js', 'src/js/*.js'],
      			dest: 'build/js/scripts.js',
    		},
  		},
  		sass: {
			build: {
				options: {
					outputStyle: 'compressed',
				},
				files: {
					'build/css/styles.min.css' : 'src/sass/styles.sass',
				},
			},
			dev: {
				options: {
					outputStyle: 'expanded',
				},
				files: {
					'build/css/styles.css' : 'src/sass/styles.sass',
				},
			},
  		},
		watch: {
			options: {
      			livereload: true,
    		},
  			js: {
    			files: ['src/js/*.js'],
    			tasks: ['uglify:dev'],
      		},
      		css: {
    			files: ['src/sass/*.sass', 'src/sass/modules/*.sass'],
    			tasks: ['sass:dev'],
      		},
      		html: {
      			files: ['index.html'],
      		},
		},
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('build', ['uglify:build', 'sass:build']);
	grunt.registerTask('default', ['uglify:dev', 'sass:dev', 'watch']);

}