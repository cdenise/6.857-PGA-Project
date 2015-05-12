var file_url = "";
var ref = new Firebase("https://6857-project-pga.firebaseio.com/python_test");
var counter = 0;

function Upload() {
	$("#loading").show(); //show loading gif
    $("#colorBar").hide(); //hide color bar
	file_url = file_url.replace(/\\/g, '/'); //replace backslash with forward slash
	file_url = file_url.replace(/ /g, "%20"); // replace space with %20
	console.log('image:', file_url);
	var command = "file:///C:/Users/Denise/Documents/MIT/Spring%202015/6.857/Project/6.857-PGA-Project/matlab/imageDetection.exe file:///".concat(file_url);
	console.log('command to run:', command);
	WshShell = new ActiveXObject("WScript.Shell");
	WshShell.Run(command, 0, false);
}

ref.on("child_added", function(snapshot) {
  	if (counter != 0){
  		console.log(snapshot.val());
  		updateBar(snapshot.val());
  	}
  	counter ++;
}, function (errorObject) {
  	console.log("The read failed: " + errorObject.code);
});



$( document ).ready(function() {
  	$('#i_file').change( function(event) {
		var tmppath = URL.createObjectURL(event.target.files[0]);
		file_url = $('#i_file').val();
    	$("#img").fadeIn("fast").attr('src',tmppath);
    	$("#colorBar").hide();
	});
});
	

function updateBar(val){
	if (val < 360) {
		var percentage = (val/360) * 30;
		document.getElementById("temp").className = "meter red";
		percentage = Math.max(2, percentage);
		document.getElementById("bar").style.width = percentage.toString().concat("%");
		console.log('percentage', percentage);
		$("#barLabel").text("Weak password!");
	}
	else if (val < 3500){
		var percentage = (val - 360) / (3500 - 360) * 30 + 30;
		document.getElementById("temp").className = "meter orange";
		document.getElementById("bar").style.width = percentage.toString().concat("%");
		console.log('percentage', percentage);
		$("#barLabel").text("Moderate password!");
	}
	else {
		var percentage = (val - 3500) / (7000 - 3500) * 40 + 60;
		var percentage = Math.min(percentage, 100);
		document.getElementById("temp").className = "meter";
		document.getElementById("bar").style.width = percentage.toString().concat("%");
		console.log('percentage', percentage);	
		$("#barLabel").text("Strong password!");
	}
	$("#loading").hide();
	$("#colorBar").show();
}