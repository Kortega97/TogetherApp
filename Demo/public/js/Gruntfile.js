 module.exports = function(grunt){
	"use strict";
	grunt.initConfig({
		  concat: {
		    dist: {
		      src: [
		      	  'css/themify-icons.css', 
				  'css/fontawesome.css',
				  'css/fontawesome-all.css',
				  'css/fontawesome-brands.css',
				  'css/fontawesome-solid.css',
				  'css/font-awesome4.7.css',
				  'css/jquery-ui.min.css', 
				  'css/bootstrap.min.css', 
				  'css/animate.min.css', 
				  'css/materialize.css',
				  'css/responsive-mhead.css',
				  'css/owl.carousel.css', 
				  'css/chosen.css',
				  'css/slick.css',
				  'css/ripple.css',
				  'css/nprogress.css',
				  'css/perfect-scrollbar.min.css',
				  'css/strip.css',
				  'css/emoji.css',
				  'css/weather-icon.css'
			      ],
		      dest: 'css/main.min.css',
		    },
			  
		    extras: {
		      src: [
				  'js/jquery.js', 
				  'js/jquery-ui.min.js',
				  'js/popperjs-bootstrap.js',	 
				  'js/bootstrap.min.js', 
				  'js/nprogress.js',
				  'js/owl.carousel.min.js',
				  'js/sticky-kit.min.js', 
				  'js/chosen.jquery.js', 
				  'js/touchspin.js', 
				  'js/slick.min.js',
				  'js/responsive-mhead.js',
				  'js/ripple.js',
				  'js/perfect-scrollbar.jquery.min.js',
				  'js/strip.pkgd.min.js',
				  'js/loadMoreResults.js',
				  'js/isotope.min.js',
				  'js/isotope-init.js',
				  'js/scrolltopcontrol.js'
			  ],
		      dest: 'js/main.min.js',
		    },
		  },

		  cssmin: {
		    target: {
			    files: {
			      'css/main.min.css': 
					[
						'css/themify-icons.css', 
					    'css/fontawesome.css',
					    'css/fontawesome-all.css',
					    'css/fontawesome-brands.css',
					    'css/fontawesome-solid.css',
					    'css/font-awesome4.7.css', 
						'css/jquery-ui.min.css', 
						'css/bootstrap.min.css', 
						'css/animate.min.css',
						'css/materialize.css',
						'css/responsive-mhead.css', 
						'css/owl.carousel.css', 
						'css/chosen.css',
						'css/slick.css',
						'css/ripple.css',
						'css/nprogress.css',
						'css/perfect-scrollbar.min.css',
						'css/strip.css',
				  		'css/emoji.css',
				  		'css/weather-icon.css'
					],
			    }
			  }
		  },

		uglify: {
		    my_target: {
		      files: {
		        'js/main.min.js': 
				 [
				  'js/jquery.js', 
				  'js/jquery-ui.min.js',
				  'js/popperjs-bootstrap.js',	 
				  'js/bootstrap.min.js', 
				  'js/owl.carousel.min.js',
				  'js/nprogress.js',
				  'js/sticky-kit.min.js',  
				  'js/touchspin.js', 
				  'js/slick.min.js',
				  'js/chosen.jquery.js',
				  'js/responsive-mhead.js',
				  'js/ripple.js',
				  'js/perfect-scrollbar.jquery.min.js',
				  'js/strip.pkgd.min.js',
				  'js/loadMoreResults.js',
				  'js/isotope.min.js',
				  'js/isotope-init.js',
				  'js/scrolltopcontrol.js'	 
				 ]
		      },
		    },
		  },
		
		watch: {
		  configFiles: {
		    files: 
			  [
				  'css/animate.min.css', 
				  'css/bootstrap.min.css', 
				  'css/font-awesome.min.css', 
				  'css/nice-select.css', 
		          'css/owl.carousel.css'
			  ],
		    options: {
		      reload: true
		    },
		  },
		},
	  
	});

	//load the plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
};