var myFirebaseRef = new Firebase("https://6857-project-pga.firebaseio.com/");
var canvas, ctx,w,h;
var divnum = 1;
myFirebaseRef.on("value", function(snapshot){
	snapshot.forEach(function(data) {
		var result = data.val();
		var image = result.image;
		var gestures = result.gestures;

		var div = document.createElement("div")
		div.id = "div_" + divnum
		var img = document.createElement("img");
		img.id = "img_" + divnum
		var cnv = document.createElement("canvas")
		cnv.width = 1020
		cnv.height = 637
		cnv.style.zIndex = 10
		cnv.style.position = "absolute"
		cnv.style.left = 0
		cnv.style.top = -637

		var ctx = cnv.getContext("2d");
		div.appendChild(img);
		div.appendChild(cnv);

		document.getElementById("container2").appendChild(div);
		divnum += 1
		//div.appendChild(document.createElement("canvas"))

		if (image && gestures){
			document.getElementById(img.id).src = "images/" + image + ".jpg"
			displayGestures2(gestures, cnv, ctx);

		}
    });
})

function displayGestures2(gestures, cnv, ctx){
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
            drawCircle2(x, y, r, col, 10, fill, ctx);
        } else{
            var x1 = gestures[i][1];
            var y1 = gestures[i][2];
            var x2 = gestures[i][3];
            var y2 = gestures[i][4];
            //var col = gestures[i][5];
            var width = gestures[i][6];
            drawLine2(x1, y1, x2, y2, col, width, ctx);
        }
    }
}

function drawLine2(x1, y1, x2, y2, col, width, ctx){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = width;
    ctx.strokeStyle = col;
    ctx.stroke();
    ctx.closePath();

    var dx = x2 - x1;
    var dy = y2 - y1;

    var length = Math.sqrt(dx * dx + dy * dy);

    // x and y coordinates if arrow head has length 1
    var unitX = dx / length;
    var unitY = dy/ length;

    var arrowSize = 25;

    // coordinates for first arrowhead point
    var point1X = x2 - unitX * arrowSize - unitY * arrowSize;
    var point1Y = y2 - unitY * arrowSize + unitX * arrowSize;

    // coordinates for second arrowhead point
    var point2X = x2 - unitX * arrowSize + unitY * arrowSize;
    var point2Y = y2 - unitY * arrowSize - unitX * arrowSize;

    // draw line from center of first square to second square
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

            // draw arrow head
    ctx.moveTo(point1X, point1Y);
    ctx.lineTo(x2, y2);
    ctx.lineTo(point2X, point2Y);

    ctx.stroke();
}

function drawCircle2(x, y, r, col, width, fill, ctx){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    if (fill){
        ctx.fillStyle = col;
        ctx.fill();
    }
    ctx.strokeStyle = col;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
}