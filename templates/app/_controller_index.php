<?php
namespace app\controller;
use app\core\BaseController;

class Index extends BaseController{
    public function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        echo("name:" . $this->app->request()->params("name"));
    }
}