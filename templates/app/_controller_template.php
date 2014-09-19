<?php

namespace app\controller;
use app\core\BaseController;

class <%= _.capitalize(_.camelize(name)) %> extends BaseController
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