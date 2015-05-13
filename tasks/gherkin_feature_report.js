/*
 * grunt-gherkin-feature-report
 * 
 *
 * Copyright (c) 2015 Accountable Care Transactions, Inc.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var Gherkin = require('gherkin'),
        Handlebars = require('handlebars'),
        _ = require('underscore'),
        template = Handlebars.compile('## {{{name}}}\n{{#if descriptionLines}}{{#each descriptionLines}}> {{{this}}}\n{{/each}}{{/if}}\n{{#each scenarioDefinitions}}- {{{name}}}\n{{/each}}');

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('gherkin_feature_report', 'Generate a marketing-worthy report of your applications features and scenarios.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
                exclusionTag: '@excludeFromReport'
            }),
            parser = new Gherkin.Parser();

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            // Iterate over each feature file, confirming first that it exists
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {

                grunt.log.writeln('Parsing ' + filepath);

                var feature = parser.parse(
                    new Gherkin.TokenScanner(grunt.file.read(filepath)),
                    new Gherkin.AstBuilder(),
                    new Gherkin.TokenMatcher());

                // Don't include this feature in the report
                if (_.findWhere(feature.tags, { name: options.exclusionTag })) {
                    return;
                }

                feature.scenarioDefinitions = feature.scenarioDefinitions.filter(function(scenario) {
                    return _.findWhere(scenario.tags, { name: options.exclusionTag }) === undefined;
                });

                if (feature.description && feature.description.length) {
                    feature.descriptionLines = feature.description.split("\n")
                        .map(function(line) { return line.trim(); });
                }

                /*
                 {
                     type: 'Feature',
                     tags: [],
                     location: { line: 1, column: 1 },
                     language: 'en',
                     keyword: 'Feature',
                     name: 'hello',
                     description: undefined,
                     background: undefined,
                     scenarioDefinitions: [],
                     comments: []
                 }
                 */

                return template(feature);

            }).join(grunt.util.normalizelf("\n\n"));

            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.ok('File "' + f.dest + '" created.');
        });
    });

};
