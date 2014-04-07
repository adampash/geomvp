module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    # sass:
    #   src: 'src/sass/*'
    #   build: 'public/css/styles.css'

    project:
      app: 'app'
      build: 'dist'
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
      lib: [
        '<%= project.js %>/lib/*'
      ]

    coffee:
      dev:
        options:
          sourceMap: true
          bare: true
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
        files: [
          '<%= project.models %>',
          '<%= project.controllers %>',
          '<%= project.lib %>'
        ]
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

      builds:
        files: 'dist/*.ipa'
        tasks: ['testflight:iOS']

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

    testflight:
      iOS:
        options:
          apiToken: '68e6290c29d97ff85d9cb5c5f3c20ca6_MjAwMDg2MjAxMS0xMC0yOCAxNzo1OTo1NC4yMTAyMjc'
          teamToken: 'e8516c3d088bd3a362fc5afbc9f16152_MzYwNjM3MjAxNC0wMy0yOSAxODozNDo0NS4zNDU2MTY'
          file: '<%= project.build %>/Beacon.ipa'
          notes: "This app has some spit shine. It also tracks installation progress and lots of other small behind-the-scenes updates. Try it out!"
          distributionLists: ['Testers']
          notify: false

  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-testflight'
  # grunt.loadNpmTasks('grunt-contrib-jasmine')
