function changeImg(){
	// show side bar
	document.getElementById("sideBar").style.visibility = 'visible';
	// change displayed image
	var imageName = document.getElementById("imgSelector").value;
	var imageURL = "images/" + imageName + ".jpg";
	document.getElementById("img").src = imageURL;
	restart();
}

function clickImg(image){
	console.log(image)
	// remove thumbnail div
	document.getElementById("imageThumbs").remove();
	// change selector value
	document.getElementById('imgSelector').value = image;
	changeImg();
	// display image selector
    document.getElementById("imgSelector").style.visibility = 'visible';
}