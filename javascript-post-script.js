// var serverUrl = "http://star.dragonstar.xyz/getData/getDataXML.php";
var serverUrl = "https://dragonstar.xyz/star/getData/getDataXML.php";
// var serverUrl = "http://localhost/getData/getDataXML.php";
function sendData2Server(_serverUrl, _data){
	var data = new FormData();
	// for( var i = 0; i < _data.length; i++){
	// 	var curData = _data[i];
	// 	data.append(curData.key, curData.data);
	// }
	data.append("email", _data[0]);
	data.append("pass", _data[1]);

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			console.log(this.responseText);
		}
	});

	xhr.open("POST", _serverUrl);
	// xhr.setRequestHeader("cache-control", "no-cache");

	xhr.send(data);
}
// sendData2Server(serverUrl, ['asdf', 'ghk']);
