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
 echo '<form id="uploadbanner" enctype="multipart/form-data" method="post" action="upload.php">
   <input id="fileToUpload" name="fileToUpload" type="file" />
   <input type="submit" value="Upload" id="submit" />
</form>';

echo '<script type=\"text/javascript\"> 
console.log("before n here fadfadf");
var fileSelect = document.getElementById("fileToUpload");
console.log("in here fadfadf");

form.onsubmit = function(event) {
var files = fileSelect.files;
console.log("in here fadfadf1");
var file = files[0];
console.log("in here fadfadf12");
console.log(file.name);
}
</script>';
//exec("C:\imageDetection.exe $argument");
return 'Hello';

});

$app->run();
?>
