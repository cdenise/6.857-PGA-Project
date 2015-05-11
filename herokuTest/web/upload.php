<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
define ('SITE_ROOT', realpath(dirname(__FILE__)));
//sys_get_temp_dir();
//$target_dir = "/Users/srinidhi/Documents/MIT\ Junior/6.857/pga/herokuTest/web/uploadedImages/";
$target_dir = "web/app/uploadedImages/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
//$target_file = 'animal.jpg';
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
echo 'right before exec';
$pathname = getcwd();
echo $pathname;
//echo $pathname . "/imageDetection.exe\ /app/web/uploadedImages/animal.jpg 2>&1";
//passthru($pathname . "/imageDetection.exe\ /app/web/uploadedImages/animal.jpg");
exec($pathname . "/imageDetection.exe" . " " .$target_file . "2>&1", $output);
//exec($pathname . "/imageDetection.exe ", $output);
echo 'right after exec';
var_dump($output);
//return 'Hello';

//echo 'test';
//echo $target_file;
//echo $_FILES["fileToUpload"]["name"];
// Check if image file is a actual image or fake image
/*
if(isset($_POST["submit"])) {
	echo "Inside SUBMIT";
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], SITE_ROOT.$target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}*/
?>
