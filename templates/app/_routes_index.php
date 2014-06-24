<?php
$app->get('/index', function () use ($app) {
    // Sample log message
    $app->log->info("Slim-Skeleton '/index' route");
    $class = new \Controller\Index();
    $class->index();
});