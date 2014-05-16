module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        wiredep: {

            target: {
                directory: 'public/bower_modules',
                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    'app/Views/layouts/layout.twig'   // .html support...
                ],

                // Optional:
                // ---------
                cwd: '',
                dependencies: true,
                devDependencies: false,
                exclude: [],
                ignorePath: '../../../public/',
                fileTypes: {
                    twig: {
                        block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                        detect: {
                            js: /<script.*src=['"](.+)['"]>/gi,
                            css: /<link.*href=['"](.+)['"]/gi
                        },
                        replace: {
                            js: '<script src="{{ __PUBLIC__ }}/{{filePath}}"></script>',
                            css: '<link rel="stylesheet" href="{{ __PUBLIC__ }}/{{filePath}}" />'
                        }
                    }
                },
                overrides: {}
            }
        }
    });
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.registerTask('default', ['wiredep']);
}