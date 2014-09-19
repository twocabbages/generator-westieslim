<?php

namespace Controller;

use \Controller\Base as BaseController;
use \Model\<%= _.capitalize(_.camelize(name)) %> as <%= _.capitalize(_.camelize(name)) %>Model;

class <%= _.capitalize(_.camelize(name)) %> extends BaseController
{
    protected $<%= name %>_model;
    protected $_map = [
        <% _.each(attrs, function(attr){ %>"<%= attr.name %>" => '<%= attr.name %>',
        <% }) %>
    ];
    public function __construct()
    {
        parent::__construct();
        $this-><%= name %>_model = new <%= _.capitalize(_.camelize(name)) %>Model();
    }
    /**
    * read
    */
    public function read()
    {
       $model = <%= _.capitalize(_.camelize(name)) %>Model::find($data = array(
           <% _.each(attrs, function(attr){ %>"<%= attr.name %>" => <% if(attr.type == 'integer') { %>1<% }else{ %>"test"<% } %>,
           <% }) %>
       ));
       var_dump($model);
      $result = array();
       foreach( $model as $k => $v ){
           $result[$k] = [
             <% _.each(attrs, function(attr){ %>"<%= attr.name %>" => $this-><%= attr.name %>,
             <% }) %>
           ];
       }
       return $model;
    }
    /**
    * delete
    */
    public function delete()
    {
        $model = $this->read();
        echo $this->assertTrue($model->delete());
    }
    /**
    * update
    */
    public function update()
    {
       $model = $this->read();
       echo $model->update_attributes(array(
           <% _.each(attrs, function(attr){ %>'<%= attr.name %>' => <% if(attr.type == 'integer') { %>11<% }else{ %>"test1"<% } %>,
           <% }) %>
       ));
    }
    /**
    * create
    */
    public function create()
    {
        $data = init_param($this->app->request->params(), array(
        <% _.each(attrs, function(attr){ %>array('<%= attr.name %>', 'require', 'need <%= attr.name %>', 1),
        <% }) %>
        ));
        $<%= name %>_data = array(
            <% _.each(attrs, function(attr){ %>"<%= attr.name %>" => $data['<%= attr.name %>'],
            <% }) %>
        );
        $model = new <%= _.capitalize(_.camelize(name)) %>Model($<%= name %>_data);

        echo($model->save());
    }
}