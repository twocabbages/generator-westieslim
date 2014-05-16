'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require("path");


var ControllerGenerator = yeoman.generators.NamedBase.extend({
    init: function () {
        this.controller_name = this._.capitalize(this._.camelize(this.name));
        console.log('generate controller ' + this.name + '.');
        this.sourceRoot(path.join(__dirname, '../templates'));
    },

    files: function () {
        this.template("app/_controller_template.php", "app/Controller/" + this.controller_name + ".php");
        this.template("app/_route_template.php", "app/Routes/" + this.controller_name + ".php");
        this.template("tests/_test_controller.php", "tests/controller/" + this._.capitalize(this._.camelize(this.name + "_controller_test")) + ".php");
    }
});

module.exports = ControllerGenerator;