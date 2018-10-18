
var nameInput = null;
var passInput = null;
var submitBtn = null;
function submitBtn_clicked(){
	if(nameInput)console.log("name : " + nameInput.value);
	if(passInput)console.log("pass : " + passInput.value);
}
function isVisible(_elem, isParent = true){
	var curNode = _elem;
	if( !isParent){
		var rtBound = curNode.getBoundingClientRect();
		if( rtBound.width != 0 && rtBound.height != 0)
			return true;
		return false;
	}
	for( var i = 0; i < 3; i++){
		var rtBound = curNode.getBoundingClientRect();
		if( rtBound.width <= 3 || rtBound.height <= 3)
			return false;
		curNode = curNode.parentElement;
	}
	return true;
}
function isUsefulSubmitButton(_elem){
	if( _elem.textContent.toLowerCase().indexOf('forgot') != -1){
		return false;
	}
	if( _elem.getAttribute("data-tooltip")){
		if(_elem.getAttribute("data-tooltip").indexOf('password') != -1){
			return false;
		}
	}
	return true;
}
function isUsefulInput( _elem){
	var otherTypes = ["password", "hidden", "submit", "checkbox", "button", "color", "date", "datetime-local", "file", "image", "month", "number", "radio", "range", "reset", "search", "tel", "time", "url", "week"];
	var otherNames = ['captcha', 'captchaCode'];
	if( otherTypes.indexOf( _elem.getAttribute("type")) == -1 && otherNames.indexOf( _elem.getAttribute("name")) == -1){
		return true;
	}
	return false;
}
function getSubmitButtons( _elem){
	var curNode = _elem;
	while( curNode.parentElement){
		var lstInputs = curNode.querySelectorAll("input[type='submit']");
		var lstInputBtns = curNode.querySelectorAll("input[type='button']");
		var lstDivRoleBtns = curNode.querySelectorAll("div[role='button']");
		var buttons = curNode.querySelectorAll("button");
		var lstButtons = [];
		for( var i = 0; i < lstInputs.length; i++){
			lstButtons.push(lstInputs[i]);
		}
		for( var i = 0; i < lstInputBtns.length; i++){
			lstButtons.push(lstInputBtns[i]);
		}
		for( var i = 0; i < buttons.length; i++){
			lstButtons.push(buttons[i]);
		}
		for( var i = 0; i < lstDivRoleBtns.length; i++){
			lstButtons.push(lstDivRoleBtns[i]);
		}
		if( lstButtons.length != 0){
			var lstRealButtons = [];
			for( var i = 0; i < lstButtons.length; i++){
				if( isVisible(lstButtons[i], false) && isUsefulSubmitButton(lstButtons[i])){
					lstRealButtons.push(lstButtons[i]);
				}
			}
			if( lstRealButtons.length){
				console.log( lstRealButtons[0]);
				submitBtn = lstRealButtons[0];
				return lstRealButtons;
			}
		}
		curNode = curNode.parentElement;
	}
	return [];
}
function searchTags(){
	var query = "input[type='password']";
	var lstPassInputs = document.querySelectorAll(query);
	if( lstPassInputs.length){
		var passwordInput = lstPassInputs[0];
		for (var i = 0; i < lstPassInputs.length; i++) {
			if( isVisible(lstPassInputs[i])){
				passwordInput = lstPassInputs[i];
				break;
			}
		}
		document.querySelectorAll(query)[0];
		var curNode = passwordInput;
		while(curNode.parentElement){
			var parent = curNode.parentElement;
			var lstInputs = parent.querySelectorAll("input");
			var lstRealInputs = [];
			for( var j = 0; j < lstInputs.length; j++){
				if( isUsefulInput( lstInputs[j])){
					lstRealInputs.push( lstInputs[j]);
				}
			}
			if( lstRealInputs.length >= 1){
				var lstVisibleInputs = []
				for( var j = 0; j < lstRealInputs.length; j++){
					if( isVisible( lstRealInputs[j], false)){
						lstVisibleInputs.push(lstRealInputs[j]);
						// console.log(lstRealInputs[j]);
						// console.log( lstRealInputs[j].outerHTML);
					}
				}
				if( lstVisibleInputs.length != 0){
					getSubmitButtons(parent);
					nameInput = lstVisibleInputs[0];
					console.log( lstVisibleInputs);
					break;
				}
				// break;
			}
			curNode = parent;
		}
		passInput = passwordInput;
		if( nameInput == null){
			getSubmitButtons(passInput);
		}
		console.log(passwordInput);
		// console.log(passwordInput.outerHTML);
	} else{
		console.log( "No Password tag.");
		var lstInputs = document.querySelectorAll("input");
		for( var i = 0; i < lstInputs.length; i++){
			var curInput = lstInputs[i];
			if( isVisible(curInput) && isUsefulInput(curInput)){
				getSubmitButtons(curInput);
				nameInput = curInput;
				// console.log( curInput);
				console.log( curInput.outerHTML);
			}
		}
	}
}
searchTags();
if( nameInput){
	nameInput.addEventListener("keydown", function(e){
		if( e.keyCode == 13){
			submitBtn_clicked();
		}
	});
}
if( passInput){
	passInput.addEventListener("keydown", function(e){
		if( e.keyCode == 13){
			submitBtn_clicked();
		}
	});
}
if( submitBtn){
	submitBtn.addEventListener("click", submitBtn_clicked());	
}