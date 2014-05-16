<?php
namespace Controller;


class Index extends \Core\Controller{
    public function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        echo("name:" . $this->app->request()->params("name"));
    }
}