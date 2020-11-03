function login() {

	var url = "./php/objects/UserTestLogin.php";
	// var request = new XMLHttpRequest();

	// request.onreadystatechange = function () {
	// 	if (request.readyState == 4 && request.status == 200) {
	// 		var status = request.responseText;

	// 		if (status == "Success") {
	// 		}
	// 	}
	// };
	
	// request.open("POST", url, true);
	// request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	// request.send(user);

	$.ajax({
		url: url,
		type: "POST",
		dataType: "text",
		data: {
			email: document.getElementById("email").value,
			password: document.getElementById("password").value
		},
	}).done(function (responseText) {
		if (responseText == "fail"){	
			document.getElementById("error_msg").setAttribute("style","display:block;");
			console.log(document.getElementById("error_msg").innerHTML);
		}
		else{
			window.location.href = responseText;
		}
	});
}	
