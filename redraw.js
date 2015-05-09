var myFirebaseRef = new Firebase("https://6857-project-pga.firebaseio.com/");
var canvas, ctx;
myFirebaseRef.on("value", function(snapshot){
	snapshot.forEach(function(data) {
		var result = data.val();
		var image = result.image;
		var gestures = result.gestures;
		/*console.log(gestures)
		var gesture1 = gestures[0];
		var type1 = gesture1[0];

		if (type1 == "circle"){
			var x = gesture1[1];
			var y = gesture1[2];
			var r = gesture1[3];
		}*/

		if (image && gestures){
			var base_image = new Image();
			base_image.setAttribute('crossOrigin', 'anonymous');

			base_image.src = "images/" + image +  ".jpg";
			//base_image.onload = function(){
				ctx.drawImage(base_image, 0, 0)
				displayGestures2(gestures);
				var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.

				window.location.href=image;
			//}

			// This is a little trick to get the SRC attribute from the generated <img> screenshot
			canvas.parentNode.appendChild(screenshot);
			screenshot.id = "canvasimage";    
			data = $('#canvasimage').attr('src');
			canvas.parentNode.removeChild(screenshot);

			console.log(data)


		}


    });
})

function init2() {
    // create canvas
    canvas = document.getElementById('imgCanvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
}

function displayGestures2(gestures){
    erase();
    var col = ""
    for (var i = 0; i < 3; i++){
    	if (i == 0){
    		col = "red";
    	}
    	else if (i == 1){
    		col = "green";
    	}
    	else {
    		col = "blue";
    	}
        if (gestures[i][0] == 'circle'){
            var x = gestures[i][1];
            var y = gestures[i][2];
            var r = gestures[i][3];
            //var col = gestures[i][4];
            var width = gestures[i][5];
            var fill = gestures[i][6];
            drawCircle(x, y, r, col, width, fill);
        } else{
            var x1 = gestures[i][1];
            var y1 = gestures[i][2];
            var x2 = gestures[i][3];
            var y2 = gestures[i][4];
            //var col = gestures[i][5];
            var width = gestures[i][6];
            drawLine(x1, y1, x2, y2, col, width);
        }
    }
}