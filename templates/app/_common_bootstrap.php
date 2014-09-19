<?php
date_default_timezone_set("UTC");

function ConfigActiveRecord($environment)
{
    //setup php-activerecord
    ActiveRecord\Connection::$datetime_format = 'Y-m-d H:i:s';
    ActiveRecord\DateTime::$FORMATS['iso8601'] = 'Y-m-d H:i:s';
    ActiveRecord\Config::initialize(function ($cfg) {
        //get database config
        $dbConfig = Symfony\Component\Yaml\Yaml::parse(APP_PATH . '/phinx.yml');
        $environments = $dbConfig['environments'];
        $dbConnections = array();
        foreach ($environments as $env => $config) {
            if (is_array($config)) {
                $dbConnections[$env] = "mysql://{$config['user']}:{$config['pass']}@{$config['host']}/{$config['name']}?charset=utf8";
            }
        }

        $cfg->set_model_directory(APP_PATH . '/app/model');
        $cfg->set_connections($dbConnections);
    });
    $cfg = ActiveRecord\Config::instance();
    $cfg->set_default_connection($environment);
    return $environment;
}
