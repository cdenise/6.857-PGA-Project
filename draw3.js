/*
    author: cdenise@mit.edu
*/
var myFirebaseRef = new Firebase("https://6857-project-pga.firebaseio.com/shoulder_surfing");

var canvas, ctx = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    midX = 0,
    midY = 0,
    finished = false,
    gestures = [],
    gestureStrings = [],
    mouseDown = false,
    current = 'introduction',
    saveString;

var color = "gray",
    radius = 5,
    offset = 12,
    expNum = 1,
    userID,
    exp1_image,
    exp2_image;

var comple_image = "waldo",
    simple_image = "animal";

function init() {
    // update gesture # label
    gestureNum = 1;
    updateGestureLabel(gestureNum);

    // create canvas
    canvas = document.getElementById('imgCanvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    // add listeners
    canvas.addEventListener("touchstart", function(e){
        // console.log('touchstart');
        erase(); // clear previous gesture
        currX = e.targetTouches[0].clientX - canvas.offsetLeft - offset;
        currY = e.targetTouches[0].clientY - canvas.offsetTop - offset;
        prevX = currX;
        prevY = currY;
        processTouch('start', e);
    }, false);

    canvas.addEventListener("touchmove", function(e){
        // console.log('touchmove');
        prevX = currX;
        prevY = currY;
        currX = e.targetTouches[0].clientX - canvas.offsetLeft - offset;
        currY = e.targetTouches[0].clientY - canvas.offsetTop - offset;
        processTouch('move', e);
    }, false);

    canvas.addEventListener("touchend", function(e){
        // console.log('touchend');
        processTouch('end', e);
    }, false);

    canvas.addEventListener("mousemove", function (e) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft - offset;
        currY = e.clientY - canvas.offsetTop - offset;
        if (mouseDown){
            processTouch('move', e)
        }
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        mouseDown = true;
        currX = e.clientX - canvas.offsetLeft - offset;
        currY = e.clientY - canvas.offsetTop - offset;
        prevX = currX;
        prevY = currY;
        processTouch('start', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        mouseDown = false;
        currX = e.clientX - canvas.offsetLeft - offset;
        currY = e.clientY - canvas.offsetTop - offset;
        processTouch('end', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        mouseDown = false;
    }, false);
}

function processTouch(res, e) {
    var source = document.getElementById("img").src;
    source = source.split("/").pop();
    if (source == "instructions1.jpg" || source == "instructions2.jpg" || source == "backgound.jpg" || source == "introduction.jpg"){
        return
    }
    if (finished){
        return;
    }
    if (res == 'start') {
        // currX = e.targetTouches[0].clientX - canvas.offsetLeft - offset;
        // currY = e.targetTouches[0].clientY - canvas.offsetTop - offset;
        // prevX = currX;
        // prevY = currY;
        // first point
        startX = currX;
        startY = currY;
        // current farthest point from first point
        farX = currX;
        farY = currY;
        farDist = 0;
        draw();
        moveCount = 0;
    }
    if (res == 'end') {
        erase();
        var dist = Math.sqrt(Math.pow(startX - currX, 2) + Math.pow(startY - currY, 2));
        // tap
        if (moveCount < 2){
            drawCircle(startX, startY, 5, 'red', 0, true);
            saveString = 'tap at ('+ startX.toString() + ', ' + startY.toString() + ')';
            gesture = ['circle', startX, startY, 5, 'red', 0, true];
        }
        // circle
        else if (dist < 25){
            var midX = (startX + farX) / 2;
            var midY = (startY + farY) / 2;
            var rad = Math.sqrt(Math.pow(startX - midX, 2) + Math.pow(startY - midY, 2));
            drawCircle(midX, midY, rad, 'red', 0, false);
            saveString = 'circle centered at ('+ midX.toString() + ', ' + midY.toString() + ') with radius', rad;
            gesture = ['circle', midX, midY, rad, 'red', 0, false];
        }
        // line
        else {
            drawLine(startX, startY, currX, currY, 'red', 3 * radius)
            saveString = 'line from (' + startX.toString() + ', ' + startY.toString() + ') to (' + currX.toString() + ', ' + currY.toString() + ')';
            gesture = ['line', startX, startY, currX, currY, 'red', 3 * radius];
        }     
    }
    if (res == 'move') {
        // prevX = currX;
        // prevY = currY;
        // currX = e.targetTouches[0].clientX - canvas.offsetLeft - offset;
        // currY = e.targetTouches[0].clientY - canvas.offsetTop - offset;
        draw();
        moveCount++;
        // update farthest point from start
        var dist = Math.sqrt(Math.pow(startX - currX, 2) + Math.pow(startY - currY, 2));
        if (dist > farDist){
            farDist = dist;
            farX = currX;
            farY = currY;
        }
    }
}

function returnOrientation(x1,x2,y1,y2) {
    //Returns true if counter-clockwise; false if clockwise.
    dot = x1*x2 + y1*y2;
    det = x1*y2 - y1*x2; 
    angle = Math.atan2(det, dot);
    if (angle > 0) {
        return true;
    }
    else{
        return false;
    }
    //console.log(angle);
}


function draw() {
    // draw filled circle at location
    drawCircle(currX, currY, radius, color, radius, true);

    // draw line from current point to previous point
    drawLine(prevX, prevY, currX, currY, color, 3 * radius)
}

function drawLine(x1, y1, x2, y2, col, width){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = width;
    ctx.strokeStyle = col;
    ctx.stroke();
    ctx.closePath();
}

function drawCircle(x, y, r, col, width, fill){
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

function erase() {
    ctx.clearRect(0, 0, w, h);
}

/*
    save current gesture
*/
function save() {
    erase();
    if (saveString == undefined){
        alert('Error: No gesture selected.');
    }
    else{
        gestureStrings.push(saveString);
        gestures.push(gesture);
        if (gestureNum == 3){
            finished = true;
            updateGestureLabel("Done");
            // remove save button
            var elem = document.getElementById("saveButton");
            var restartButton = document.getElementById("restartButton");
            var parent = elem.parentNode;
            parent.removeChild(elem);
            // add display gestures button
            var elem1 = document.createElement("button");
            elem1.setAttribute("onclick", "displayGestures()");
            elem1.innerHTML = "Display";
            elem1.id = "displayButton";
            parent.insertBefore(elem1, restartButton);

            // parent.appendChild(elem1);
            // add upload gestures button
            var elem2 = document.createElement("button");
            elem2.id = "uploadButton";
            elem2.setAttribute("onclick", "upload()");
            elem2.innerHTML = "Finished";
            parent.appendChild(elem2);

        } else{
            // ask for next gesture
            gestureNum ++;
            updateGestureLabel(gestureNum);
            saveString = undefined;
        }
    }
    
}

function restart(){
    erase();
    // update buttons
    if (finished){
        var restartButton = document.getElementById("restartButton");
        var parent = restartButton.parentNode;
        // add save button
        var saveButton = document.createElement("button");
        saveButton.setAttribute("onclick", "save()");
        saveButton.innerHTML = "Save";
        saveButton.id = "saveButton";
        parent.insertBefore(saveButton, restartButton);
        // remove display button
        var displayButton = document.getElementById("displayButton");
        parent.removeChild(displayButton);
        // remove upload button
        var uploadButton = document.getElementById("uploadButton");
        parent.removeChild(uploadButton);
    }

    // reinitialize varilables and display
    gestureNum = 1;
    updateGestureLabel(gestureNum);
    prevX = 0;
    currX = 0;
    prevY = 0;
    currY = 0;
    midX = 0;
    midY = 0;
    finished = false;
    gestures = [];
    gestureStrings = [];
    saveString = undefined;
    mouseDown = false;
}

function updateGestureLabel(gestureNum){
    if (gestureNum == "Done"){
        document.getElementById('gestureLabel').innerHTML = 'Finished';
    } else{
        document.getElementById('gestureLabel').innerHTML = 'Gesture ' + gestureNum.toString();
    }
}

/*
    Display all 3 chosen gestures
*/
function displayGestures(){
    erase();
    for (var i = 0; i < 3; i++){
        if (gestures[i][0] == 'circle'){
            var x = gestures[i][1];
            var y = gestures[i][2];
            var r = gestures[i][3];
            var col = gestures[i][4];
            var width = gestures[i][5];
            var fill = gestures[i][6];
            drawCircle(x, y, r, col, width, fill);
        } else{
            var x1 = gestures[i][1];
            var y1 = gestures[i][2];
            var x2 = gestures[i][3];
            var y2 = gestures[i][4];
            var col = gestures[i][5];
            var width = gestures[i][6];
            drawLine(x1, y1, x2, y2, col, width);
        }
        //disable display button
        document.getElementById("displayButton").disabled = true;
    }
}

function upload(){
    // experiment 1

             var imgName = document.getElementById("imgSelector").value
            console.log(document.getElementById("imgSelector"))
            console.log(gestures, gestureStrings)
        //(function (gestures, gestureStrings){
            // save to database
            myFirebaseRef.push({
                experiment: 3,
                image: imgName,
                gestures: gestures,
                desciption: gestureStrings
            });
            alert("Thanks for completing our experiment!")
            document.getElementById("uploadButton").disabled = true;
        //})(gestures, gestureStrings);
    
}

function startExperiment1(){
    if (current == "introduction"){
        // show experiment 1 instructions
        var imageURL = "images/" + 'instructions1' + ".jpg";
        document.getElementById("img").src = imageURL;
        current = "instructions1";
    } else{
        // show thumbnails
        var imageURL = "images/" + 'background' + ".jpg";
        document.getElementById("img").src = imageURL;
        document.getElementById("imageThumbs").style.visibility = 'visible';
        // remove next button
        document.getElementById("nextButton").remove();
    } 
}


function startExperiment2(){
    // remove start button
    document.getElementById("startButton").remove();
    // show side bar
    document.getElementById("sideBar").style.visibility = 'visible';

    if (exp1_image != "waldo"){
        showComplexImage();
    } else{
        showSimpleImage();
    }
}

function showComplexImage(){
    // complex image (waldo)
    exp2_image = comple_image;
    var imageURL = "images/" + comple_image + ".jpg";
    document.getElementById("img").src = imageURL;
    restart();
}

function showSimpleImage(){
    // simple image (landscape)
    exp2_image = simple_image;
    var imageURL = "images/" + simple_image + ".jpg";
    document.getElementById("img").src = imageURL;
    if (exp1_image == simple_image){
        endExperiment2();
    } else{
        restart();
    }
}

function endExperiment2(){
    document.getElementById("container").remove();
    var body = document.getElementsByTagName("body")[0];
    body.style.overflow = 'visible';
    body.innerHTML = '<center><iframe id="survey" src="https://docs.google.com/forms/d/1sMUEvdUJfnPY63zt-NS8_7J5vA602dedm8O9eKs_6wQ/viewform?entry.367668509=' + userID + '&entry.1622101868embedded=true" width="760" height="600" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe></center>';
}