<?php

namespace app\core;


class BaseController{
    protected $app;
    public function __construct()
    {
        $this->app = \Slim\Slim::getInstance();
    }
}