console.log(40);
if(navigator.userAgent.indexOf("Chrome") != -1) {
	console.log("CHROME");
} else if(navigator.userAgent.indexOf("Firefox") != -1) {
	console.log(5);
	var elements = document.getElementsByClassName("line");
	for (var i = 0; i < elements.length; i++) {
		console.log(elements[i]);
		elements[i].style.fontSize = "100%";
	}
} else if(navigator.userAgent.indexOf("Safari") != -1) {
	console.log("SAFARI");
} else if(navigator.userAgent.indexOf("Chrome") != -1) {
	console.log("OPERA");
} else if(navigator.userAgent.indexOf("MSIE") != -1) {
	console.log("MSIE")
}
