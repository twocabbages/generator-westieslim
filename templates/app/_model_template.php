<?php

namespace Model;

class <%= _.capitalize(_.camelize(name)) %> extends \ActiveRecord\Model
{
    static $table_name = '<%= table_name %>';
}