'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.gherkin_feature_report = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },
    default_options: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/report_default.md'),
            expected = grunt.file.read('test/expected/report_default.md');

        test.equal(actual, expected);
        test.done();
    },
    custom_options: function(test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/report_custom.md'),
            expected = grunt.file.read('test/expected/report_custom.md');

        test.equal(actual, expected);
        test.done();
    }
};
