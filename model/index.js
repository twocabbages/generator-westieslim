'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require("path");
var moment = require("moment");
var pluralize = require("pluralize");



var ModelGenerator = yeoman.generators.NamedBase.extend({
    init: function () {
        var self = this;
        this.table_name = pluralize(this.name);
        this.MigrateClassName = this._.capitalize(this._.camelize("create_table_" + this.name));

        this.argument('attributes', {
            type: Array,
            defaults: [],
            banner: 'field[:type] field[:type]'
        });

        // parse back the attributes provided, build an array of attr
        this.attrs = this.attributes.map(function (attr) {
            var parts = attr.split(':');
            var types = ["string","text","integer","biginteger","float","decimal","datetime","timestamp","time","date","binary","boolean"];
            var type = "";
            if(self._.contains(types, parts[1])){
                type = parts[1];
            }else{
                type = 'string';
            }
            return {
                name: parts[0],
                type: type
            };
        });
        this.sourceRoot(path.join(__dirname, '../templates'));
    },
    app: function () {
        this.template("migrations/_migrate.php", "migrations/" + moment().format("YYYYMMDDHHmmss") + "_" +this._.underscored(this.MigrateClassName) + ".php");
        this.template("app/_model_template.php", "app/Model/" + this._.capitalize(this._.camelize(this.name)) + ".php");
        this.template("tests/_test_model.php", "tests/model/" + this._.capitalize(this._.camelize(this.name+"_model_test")) + ".php");
    },
    files: function () {
//    this.copy('somefile.js', 'somefile.js');
    }
});

module.exports = ModelGenerator;