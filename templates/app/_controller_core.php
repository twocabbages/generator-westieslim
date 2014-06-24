<?php

namespace Core;


class Controller{
    protected $app;
    public function __construct()
    {
        $this->app = \Slim\Slim::getInstance();
    }
}