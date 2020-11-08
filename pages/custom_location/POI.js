/*  ==========================================
    SHOW UPLOADED IMAGE
* ========================================== */

var loadFile = function (event) {
	var image = document.getElementById("output");
	image.src = URL.createObjectURL(event.target.files[0]);
};

function fillAddress() {
	var searchval = document.getElementById("locPostalCode").value;
	console.log(searchval);
	if (searchval.length == 0) {
		document.getElementById("locAddress").value = "";
	}

	// Step 1
	var request = new XMLHttpRequest();

	// Step 2
	// Register function
	request.onreadystatechange = function () {
		// Step 5
		if (request.readyState == 4 && request.status == 200) {
			// Response is ready
			//console.log(request.responseText);

			// Convert API response to JavaScript JSON object
			var json_obj = JSON.parse(request.responseText);

			// Call HELPER function to retrieve Postal Code
			var address = json_obj.results;

			document.getElementById("locAddress").value = address[0]["ADDRESS"];
			document.getElementById("lat").value = address[0]["LATITUDE"];
			document.getElementById("lon").value = address[0]["LONGITUDE"];
		}
	};

	// Step 3
	var base_url = "https://developers.onemap.sg/commonapi/search";
	var final_url = base_url + "?searchVal=" + searchval + "&returnGeom=Y&getAddrDetails=Y&pageNum=1";
	request.open("GET", final_url, true);

	// Step 4
	request.send();
}

function EnableDisableTextBox(addressChkBox) {
	// var txtPassportNumber = document.getElementById("locAddress");
	// txtPassportNumber.readonly = addressChkBox.checked ? false : true;
	// if (!txtPassportNumber.readonly) {
	// 	txtPassportNumber.focus();
	// }

	if (addressChkBox.checked == true) {
		$("#locAddress").attr("readonly", false);
	} else {
		$("#locAddress").attr("readonly", true);
	}
}

function insert_poi() {
	// var location = {
	// 	locTitle: $("#locTitle").val(),
	// 	locAddress: $("#locAddress").val(),
	// 	locPostalCode: $("#locPostalCode").val(),
	// 	locDesc: $("#locDesc").val(),
	// 	recDuration: $("#recDuration").val(),
	// 	imageUrl: $("#imageUrl").val(),
	// 	rating: $('input[name="rate"]:checked').val(),
	// 	latitude: $("#lat").val(),
	// 	longitude: $("#lon").val(),
	// 	venueType: $("#venueType").val(),
	// 	businessContact: $("#businessContact").val(),
	// 	businessEmail: $("#businessEmail").val(),
	// 	businessHrs: $("#businessHrs").val(),
	// 	businessWeb: $("#businessWeb").val(),
	// };

	// (locID, locTitle, locAddress, locPostalCode, locDesc, recDuration, rating, imageUrl, createdBy)

	// var data = JSON.stringify(location);

	var url = "../../php/objects/locationTest.php";

	$.ajax({
		url: url,
		type: "POST",
		data: {
			locTitle: $("#locTitle").val(),
			locAddress: $("#locAddress").val(),
			locPostalCode: $("#locPostalCode").val(),
			locDesc: $("#locDesc").val(),
			recDuration: $("#recDuration").val(),
			imageUrl: $("#imageUrl").val(),
			rating: $('input[name="rate"]:checked').val(),
			latitude: $("#lat").val(),
			longitude: $("#lon").val(),
			venueType: $("#venueType").val(),
			businessContact: $("#businessContact").val(),
			businessEmail: $("#businessEmail").val(),
			businessHrs: $("#businessHrs").val(),
			businessWeb: $("#businessWeb").val(),
		},
	}).done(function (responseText) {
		if (responseText == "Success") {
			$("#successModal").modal("show");
		}
	});

	// var request = new XMLHttpRequest();

	// request.onreadystatechange = function () {
	// 	if (request.readyState == 4 && request.status == 200) {
	// 		var status = request.responseText;

	// 		if (status == "Success") {
	// 		}
	// 	}
	// };

	// request.open("POST", url);
	// request.send(data);
}

function redirect_to_poi(keyword) {
	window.location.href = "../search/search_poi.html?keyword=" + keyword;
}

function onEvent(event) {
	if (event.key === "Enter") {
		// After user typed enter
		poi_page_html(document.getElementById("searching_poi").value, "all");
	}
}

function checkUser() {
	if (sessionStorage.getItem("userID") === null) {
		window.location.href = "../user/user_login.html";
	} else {
		document.getElementById("signOutDiv").setAttribute("style", "display:block;");
		document.getElementById("signUpDiv").setAttribute("style", "display:none;");
	}
}

function logOut() {
	window.location.href = "../user/user_login.html";
	sessionStorage.clear();
}

// var counter = 0;
// function addcard(){
//     counter += 1;
//     html_str = `
//     <div class="card mx-5 mt-5 mb-3 p-0" style="max-width: auto;">
//         <div class="row no-gutters">

//             <div class="col-sm-5 align-self-center text-center">
//                 <p><img id="output" width="90%" height="90%" class="p-2;" style="z-index:1"/></p>
//                 <p width="auto"><input type="file"  accept="image/*" name="image" id="file" onchange="loadFile(event)"></p>
//                 <label for="upload" style="cursor: pointer;" class="font-weight-light text-muted"></label>
//             </div>

//             <div class="card-body col-sm-7 p-2">
//                 <form id="place">

//                     <h3>Title</h3>

//                     <div class="form-group postal">
//                         <label for="inputZip">Postal Code</label>
//                         <input type="text" id="postal${counter}" class="form-control" placeholder="E.g. 819663" oninput="fillAddress()">
//                     </div>

//                     <div class="form-group address">
//                         <label for="inputAddress">Address</label>
//                         <input type="text" id="address${counter}" class="form-control" placeholder="E.g. 65 AIRPORT BOULEVARD CHANGI AIRPORT BUS TERMINAL 3">
//                     </div>

//                     <div class="form-group">
//                         <label for="inputAddress">Recommended Duration</label>
//                         <input type="text" id="hours" class="form-control" name="hours" placeholder="E.g. 1hours">
//                     </div>

//                     <div class="form-group">
//                         <label for="exampleFormControlTextarea1">Share Your Experience!</label>
//                         <textarea class="form-control" id="experience" rows="3"></textarea>
//                     </div>

//                     <div class="rate">
//                         Overall Experience:
//                         <input type = "radio" id="rate5" name="rate" value="5">
//                         <label for = "rate5"></label>
//                         <input type = "radio" id="rate4" name="rate" value="4">
//                         <label for = "rate4"></label>
//                         <input type = "radio" id="rate3" name="rate" value="3">
//                         <label for = "rate3"></label>
//                         <input type = "radio" id="rate2" name="rate" value="2">
//                         <label for = "rate2"></label>
//                         <input type = "radio" id="rate1" name="rate" value="1">
//                         <label for = "rate1"></label>
//                     </div>

//                     <div class="submission">
//                         <br><br>
//                         <input type="Submit" value="Save and Exit">
//                         <input type="Submit" value="Publish">
//                     </div>

//                 </form>
//             </div>
//         </div>
//       </div>`

//       const div = document.getElementById("card_container");
//       div.insertAdjacentHTML('beforeend', html_str);;
// }
