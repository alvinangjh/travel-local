$(document).ready(function () {
	var today_date = new Date();

	$(function () {
		$("#start_date").datepicker({
			dateFormat: "dd/mm/yy",
			minDate: today_date,
			onSelect: function (selected) {
				$("#end_date").datepicker("option", "minDate", selected);
			},
		});
	});

	$(function () {
		$("#end_date").datepicker({
			dateFormat: "dd/mm/yy",
			minDate: today_date,
			onSelect: function (selected) {
				$("#start_date").datepicker("option", "maxDate", selected);
			},
		});
	});
});

function insert_itinerary() {
	var itinerary = {
		itineraryID: "",
		name: $("#itinerary_name").val(),
		startDate: $("#start_date").val(),
		endDate: $("#end_date").val(),
		userID: 1,
	};

	console.log($("#itinerary_name").val());
	console.log($("#start_date").val() + ", " + $("#end_date").val());

	var data = JSON.stringify(itinerary);
	var url = "../../php/objects/itineraryInsert.php";

	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(data);

	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			var status = request.responseText;

			if (status == "Success") {
				console.log(request.responseText);
			}
		}
	};
}

function edit_itinerary() {

	var itinerary = {
		itineraryID: 9,
		name: "test",
		startDate: $("#start_date").val(),
		endDate: $("#end_date").val(),
		userID: 1,
	};

	var data = JSON.stringify(itinerary);
	var url = "../../php/objects/itineraryUpdate.php";

	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(data);

	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			var status = request.responseText;

			if (status == "Success") {
				console.log(request.responseText);
			}
		}
	};
}

function delete_itinerary() {

	var itinerary = {
		itineraryID: 9,
		name: "test",
		startDate: $("#start_date").val(),
		endDate: $("#end_date").val(),
		userID: 1,
	};

	var data = JSON.stringify(itinerary);
	var url = "../../php/objects/itineraryDelete.php";

	var request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send(data);

	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			var status = request.responseText;

			if (status == "Success") {
				console.log(request.responseText);
			}
		}
	};
}

