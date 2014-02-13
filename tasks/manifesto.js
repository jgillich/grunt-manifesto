module.exports = function (grunt) {
    grunt.registerMultiTask('manifesto', 'Generate HTML5 cache manifest.', function () {

        this.files.forEach(function (file) {

            var contents = [],
                options = this.options({
                    cwd: ''
                }),
                hash = options.hash && require('crypto').createHash('md5');

            contents.push('', 'CACHE:');
            grunt.file.expand({
                cwd: options.cwd,
                filter: 'isFile'
            }, file.orig.src).forEach(function (file) {
                contents.push(encodeURI(file));

                if (hash && grunt.file.isFile(file)) {
                    hash.update(grunt.file.read(file), 'binary');
                }
            });

            if(options.network) {
                contents.push('', 'NETWORK:');
                options.network.forEach(function (file) {
                    contents.push(encodeURI(file));
                });
            }

            if(options.fallback) {
                contents.push('', 'FALLBACK:');
                options.fallback.forEach(function (file) {
                    contents.push(encodeURI(file));
                });
            }

            if(hash) {
                contents.unshift('# ' + hash.digest('hex'));
            }

            if (options.timestamp) {
                contents.unshift('# ' + new Date());
            }

            contents.unshift('CACHE MANIFEST', '');

            grunt.file.write(file.dest, contents.join('\n'));
            grunt.log.writeln('Manifest file created: ' + file.dest);

        }.bind(this));

    });
};
