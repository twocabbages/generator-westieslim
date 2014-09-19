<?php

class <%= _.capitalize(_.camelize(name+"_model_test")) %> extends PHPUnit_Framework_TestCase {
    function setUp(){

        }
        public function testCreate()
        {
            $data = array(
                <% _.each(attrs, function(attr){ %>
                "<%= attr.name %>" => <% if(attr.type == 'integer') { %>1<% }else{ %>"test"<% } %>,
                <% }) %>
            );

            $model = new \model\<%= _.capitalize(_.camelize(name)) %>($data);

            $this->assertTrue($model->save());

            return $model;
        }
        /**
         * @depends testCreate
         */
        public function testRead($model){
            $model = \model\<%= _.capitalize(_.camelize(name)) %>::find($data = array(
                <% _.each(attrs, function(attr){ %>
                    "<%= attr.name %>" => <% if(attr.type == 'integer') { %>1<% }else{ %>"test"<% } %>,
                <% }) %>
            ));

            return $model;
        }
        /**
         * @depends testRead
         */
        public function testUpdate($model){
            $this->assertTrue($model->update_attributes(array(
                <% _.each(attrs, function(attr){ %>
                    "<%= attr.name %>" => <% if(attr.type == 'integer') { %>11<% }else{ %>"test1"<% } %>,
                <% }) %>
            )));
            return $model;
        }
        /**
         * @depends testUpdate
         */
        function testDelete( $model ){

            $this->assertTrue($model->delete());
        }

        function tearDown(){
        }
}