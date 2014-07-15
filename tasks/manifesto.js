module.exports = function (grunt) {
    grunt.registerMultiTask('manifesto', 'Generate HTML5 cache manifest.', function () {
        var options = this.options();

        this.files.forEach(function (file) {

            var contents = [],
                hash = options.hash && require('crypto').createHash('md5');

            contents.push('', 'CACHE:');
            grunt.file.expand({
                cwd: file.cwd,
                filter: 'isFile'
            }, file.orig.src).forEach(function (f) {
                contents.push(encodeURI(f));

                if (hash && grunt.file.isFile(f)) {
                    hash.update(grunt.file.read(f), 'binary');
                }
            });

            if (options.network) {
                contents.push('', 'NETWORK:');
                options.network.forEach(function (f) {
                    contents.push(encodeURI(f));
                });
            }

            if (options.fallback) {
                contents.push('', 'FALLBACK:');
                options.fallback.forEach(function (f) {
                    contents.push(encodeURI(f));
                });
            }

            if (hash) {
                contents.unshift('# ' + hash.digest('hex'));
            }

            if (options.timestamp) {
                contents.unshift('# ' + new Date());
            }

            contents.unshift('CACHE MANIFEST', '');

            grunt.file.write(file.dest, contents.join('\n'));
            grunt.log.writeln('Manifest file created: ' + file.dest);

        });

    });
};
