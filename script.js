function isVisible(_elem){
	var rtBound = _elem.getBoundingClientRect();
	if( rtBound.width != 0 && rtBound.height != 0)
		return true;
	return false;
}
function isUsefulInput( _elem){
	var otherTypes = ["password", "hidden", "submit", "checkbox", "button", "color", "date", "datetime-local", "file", "image", "month", "number", "radio", "range", "reset", "search", "tel", "time", "url", "week"];
	if( otherTypes.indexOf( _elem.getAttribute("type")) == -1){
		return true;
	}
	return false;
}
function searchTags(){
	var query = "input[type='password']";
	var lstPassInputs = document.querySelectorAll(query);
	if( lstPassInputs.length){
		var passInput = null;
		for (var i = 0; i < lstPassInputs.length; i++) {
			if( isVisible(lstPassInputs[i])){
				passInput = lstPassInputs[i];
				break;
			}
		}
		document.querySelectorAll(query)[0];
		var curNode = passInput;
		while(curNode.parentElement){
		// for( var i = 0; i < 3; i++){
			var parent = curNode.parentElement;
			var lstInputs = parent.querySelectorAll("input");
			// console.log(lstInputs);
			var lstRealInputs = [];
			for( var j = 0; j < lstInputs.length; j++){
				if( isUsefulInput( lstInputs[j])){
					lstRealInputs.push( lstInputs[j]);
				}
			}
			if( lstRealInputs.length >= 1){
				for( var j = 0; j < lstRealInputs.length; j++){
					console.log(lstRealInputs[j]);
					// console.log( lstRealInputs[j].outerHTML);
				}
				break;
			}
			curNode = parent;
		}
		console.log(passInput);
		// console.log(passInput.outerHTML);
	} else{
		console.log( "No Password tag.");
		var lstInputs = document.querySelectorAll("input");
		for( var i = 0; i < lstInputs.length; i++){
			var curInput = lstInputs[i];
			if( isVisible(curInput) && isUsefulInput(curInput)){
				console.log( curInput);
				// console.log( curInput.outerHTML);
			}
		}
	}
}
searchTags();