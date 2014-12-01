'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);


    // Project configuration.
    grunt.initConfig({
        // Project settings
        'slideshow': {
            // configurable paths
            pkg: require('./package.json') || {name : 'app'},
            src: require('./bower.json').appPath || 'src',
            dist: 'dist',
            serverConfig: {

            }
        },

        // Automatically inject Bower components into the app
        'bower-install': {
            app: {
                html: '<%= slideshow.src %>/index.html',
                ignorePath: '<%= slideshow.pkg.app %>/'
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        'watch': {
            options: { interval: 5007 },
            js: {
                files: ['<%= slideshow.src %>/scripts/{,*/}*.js', '<%= slideshow.src %>/scripts/**/*.js'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            //config: {
            //    files: ['config/configuration.js'],
            //    tasks: ['copy:configuration']
            //},
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= slideshow.src %>/{,*/**/}*.html',
                    '.tmp/styles/{,*/**/}*.css',
                    '<%= slideshow.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= slideshow.src %>/js/{,*/}*.js',
                '<%= slideshow.src %>/js/**/*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        'uglify': {
            options: {
                banner: '/*! <%= slideshow.pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%=  slideshow.pkg.name %>.js',
                dest: 'build/<%=  slideshow.pkg.name %>.min.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'bower-install']);

    // Dev task.
    grunt.registerTask('dev', ['bower-install','watch','jshint']);

};