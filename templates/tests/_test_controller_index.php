<?php

class IndexControllerTest extends Slim_Framework_TestCase {
    public function testIndex()
    {
        $parameters = array();
        $this->get('/index',$parameters,array(
            'QUERY_STRING' => 'name=westie',
        ));
        $this->assertEquals(200, $this->response->status());
        $this->assertGreaterThanOrEqual(0, strpos($this->response->body(), "westie"));
    }
}