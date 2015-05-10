<?php
require('../vendor/autoload.php');
$app = new Silex\Application();
$app['debug'] = true;

// Register the monolog logging service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
  'monolog.logfile' => 'php://stderr',
));

// Our web handlers

$app->get('/', function() use($app) {
  $app['monolog']->addDebug('logging output.');
echo "<h4> Select an image you would like to upload.</h4>"; 
echo '<form id="uploadbanner" enctype="multipart/form-data" method="post" action="#">
   <input id="fileupload" name="myfile" type="file" />
   <input type="submit" value="Upload" id="submit" />
</form>';
echo getcwd();
return 'Hello';

});

$app->run();
?>
