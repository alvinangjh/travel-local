const apiKey = "2DeahNNW3hdNmHNNpsUFv0BH7mQeZm63"; //Hong Tao's API Auth Token

var url = "../../php/objects/userItinRetrieve.php";
var get_userID = sessionStorage.getItem("userID");
// var userID = sessionStorage.getItem("userID");
ajaxCall(url, display_itin_cards, "POST", { userID: get_userID }); //Call api, d

url = "../../php/objects/retrievePopItins.php";
ajaxCall(url, display_popular_cards);

url = "../../php/objects/userItinRecommendedDefault.php";
ajaxCall(url, display_recommended_cards, "POST", { userID: get_userID });

function redirect_to_poi(keyword) {
	window.location.href = "../search/search.html?keyword=" + keyword;
}

function onEvent(event) {
	if (event.key === "Enter") {
		// After user typed enter
		redirect_to_poi(document.getElementById("searching_poi").value, "all");
	}
}

function check_user() {
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

function ajaxCall(search, callback, method = "GET", value = null) {
	$.ajax({
		url: search,
		type: method,
		timeout: 500,
		dataType: "json",
		data: value,
		async: true,
		success: function (response) {
			// console.log(response);
			callback(response);
		},
		error: function (response) {
			console.log("error");
		},
	});
}

function display_itin_cards(itineraries) {
	if (itineraries.length == 0) {
		var itins_view = document.getElementById("my_itins");
		itins_view.innerHTML = `<div class="col-md-12 d-flex"><div class="alert alert-danger w-100" role="alert">
		You have no itineraries planned yet. Why not start planning one now by filling up the form above!
	  </div></div>`;
		itins_view.appendChild(new_card);
	} else {
		// console.log(itineraries);
		let startDate = null;
		var itins_view = document.getElementById("my_itins");
		itins_view.innerHTML = "";
		for (let i = 0; i < itineraries.length; i++) {
			startDate = itineraries[i].startDate.replaceAll("-", "/");
			endDate = itineraries[i].endDate.replaceAll("-", "/");
			var new_card = document.createElement("div");
			var itineraryType = capitalizeFirstLetter(itineraries[i].itineraryType);

			new_card.className = "col-lg-3 col-md-4 d-flex";
			new_card.innerHTML = `
                <div class="card mx-auto mb-5" style="width: 22rem;">
                    <img alt="Card image cap" id="itin+${itineraries[i].itineraryID}" class="card-img-top img-fluid" src="images/${itineraries[i].itineraryType}.jpg">
                    <button onClick="view_itin(${itineraries[i].itineraryID}, 'yes')" class="link_overlay">
                        <div class="card-img-overlay">
                            <h4 class="card-title">${itineraries[i].name}</h4>
                            <footer class="blockquote-footer">${startDate} - ${endDate} <br> ${itineraryType}</p>
                        </div>
                    </button>
                    <button type="button"  onclick="open_Modal(${itineraries[i].itineraryID})"  class="to_delete btn py-0 px-1"><i class="fas fa-trash"></i></button>
                </div>
            `;
			itins_view.appendChild(new_card);
		}
	}
}

function open_Modal(itin) {
	document.getElementById("confirm").id = itin;
	$("#exampleModalCenter").modal("show");
}

function view_itin(link, own) {
	window.location.href = "../itinerary_detail/itinerary_details.html?id=" + link + "&own=" + own;
}

function display_popular_cards(itineraries) {
	// console.log(itineraries);
	let startDate = null;
	let itins_view = document.getElementById("popular_itins");
	itins_view.innerHTML = "";
	for (let i = 0; i < itineraries.length; i++) {
		startDate = itineraries[i].startDate.replaceAll("-", "/");
		endDate = itineraries[i].endDate.replaceAll("-", "/");
		let new_card = document.createElement("div");
		new_card.className = "col-lg-3 col-md-4 d-flex";
		new_card.innerHTML = `
        <div class="card mx-auto mb-5" style="width: 22rem;">
            <img alt="Card image cap" id="itin+${itineraries[i].itineraryID}" class="card-img-top img-fluid" src="images/${
			itineraries[i].itineraryType
		}.jpg">
            <button onclick="view_itin(${itineraries[i].itineraryID}, 'no')" class="link_overlay">
                <div class="card-img-overlay">
                    <h4 class="card-title">${itineraries[i].name}</h4>
                    <footer class="blockquote-footer">${startDate} - ${endDate} <br> ${capitalizeFirstLetter(itineraries[i].itineraryType)}</p>
                    <p class="text-white bg-danger">Shared over ${itineraries[i].shared} times!<p>
                </div>
                
            </button>
        </div>
    `;
		itins_view.appendChild(new_card);
	}
}

function display_recommended_cards(itineraries) {
	if (itineraries.length == 0) {
		$("#Recommended").html("");
	} else {
		let itins_view = document.getElementById("recommended_itins");
		itins_view.innerHTML = "";
		for (let i = 0; i < itineraries.length; i++) {
			startDate = itineraries[i].startDate.replaceAll("-", "/");
			endDate = itineraries[i].endDate.replaceAll("-", "/");
			let new_card = document.createElement("div");
			new_card.className = "col-lg-3 col-md-4 d-flex";
			new_card.innerHTML = `
		  <div class="card mx-auto mb-5" style="width: 22rem;">
			  <img alt="Card image cap" id="itin+${itineraries[i].itineraryID}" class="card-img-top img-fluid" src="images/${itineraries[i].itineraryType}.jpg">
			  <button onClick="view_itin(${itineraries[i].itineraryID})" class="link_overlay">
				  <div class="card-img-overlay">
					  <h4 class="card-title">${itineraries[i].name}</h4>
					  <footer class="blockquote-footer">${startDate} - ${endDate} <br> ${capitalizeFirstLetter(itineraries[i].itineraryType)}</p>
				  </div>
			  </button>
		  </div>
	  `;
			itins_view.appendChild(new_card);
		}
	}
}

function delete_itin(id) {
	var itineraryID = { itineraryID: id };
	itineraryID = JSON.stringify(itineraryID);
	let url = "../../php/objects/itinDelete.php";
	ajaxCall(url, console.log, "POST", itineraryID);
	location.reload();
}

function add_itinerary() {
	var itinerary = {
		itinName: $("#itinName").val(),
		itinType: $("#itinType").val(),
		startDate: dateFormat($("#startDate").val()),
		endDate: dateFormat($("#endDate").val()),
		userID: sessionStorage.getItem("userID"),
	};
	// date receives in MM-DD-YYYY -> YYYY-MM-DD
	var data = JSON.stringify(itinerary);
	let url = "../../php/objects/itinCreate.php";
	ajaxCall(url, console.log, "POST", data);
	url = "../../php/objects/userItinRetrieve.php";
	var get_userID = 2;
	// var get_userID = sessionStorage.getItem("userID");
	ajaxCall(url, display_itin_cards, "POST", { userID: get_userID });
	location.reload();
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function dateFormat(date) {
	// console.log(date);
	let date_array = date.split("/");
	let new_date = [date_array[2], date_array[0], date_array[1]];
	return new_date.join("-");
}
