<?php
$app->get('/<%= name %>/index', function () use ($app) {
    // Sample log message
    $app->log->info("Slim-Skeleton '/<%= name %>/index' route");
    $class = new \Controller\<%= _.capitalize(_.camelize(name)) %>();
    $class->index();
});