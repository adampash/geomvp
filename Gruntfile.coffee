module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # sass:
    #   src: 'src/sass/*'
    #   build: 'public/css/styles.css'

    project:
      app: 'app'
      assets: '<%= project.app %>/assets'
      src: 'src'
      css: [
        '<%= project.src %>/sass/*'
      ]
      js: [
        '<%= project.src %>'
      ]
      models: [
        '<%= project.js %>/models/*'
      ]
      controllers: [
        '<%= project.js %>/controllers/*'
      ]

    coffee:
      dev:
        options:
          sourceMap: true
        expand: true
        cwd: 'src'
        src: ['**/*.coffee']
        dest: 'app'
        ext: '.js'
        rename: (dest, src) ->
          console.log dest, src
          dest + '/' + src.replace(/\.coffee$/, '.js')
      dist:
        files:
          '<%= project.assets %>/js/app.js': '<%= project.js %>'

    watch:
      coffeescripts:
        files: ['<%= project.models %>', '<%= project.controllers %>']
        tasks: ['coffee:dev']
        options:
          spawn: false
          # livereload: true
      stylesheets:
        files: ['<%= project.css %>']
        tasks: ['sass']
        options:
          spawn: false
          livereload: true
      html:
        files: ['<%= project.app %>/*.html']
        options:
          livereload: true

      js:
        files: '<%= project.assets %>/js/test.js'
        tasks: ['jshint']

    sass:
      dev:
        options:
          style: 'expanded'
          # sourceMap: true
        files:
          '<%= project.assets %>/css/style.css': '<%= project.css %>'
      dist:
        options:
          style: 'compressed'
        files:
          '<%= project.assets %>/css/style.css': '<%= project.css %>'

  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  # grunt.loadNpmTasks 'grunt-contrib-jshint'
  # grunt.loadNpmTasks('grunt-contrib-connect')
  # grunt.loadNpmTasks('grunt-contrib-jasmine')
