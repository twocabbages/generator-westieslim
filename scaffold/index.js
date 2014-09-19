'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require("path");
var moment = require("moment");
var pluralize = require("pluralize");


var ScaffoldGenerator = yeoman.generators.NamedBase.extend({
    init: function () {
        var _this = this;
        this.table_name = pluralize(this.name);
        this.MigrateClassName = this._.capitalize(this._.camelize("create_table_" + this.name));
        this.controller_name = this._.capitalize(this._.camelize(this.name));

        this.sourceRoot(path.join(__dirname, '../templates'));
        this.argument('attributes', {
            type: Array,
            defaults: [],
            banner: 'field[:type][:comment] field[:type][:comment]'
        });

        // parse back the attributes provided, build an array of attr
        this.attrs = this.attributes.map(function (attr) {
            var parts = attr.split(':');
            var types = ["string", "text", "integer", "biginteger", "float", "decimal", "datetime", "timestamp", "time", "date", "binary", "boolean"];
            var type = "";
            if (_this._.contains(types, parts[1])) {
                type = parts[1];
            } else {
                type = 'string';
            }
            return {
                name: parts[0],
                type: type,
                comment: parts[2] || parts[0]
            };
        });
    },
    app: function () {
//        this.app_php = this.readFileAsString(path.join(this.env.cwd, "public/app.php"));
//        this.app_php = this.app_php + '\n\n' +
//            '$app->get("/' + this.name + '/create", function () use ($app) {\n' +
//            '    $class = new \Controller\\' + this._.capitalize(this._.camelize(this.name)) + '();\n' +
//            '    $class->create();\n' +
//            '});';
//        this.write('public/app.php', this.app_php);
        this.template("migrations/_migrate.php", "migrations/" + moment().format("YYYYMMDDHHmmss") + "_" + this._.underscored(this.MigrateClassName) + ".php");
        this.template("app/_model_template.php", "app/model/" + this._.capitalize(this._.camelize(this.name)) + ".php");
        this.template("tests/_test_model.php", "tests/model/" + this._.capitalize(this._.camelize(this.name + "_model_test")) + ".php");

        this.template("app/_scaffold_controller.php", "app/controller/" + this.controller_name + ".php");
        this.template("tests/_test_controller.php", "tests/controller/" + this._.capitalize(this._.camelize(this.name + "_controller_test")) + ".php");
//        this.template("app/_route_template.php", "route.php");

//        this.template("app/views/_template.twig", "templates/" + this.name + "/index.twig");
    },
    files: function () {
//    this.copy('somefile.js', 'somefile.js');
    }
});

module.exports = ScaffoldGenerator;