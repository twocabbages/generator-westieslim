<?php

class IndexTest extends Slim_Framework_TestCase
{

    public function testIndex()
    {
        $parameters = array();
        $this->get('/',$parameters,array(
            'QUERY_STRING' => 'name=westie',
        ));
        $this->assertEquals(200, $this->response->status());
        $this->assertGreaterThan(0, strpos($this->response->body(), "Welcome"));
    }
}
