# grunt-manifesto

HTML5 cache manifest generator. Inspired by [grunt-manifest](https://github.com/gunta/grunt-manifest).

##  Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```
npm install grunt-manifesto --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```
grunt.loadNpmTasks('grunt-manifesto');
```

## Manifesto task
_Run this task with the `grunt manifesto` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Example configuration

```
grunt.initConfig({
    manifesto: {
        target: {
            src: ['scripts/*.js*', 'stylesheets/*.css', 'index.html'],
            dest: 'manifest.appcache',
            options: {
                network: ['*'],
                fallback: ['offline.html'],
                hash: true,
                timestamp: true
            }
        }
    }
});
```
