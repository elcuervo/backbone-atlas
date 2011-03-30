{spawn, exec} = require 'child_process'
coffee  = require 'coffee-script'
fs      = require 'fs'

compile = (dir_path, match = /\.coffee$/ ) ->
  dir_files = fs.readdirSync dir_path
  build_files = []
  build_files.push "#{dir_path}/#{file}" for file in dir_files when file.match(match)

  for file in build_files
    coffee_file = fs.readFileSync file, 'utf-8'
    javascript = coffee.compile coffee_file
    fs.writeFileSync "#{file.split(".")[0]}.js" , javascript, 'utf-8'

task "build", "Build files", (options) ->
  compile 'lib/backbone'

task "build:test", "Build Tests", (options) ->
  compile 'test'

task "test", "Run Test", (options) ->
  invoke "build"
  invoke "build:test"

  exec "open test/test.html", (error, stdout, stderr) ->
    console.log stdout
    console.log stderr
