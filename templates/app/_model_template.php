<?php

namespace app\model;
use ActiveRecord\model;
/**
 * This is the model class for table "<%= table_name %>".
 * @package app\model<% _.each(attrs, function(attr){ %>
 * @property <%= attr.type %> $<%= attr.name %><% }) %>
 */
class <%= _.capitalize(_.camelize(name)) %> extends model
{
    static $table_name = '<%= table_name %>';
}