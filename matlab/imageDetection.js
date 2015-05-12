file_url = "";

function Upload() {
	file_url = file_url.replace(/\\/g, '/');
	file_url = file_url.replace(/ /g, "%20");
	console.log('image:', file_url);
	//var command = "file:///C:/Users/Denise/Documents/MIT/Spring%202015/6.857/Project/6.857-PGA-Project/matlab/imageDetection.exe file:///".concat(file_url);
	var command = "file:///C:/Users/Clare/Desktop/6.857/6.857-PGA-Project/matlab/imageDetection.exe file:///".concat(file_url);
	console.log('command to run:', command);
	WshShell = new ActiveXObject("WScript.Shell");
	WshShell.Run(command, 1, false);
	//readTextFile("file:///C:/Users/Clare/Desktop/numRegions.txt");
	readTextFile("numRegions.txt")
}

function getResults(){
	/*try {
		console.log('a');
		var reader = new FileReader();
		console.log('b');
	    reader.onload = function() {
	    	console.log('c');
	      	reader.abort();
	    };
	    console.log('d');

	    console.log('e');

	    console.log(reader.readAsText("file:///C:/Users/Clare/Desktop/numRegions.txt"));
	    console.log('f');
	}
	catch(e) {
		setTimeout(function(){getResults()},1000);
	}
	console.log('done');*/

}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}



$( document ).ready(function() {
  	$('#i_file').change( function(event) {
		var tmppath = URL.createObjectURL(event.target.files[0]);
		file_url = $('#i_file').val();
		console.log(tmppath);
    	$("#img").fadeIn("fast").attr('src',tmppath);
	});


});