function changeImg(){
	var imageName = document.getElementById("imgSelector").value;
	var imageURL = "images/" + imageName + ".jpg";
	document.getElementById("img").src = imageURL;
	restart();
}