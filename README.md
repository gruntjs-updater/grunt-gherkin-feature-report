# grunt-gherkin-feature-report

> Generate a marketing-worthy report of your application's features and scenarios.

This handy Grunt plugin will take a bunch of Gherkin-language feature files and output a file
(in Markdown, for now) containing each feature with a bulleted list of scenarios. You can easily exclude
particular features or scenarios from the report.

## Why?

It's important for our customers to know what they're getting when they buy our software.
Rather than manually create a "feature list" from time to time, which is prone to error
or omission, we wanted something straight from the horse's mouth, i.e. our integration tests.
This new audience for our test definitions now helps us focus on the proper writing style.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gherkin-feature-report --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gherkin-feature-report');
```

## The "gherkin_feature_report" task

### Usage example
In your project's Gruntfile, add a section named `gherkin_feature_report` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gherkin_feature_report: {
    // Source files and destination file
    files: [{
      src: [ 'test/src/features/*.feature' ],
      dest: 'features.md'
    }],
    options: {
      exclusionTag: '@excludeFromReport'
    }
  },
});
```

### Options

#### options.exclusionTag
Type: `String`
Default value: `@excludeFromReport`

Any feature or scenario tagged with this value will be excluded from the report. Remember to prefix your tag with @

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
