<?php

class <%= controller_name %>controllerTest extends Slim_Framework_TestCase {
    public function testIndex()
    {
        $parameters = array();
        $this->get('/<%= name %>/index',$parameters,array(
            'QUERY_STRING' => 'name=westie',
        ));
        $this->assertEquals(200, $this->response->status());
        $this->assertGreaterThanOrEqual(0, strpos($this->response->body(), "westie"));
    }
}