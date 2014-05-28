'use strict';
var fs = require("fs");
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var shelljs = require('shelljs');
var randomString = require('random-string');
var wiredep = require("wiredep");
var foldername = path.basename(process.cwd());

var WestieGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.appname = this._.camelize(this._.slugify(this._.humanize(foldername)));
        this.pkg = require('../package.json');
        this.description = this.pkg.description;
        this.slimDependencies = ['php', 'composer'];
        this.sourceRoot(path.join(__dirname, '../templates'));

        this.slimDependenciesInstalled = this.slimDependencies.every(function (depend) {
            return shelljs.which(depend);
        });

        this.on('end', function () {

            var slimInstall = {
                skipInstall: this.options['skip-install']
            };

            if (!this.slimDependenciesInstalled) {
                var missingMsg =
                    chalk.red('\n===================================================================\n') + chalk.underline.bgRed('Missing dependencies') +
                        '\n\nMake sure ' + chalk.yellow.bold('PHP') + ' and ' +
                        chalk.yellow.bold('Composer') + ' are installed \nand added to your $PATH environment variable.\nThen run ' + chalk.yellow.bold('composer install') +
                        ' to install the required Slim dependencies.' +
                        chalk.red('\n===================================================================');

                console.log(missingMsg);
            } else {
                slimInstall.callback = function () {
                    this.spawnCommand('composer', ['install']);
                    if (this.options['skip-install']) {
                        this.log(
                            'After running `npm install & bower install`, inject your front end dependencies' +
                                '\ninto your source code by running:' +
                                '\n' +
                                '\n' + chalk.yellow.bold('grunt bowerInstall')
                        );
                    } else {
                        wiredep({
                            directory: 'public/bower_modules',
                            bowerJson: JSON.parse(fs.readFileSync('./bower.json')),
                            ignorePath: '../../../public/',
                            src: 'app/Views/layouts/layout.twig',
                            fileTypes: {
                                twig: {
                                    block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                                    detect: {
                                        js: /<script.*src=['"](.+)['"]>/gi,
                                        css: /<link.*href=['"](.+)['"]/gi
                                    },
                                    replace: {
                                        js: '<script src="{{ constant("__PUBLIC__") }}/{{filePath}}"></script>',
                                        css: '<link rel="stylesheet" href="{{ constant("__PUBLIC__") }}/{{filePath}}" />'
                                    }
                                }
                            }
                        });
                    }
                }.bind(this);
            }
            this.installDependencies(slimInstall);
        });
    },

    askFor: function () {
        var done = this.async();
        var log = this.log;

        if (!this.options['skip-welcome-message']) {
            console.log(this.yeoman);
        }

        this.slimDependencies.forEach(function (depend) {
            var installed = shelljs.which(depend);
            log.write( chalk.gray('... Checking ') + chalk.yellow('%s ... '), depend );
            if (installed) {
                log.ok();
            } else {
                log.error();
            }

        })
        log.write();

        var prompts = [{
            name: 'siteName',
            message: 'Whats the name of the website?',
            default: foldername
        },{
            name: 'author',
            message: 'Who is the creator?',
            default: 'westie'
        },{
            name: 'serverPort',
            message: 'Whats the webserver port?',
            default: 8080
        }];

        this.prompt(prompts, function (props) {
            this.authHashSecret = randomString({length: 30});
            this.sessionCookieSecret = randomString({length: 30});
            this.siteName = props.siteName;
            this.author = props.author;
            this.serverPort = props.serverPort;

            done();
        }.bind(this));
    },

    app: function () {

        this.mkdir('tests');
        this.mkdir('tests/integration');
        this.mkdir('tests/model');
        this.mkdir('tests/controller');

        this.mkdir('public');
        this.mkdir('public/js');
        this.mkdir('public/css');
        this.mkdir('public/img');

        this.mkdir('app');
        this.mkdir('app/Config');
        this.mkdir('app/Common');
        this.mkdir('app/Routes');
        this.mkdir('app/Core');
        this.mkdir('app/Model');
        this.mkdir('app/Controller');
        this.mkdir('app/Views');
        this.mkdir('app/Views/errors');
        this.mkdir('app/Views/layouts');

        this.mkdir('tmp');
        this.mkdir('tmp/logs');
        this.mkdir('tmp/cache');


        this.mkdir('migrations');



        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');
        this.template('_composer.json', 'composer.json');
        this.template('_Gruntfile.js', 'Gruntfile.js');
        this.copy('_phinx.yml', 'phinx.yml');

        this.copy('tmp/_app.log', 'tmp/logs/app.log');

        this.copy('tests/_bootstrap.php', 'tests/bootstrap.php');
        this.copy('tests/_test_controller_default.php', 'tests/integration/IndexTest.php');
        this.copy('tests/_test_controller_index.php', 'tests/controller/IndexControllerTest.php');

        this.copy('public/_index.php', 'public/index.php');
        this.copy('app/_app.php', 'app/app.php');
        this.copy('app/_common_bootstrap.php', 'app/Common/bootstrap.php');


        this.copy('app/_controller_index.php', 'app/Controller/Index.php');
        this.copy('app/_controller_core.php', 'app/Core/Controller.php');
        this.copy('app/_routes_index.php', 'app/Routes/Index.php');


        this.copy('app/_config_config.yml', 'app/Config/config.yml');

        this.copy('app/views/_index.twig', 'app/Views/index.twig');
        this.copy('app/views/layouts/_layout.twig', 'app/Views/layouts/layout.twig');
        this.copy('app/views/layouts/_common.twig', 'app/Views/layouts/common.twig');
        this.copy('app/views/layouts/_LICENSE.md', 'app/Views/layouts/LICENSE.md');
        this.copy('app/views/errors/_404.twig', 'app/Views/errors/404.twig');
    },

    projectfiles: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('bowerrc', '.bowerrc');
    }
});


module.exports = WestieGenerator;