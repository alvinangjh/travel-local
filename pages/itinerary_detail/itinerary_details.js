const apiKey = "jKNTmdblMsxZWS3mrwmxz7i5fujbBlZU";

/* Utilities */
Date.prototype.addDays = function (days) {
	var dat = new Date(this.valueOf());
	dat.setDate(dat.getDate() + days);
	return dat;
};

function changeTheme(clicked_id) {
	if (clicked_id == "nature") {
		document.getElementById("itineraryTheme").href = "itinerary_" + clicked_id + ".css";
		var icons = document.getElementsByClassName("navigationIcon");
		for (icon of icons) {
			icon.className = "icon navigationIcon fas fa-leaf";
		}
	} else if (clicked_id == "family") {
		document.getElementById("itineraryTheme").href = "itinerary_" + clicked_id + ".css";
		var icons = document.getElementsByClassName("navigationIcon");
		for (icon of icons) {
			icon.className = "icon navigationIcon fas fa-home";
		}
	} else if (clicked_id == "dating") {
		document.getElementById("itineraryTheme").href = "itinerary_" + clicked_id + ".css";
		var icons = document.getElementsByClassName("navigationIcon");
		for (icon of icons) {
			icon.className = "icon navigationIcon fas fa-heart";
		}
	}

	$("#exampleModal").modal("hide");
}

function getDates(startDate, stopDate) {
	var dateArray = new Array();
	var currentDate = startDate;
	while (currentDate <= stopDate) {
		dateArray.push(currentDate);
		currentDate = currentDate.addDays(1);
	}
	return dateArray;
}

/* Retrieve all activities under the same itinerary */
function retrieveActivity() {
	//remember to change to dynamic itineraryID
	var itineraryID = "1";
	var activities = [];
	var baseUrl = "../../php/objects/activityRetrieve.php";

	$.ajax({
		url: baseUrl,
		type: "POST",
		dataType: "json",
		data: { itinerary_id: itineraryID },
	}).done(function (responseText) {
		var data = responseText;

		var sorted = data.sort((a, b) => {
			return a.startTime.localeCompare(b.startTime);
		});

		for (item of sorted) {
			var activity = {
				activityID: item.activityID,
				poiUUID: item.poiUUID,
				startTime: item.startTime,
				endTime: item.endTime,
				activityDate: item.activityDate,
			};

			activities.push(activity);
		}

		generateDay(activities);
	});
}

function generateDay(activities) {
	//remember to change to dynamic itineraryID
	var itineraryID = "10";
	var baseUrl = "../../php/objects/itineraryRetrieve.php";

	$.ajax({
		url: baseUrl,
		type: "POST",
		dataType: "json",
		data: { itinerary_id: itineraryID },
	}).done(function (responseText) {
		var result = responseText;

		document.getElementById("itinerary_name").innerText = result[0].name;
		document.getElementById("itinerary_date").innerText = result[0].startDate + " - " + result[0].endDate;

		var dateArray = getDates(new Date(result[0].startDate), new Date(result[0].endDate));

		for (var i = 0; i < dateArray.length; i++) {
			var formattedDate = moment(dateArray[i]).format("DD-MM-YYYY");
			var itineraryDays = document.getElementById("itinerary_days");

			//dating: heart
			//family: home
			//nature: leaf
			itineraryDays.innerHTML += `<h5 class="text-center"><a class="dayLink" href="#${formattedDate}"><i class="icon navigationIcon fas fa-leaf"></i> 
			Day ${i + 1}</a></h5>`;
		}

		populateItinerary(activities, result[0].startDate, result[0].endDate);
	});
}

function populateItinerary(activities, startDate, endDate) {
	var str = "";

	var dateArray = getDates(new Date(startDate), new Date(endDate));

	for (var i = 0; i < dateArray.length; i++) {
		var entrySection = document.getElementById("entry_section");
		var formattedDate = moment(dateArray[i]).format("DD-MM-YYYY");
		let str = `<div id="${formattedDate}" class="mb-2"><div class="dailyDiv shadow p-2 mb-0">
		<h3 class="text-center">Day ${i + 1}</h3></div></div>`;
		entrySection.innerHTML += str;
	}

	for (var i = 0; i < activities.length; i++) {
		(function (i) {
			setTimeout(function () {
				var baseUrl = "https://tih-api.stb.gov.sg/content/v1/attractions";
				var finalUrl = baseUrl + "?uuid=" + activities[i].poiUUID + "&apikey=" + apiKey;
				$.ajax({
					url: finalUrl,
					type: "GET",
					success: function (responseText) {
						var data = responseText;

						var dirUrl =
							"https://www.google.com/maps/dir/?api=1&destination=" +
							data.data[0].location.latitude +
							"," +
							data.data[0].location.longitude;

						var imageUUID = data.data[0].images[0].uuid;
						var imageUrl = "";

						callImage(imageUUID, function (url) {
							imageUrl = url;
						});

						var startTime = moment(activities[i].startTime, "HH:mm:ss A").format("hh:mm A");
						var endTime = moment(activities[i].endTime, "HH:mm:ss A").format("hh:mm A");

						var openingHour = "N/A";
						var closingHour = "N/A";

						if (data.data[0].businessHour[0]["openTime"] != "") {
							openingHour = moment(data.data[0].businessHour[0]["openTime"], "HH:mm").format("hh:mm A");
						}

						if (data.data[0].businessHour[0]["closeTime"] != "") {
							closingHour = moment(data.data[0].businessHour[0]["closeTime"], "HH:mm").format("hh:mm A");
						}

						var ms = moment(endTime, "hh:mm A").diff(moment(startTime, "hh:mm A"));
						var d = moment.duration(ms);
						var hours = parseInt(d.asHours());
						var minutes = parseInt(d.asMinutes()) % 60;
						var totalDuration = "";

						if (hours != 0) {
							totalDuration = hours + " hrs " + minutes + " mins";
						} else {
							totalDuration = minutes + " mins";
						}

						str = `
						<div class="card mb-2 rounded-0" >
							<div class="row no-gutters">
								<div class="col-md-2 text-center my-auto">
										<h5>${totalDuration}</h5>
										<p id="${activities[i].activityID}" class="itineraryTime"><medium class="text-muted">${startTime} - ${endTime}</medium></p>
								</div>
	
								<div class="col-md-4 my-auto">
										<img src="${imageUrl}" class="card-img" width="478px"/>
								</div>
	
								<div class="col-md-6">
									<div class="card-body">
										<h5 id="poiTitle" class="card-title">${data.data[0].name}</h5>
										<p class="card-text mb-2">
											<p class="mb-1"><medium class="text-muted"><i class="far fa-clock"></i> Opening Hours: ${openingHour} - ${closingHour}</medium></p>
											<p class="mb-0"><medium class="text-muted"><i class="fas fa-car"></i><a href="${dirUrl}" target="_blank"> How to get to there?</a></medium></p>
										</p>
										<p class="card-text text-justify">
											${data.data[0].description}
										</p>
	
										<button class="btn btn-outline-secondary" style="width: 100px;" id="activity${activities[i].activityID}" data-toggle="modal" data-target="#activityModal${activities[i].activityID}">Change</button>
										<button class="btn btn-outline-danger"style="width: 100px;" id="remove${activities[i].activityID}" data-toggle="modal" data-target="#removeModal${activities[i].activityID}">Remove</button>
										
									</div>
								</div>
							</div>
	
							<div class="modal fade" id="activityModal${activities[i].activityID}" tabindex="-1" role="dialog">
								<div class="modal-dialog" role="document">
									<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title" id="lblActivityModal${activities[i].activityID}">${data.data[0].name}</h5>
										<button type="button" class="close" data-dismiss="modal">
										<span>&times;</span>
										</button>
									</div>
									<div class="modal-body">
										<div class="form-row">
											<div class="form-group col-md-12">
												<label for="ddlDate${activities[i].activityID}">Date of Activity</label>
												<select class="form-control" id="ddlDate${activities[i].activityID}">
												</select>
											</div>
											<div class="form-group col-md-6">
												<label for="tbActivity${activities[i].activityID}">Start Time</label>
												<input id="tbStartTime${activities[i].activityID}" type="time" class="form-control" value=${activities[i].startTime} />
											</div>
											<div class="form-group col-md-6">
												<label for="tbActivity${activities[i].activityID}">End Time</label>
												<input id="tbEndTime${activities[i].activityID}" type="time" class="form-control" value=${activities[i].endTime} />
											</div>
											<div class="form-group col-md-12">
												<div id="conflictAlert${activities[i].activityID}" class="alert alert-danger mb-0" role="alert" style="display: none;">
													Your start/end time conflict with your existing itinerary!
												</div>
											</div>
										</div>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="deleteActivity(${activities[i].activityID})">Close</button>
										<button type="button" class="btn btn-primary" onclick="editActivity(${activities[i].activityID})">Confirm changes</button>
									</div>
									</div>
								</div>
							</div>

							<div class="modal fade" id="removeModal${activities[i].activityID}" tabindex="-1">
								<div class="modal-dialog">
									<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title" id="lblRemoveModal${activities[i].activityID}">Delete Activity</h5>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
										Are you sure? This action cannot be undone.
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
										<button type="button" class="btn btn-danger">Confirm Delete</button>
									</div>
									</div>
								</div>
							</div>
						</div>
						
						<!-- <div class="bg-white text-dark mt-1 mb-1">
							<div class="pl-5">
								<a href="${dirUrl}" class="mt-2"><medium>How to get to ${data.data[0].name}?</medium></a>
							</div>
						</div> -->`;

						document.getElementById(
							moment(activities[i].activityDate).format("DD-MM-YYYY")
						).innerHTML += str;

						var select = document.getElementById("ddlDate" + activities[i].activityID);

						for (var j = 0; j < dateArray.length; j++) {
							var formattedDate = moment(dateArray[j]).format("DD MMM YYYY");
							var otherFormatDate = moment(dateArray[j]).format("YYYY-MM-DD");

							var elem = document.createElement("option");
							elem.textContent = formattedDate;
							elem.value = otherFormatDate;
							select.appendChild(elem);

							if (otherFormatDate == activities[i].activityDate) {
								elem.selected = true;
							}
						}
					},
				});
			}, 0000);
		})(i);
	}
}

function callImage(imageUUID, callback) {
	var base_url = "https://tih-api.stb.gov.sg/media/v1/image/uuid/";
	var final_url = base_url + imageUUID + "?apikey=" + apiKey;

	var request = new XMLHttpRequest();

	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			var data = JSON.parse(request.responseText);
			var imageUrl = data.data.url;

			if (callback) {
				callback(imageUrl + "?apikey=" + apiKey);
			}
		}
	};

	request.open("GET", final_url, false);
	request.send();
}

function editActivity(clicked_id) {
	var baseUrl = "../../php/objects/activityUpdate.php";
	var ddlDate = document.getElementById("ddlDate" + clicked_id);

	$.ajax({
		url: baseUrl,
		type: "POST",
		dataType: "json",
		data: {
			activityID: clicked_id,
			activityDate: ddlDate.options[ddlDate.selectedIndex].value,
			startTime: document.getElementById("tbStartTime" + clicked_id).value,
			endTime: document.getElementById("tbEndTime" + clicked_id).value,
		},
	}).done(function (responseText) {
		if (responseText == 1) {
			window.location.reload();
		}
	});
}

function deleteActivity(clicked_id) {
	var baseUrl = "../../php/objects/activityDelete.php";

	$.ajax({
		url: baseUrl,
		type: "POST",
		data: { activityID: clicked_id },
	}).done(function (responseText) {
		if (responseText == 1) {
			window.location.reload();
		}
	});
}

function display() {
	$("#ddlSetting").dropdown("toggle");
	window.print();
}
