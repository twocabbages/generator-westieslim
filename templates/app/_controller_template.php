<?php

namespace Controller;

class <%= _.capitalize(_.camelize(name)) %> extends \Core\Controller
{
    public function __construct()
    {
        parent::__construct();
    }
    /**
    * example
    */
    public function index()
    {
       echo("name:" . $this->app->request()->params("name"));
    }
}