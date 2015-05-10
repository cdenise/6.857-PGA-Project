var myFirebaseRef = new Firebase("https://6857-project-pga.firebaseio.com/shoulder_surfing");
var waldo_canvas, waldo_ctx, animals_canvas, animals_ctx, w,h;
var divnum = 1;
myFirebaseRef.on("value", function(snapshot){
	snapshot.forEach(function(data) {
		var result = data.val();
		var image = result.image;
		var gestures = result.gestures;

        if (image == "waldo2"){
            if (data.key() == "-Jo7uVjlX-oBI3E2MinH"){
                displayCorrectGestures(gestures, waldo_canvas, waldo_ctx);
            }
            else {
                displayGestures2(gestures, waldo_canvas, waldo_ctx)
            }

        }
        else {
            if (data.key() == "-Jo7tCuWAHiMtYKZW0zg"){
                displayCorrectGestures(gestures, animals_canvas, animals_ctx);
            }
            else {
                displayGestures2(gestures, animals_canvas, animals_ctx)
            }
        }
    });
})

function init2() {
    // create canvas
    waldo_canvas = document.getElementById('imgCanvas');
    waldo_ctx = waldo_canvas.getContext("2d");

    animals_canvas = document.getElementById('imgCanvas2');
    animals_ctx = animals_canvas.getContext("2d");
    w = 1020;
    h = 637;

}
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
            drawCircle2(x, y, r, col, 5, fill, ctx);
        } else{
            var x1 = gestures[i][1];
            var y1 = gestures[i][2];
            var x2 = gestures[i][3];
            var y2 = gestures[i][4];
            //var col = gestures[i][5];
            var width = gestures[i][6];
            drawLine2(x1, y1, x2, y2, col, 5, ctx);
        }
    }
}

function displayCorrectGestures(gestures, cnv, ctx){
    var col = ""
    for (var i = 0; i < 3; i++){
        col = "purple"

        if (gestures[i][0] == 'circle'){
            var x = gestures[i][1];
            var y = gestures[i][2];
            var r = gestures[i][3];
            //var col = gestures[i][4];
            var width = gestures[i][5];
            var fill = gestures[i][6];
            drawCircle2(x, y, r, col, 20, fill, ctx);
        } else{
            var x1 = gestures[i][1];
            var y1 = gestures[i][2];
            var x2 = gestures[i][3];
            var y2 = gestures[i][4];
            //var col = gestures[i][5];
            var width = gestures[i][6];
            drawLine2(x1, y1, x2, y2, col, 20, ctx);
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