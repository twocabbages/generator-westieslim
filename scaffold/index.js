'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require("path");


var ScaffoldGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
      var _this = this;
      this.sourceRoot(path.join(__dirname, '../templates'));
      this.argument('attributes', {
          type: Array,
          defaults: [],
          banner: 'field[:type][:comment] field[:type][:comment]'
      });

      // parse back the attributes provided, build an array of attr
      this.attrs = this.attributes.map(function (attr) {
          var parts = attr.split(':');
          var types = ["string","text","integer","biginteger","float","decimal","datetime","timestamp","time","date","binary","boolean"];
          var type = "";
          if(_this._.contains(types, parts[1])){
              type = parts[1];
          }else{
              type = 'string';
          }
          return {
              name: parts[0],
              type: type,
              comment: parts[2] || parts[0]
          };
      });
      console.log(this.attrs);
  },

  files: function () {
//    this.copy('somefile.js', 'somefile.js');
  }
});

module.exports = ScaffoldGenerator;