<?php

$config_config = Symfony\Component\Yaml\Yaml::parse(__DIR__ . '/config/config.yml');
$app->config($config_config["config"]);
$app->config($config_config["environments"][APP_ENV]);


//prepare ActiveRecord
ConfigActiveRecord(APP_ENV);

// Create monolog logger and store logger in container as singleton
// (Singleton resources retrieve the same log resource definition each time)
$app->container->singleton('log', function () {
    $log = new \Monolog\Logger('slim-skeleton');
    $log->pushHandler(new \Monolog\Handler\StreamHandler( APP_PATH . '/tmp/logs/app.log', \Monolog\Logger::DEBUG));
    return $log;
});

// Prepare view
$app->view->parserOptions = array(
    'charset'       => 'utf-8',
    'cache'         => realpath(APP_PATH . '/tmp/cache'),
    'auto_reload'   => true,
    'strict_variables' => false,
    'autoescape'    => true
);
$app->view->parserExtensions = array(
    new \Slim\Views\TwigExtension(),
);


//Load 404 Route
$app->notFound(function () use ($app) {
    $request    = $app->request();
    $requesturi = 'http://'.$_SERVER["HTTP_HOST"].$request->getRootUri().$request->getResourceUri();
    $app->view->appendData(array('viewName'=>'Page not found','requesturi'=>$requesturi));
    $app->render('errors/404.twig');
});

$app->view->setData(array('menu'=>array(
    'Home',
)));

// Define routes
$app->get('/', function () use ($app) {
    // Sample log message
    $app->log->info("Slim-Skeleton '/' route");

    $app->view()->setData("myName", $app->request()->params("name"));
    // Render index view
    $app->render('index.twig');
});
