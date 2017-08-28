window.onscroll = function() {
	var divTop = document.getElementById("back_top");
	if (document.documentElement.scrollTop + document.body.scrollTop > 500) {
		divTop.style.display = "block";
	} else {
		divTop.style.display = "none";
	}
}