function register() {
	var user = {
		firstName: document.getElementById("inputFirstName").value,
		lastName: document.getElementById("inputLastName").value,
		email: document.getElementById("inputEmail").value,
		password: document.getElementById("inputPassword").value,
	};

	// (locID, locTitle, locAddress, locPostalCode, locDesc, recDuration, rating, imageUrl, createdBy)

	var data = JSON.stringify(user);
	var url = "../../php/objects/UserTest.php";
	var request = new XMLHttpRequest();

	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			var status = request.responseText;
			console.log("hello")
			console.log(status)
			if (status == "Success") {
				console.log(status + "SDADSAD")
				$("#registermodal").modal("show");
			}
		}
	};
	
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(data);
}	

