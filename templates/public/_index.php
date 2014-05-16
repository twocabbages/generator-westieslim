<?php
//Internet Explorer X-UA FIX
if (isset($_SERVER['HTTP_USER_AGENT']) && (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false))
    header('X-UA-Compatible: IE=edge,chrome=1');

define("__PUBLIC__",getcwd());
define("APP_PATH",  dirname(__PUBLIC__));
define("APP_ENV",   getenv("APPLICATION_ENV") == "" ? 'development' : getenv("APPLICATION_ENV"));

//Register lib autoloader
require APP_PATH . '/vendor/autoload.php';

$app = new \Slim\Slim(array(
    'mode'  => APP_ENV,
    'view'  => new \Slim\Views\Twig(),
    'templates.path' => APP_PATH . '/app/Views'
));

require_once APP_PATH . '/app/app.php';

//Run
$app->run();