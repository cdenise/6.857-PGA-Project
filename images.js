function changeImg(){
	// show side bar
	document.getElementById("sideBar").style.visibility = 'visible';
	// change displayed image
	var imageName = document.getElementById("imgSelector").value;
	var imageURL = "images/" + imageName + ".jpg";
	document.getElementById("img").src = imageURL;
	restart();
}