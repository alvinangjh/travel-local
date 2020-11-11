const apiKey = "jKNTmdblMsxZWS3mrwmxz7i5fujbBlZU";

/* Utilities */
Date.prototype.addDays = function (days) {
	var dat = new Date(this.valueOf());
	dat.setDate(dat.getDate() + days);
	return dat;
};

function getDates(startDate, stopDate) {
	var dateArray = new Array();
	var currentDate = startDate;
	while (currentDate <= stopDate) {
		dateArray.push(currentDate);
		currentDate = currentDate.addDays(1);
	}
	return dateArray;
}

function changeTheme() {
	var clicked_id = $("input:radio[name=rdBtnTheme]:checked").val();
	var baseUrl = "../../php/objects/itineraryThemeUpdate.php";
	var itineraryID = new URL(window.location.href).searchParams.get("id");

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
	} else if (clicked_id == "romantic") {
		document.getElementById("itineraryTheme").href = "itinerary_" + clicked_id + ".css";
		var icons = document.getElementsByClassName("navigationIcon");
		for (icon of icons) {
			icon.className = "icon navigationIcon fas fa-heart";
		}
	} else if (clicked_id == "casual") {
		document.getElementById("itineraryTheme").href = "itinerary_" + clicked_id + ".css";
		var icons = document.getElementsByClassName("navigationIcon");
		for (icon of icons) {
			icon.className = "icon navigationIcon fas fa-shoe-prints";
		}
	}

	$.ajax({
		url: baseUrl,
		type: "POST",
		data: { itinerary_id: itineraryID, itinerary_theme: clicked_id },
	}).done(function (responseText) {
		$("#themeModal").modal("hide");
	});
}

// function changeTheme(clicked_id) {
// 	if (clicked_id == "nature") {
// 		console.log(clicked_id);
// 		document.getElementById("itineraryTheme").href = "itinerary_" + clicked_id + ".css";
// 		var icons = document.getElementsByClassName("navigationIcon");
// 		for (icon of icons) {
// 			icon.className = "icon navigationIcon fas fa-leaf";
// 		}
// 	} else if (clicked_id == "family") {
// 		console.log(clicked_id);
// 		document.getElementById("itineraryTheme").href = "itinerary_" + clicked_id + ".css";
// 		var icons = document.getElementsByClassName("navigationIcon");
// 		for (icon of icons) {
// 			icon.className = "icon navigationIcon fas fa-home";
// 		}
// 	} else if (clicked_id == "romantic") {
// 		console.log(clicked_id);
// 		document.getElementById("itineraryTheme").href = "itinerary_" + clicked_id + ".css";
// 		var icons = document.getElementsByClassName("navigationIcon");
// 		for (icon of icons) {
// 			icon.className = "icon navigationIcon fas fa-heart";
// 		}
// 	}

// 	$("#themeModal").modal("hide");
// }

/* Retrieve all activities under the same itinerary */
function retrieveActivity() {
	check_user();

	//remember to change to dynamic itineraryID
	var itineraryID = new URL(window.location.href).searchParams.get("id");
	var ownParam = new URL(window.location.href).searchParams.get("own");
	var baseUrl = "../../php/objects/itineraryCopy.php";

	if (ownParam.toLowerCase() != "yes") {
		$("#btnCopy").attr("style", "display:''");
	} else {
		$("#btnCopy").attr("style", "display:none");
	}

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
				locType: item.locType,
			};

			activities.push(activity);
		}

		generateDay(itineraryID, activities);
	});
}

function generateDay(itineraryID, activities) {
	//remember to change to dynamic itineraryID
	var itineraryID = itineraryID;
	var baseUrl = "../../php/objects/itineraryRetrieve.php";

	$.ajax({
		url: baseUrl,
		type: "POST",
		dataType: "json",
		data: { itinerary_id: itineraryID },
	}).done(function (responseText) {
		var result = responseText;

		document.getElementById("rdBtn" + result[0].itineraryType.charAt(0).toUpperCase() + result[0].itineraryType.slice(1)).checked = true;

		document.getElementById("siteHeader").innerText = result[0].name;
		document.getElementById("itineraryTheme").href = "itinerary_" + result[0].itineraryType.toLowerCase() + ".css";
		document.getElementById(
			"itinerary_name"
		).innerHTML = `${result[0].name} <button class="btn btn-lg p-0" data-toggle="modal" data-target="#editItineraryModal"><i class="icon fas fa-edit pb-2" style="height: 100%"></i></button>`;
		$("#tbItineraryTitle").val(result[0].name);
		document.getElementById("itinerary_date").innerText = result[0].startDate + " - " + result[0].endDate;

		var dateArray = getDates(new Date(result[0].startDate), new Date(result[0].endDate));

		for (var i = 0; i < dateArray.length; i++) {
			var formattedDate = moment(dateArray[i]).format("DD-MM-YYYY");
			var itineraryDays = document.getElementById("itinerary_days");

			//dating: heart
			//family: home
			//nature: leaf
			if (result[0].itineraryType.toLowerCase() == "romantic") {
				itineraryDays.innerHTML += `<h5 class="text-center"><a class="dayLink" href="#${formattedDate}"><i class="icon navigationIcon fas fa-heart"></i> 
			Day ${i + 1}</a></h5>`;
			} else if (result[0].itineraryType.toLowerCase() == "family") {
				itineraryDays.innerHTML += `<h5 class="text-center"><a class="dayLink" href="#${formattedDate}"><i class="icon navigationIcon fas fa-home"></i> 
			Day ${i + 1}</a></h5>`;
			} else if (result[0].itineraryType.toLowerCase() == "nature") {
				itineraryDays.innerHTML += `<h5 class="text-center"><a class="dayLink" href="#${formattedDate}"><i class="icon navigationIcon fas fa-leaf"></i> 
			Day ${i + 1}</a></h5>`;
			} else if (result[0].itineraryType.toLowerCase() == "casual") {
				itineraryDays.innerHTML += `<h5 class="text-center"><a class="dayLink" href="#${formattedDate}"><i class="icon navigationIcon fas fa-shoe-prints"></i> 
			Day ${i + 1}</a></h5>`;
			}
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
			if (activities[i].locType == "HG") {
				setTimeout(function () {
					var baseUrl = "../../php/objects/locationRetrieve.php";

					$.ajax({
						url: baseUrl,
						type: "POST",
						data: { location_id: activities[i].poiUUID },
						success: function (responseText) {
							var data = JSON.parse(responseText);

							var dirUrl = "https://www.google.com/maps/dir/?api=1&destination=" + data[0]["latitude"] + "," + data[0]["longitude"];

							var imageUrl = data[0]["imageUrl"];

							var startTime = moment(activities[i].startTime, "HH:mm:ss A").format("hh:mm A");
							var endTime = moment(activities[i].endTime, "HH:mm:ss A").format("hh:mm A");

							var openingHour = "N/A";
							var closingHour = "N/A";

							if (data[0]["startTime"] != "") {
								openingHour = moment(data[0]["startTime"], "HH:mm").format("hh:mm A");
							}

							if (data[0]["endTime"] != "") {
								closingHour = moment(data[0]["endTime"], "HH:mm").format("hh:mm A");
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
											<h5 id="poiTitle" class="card-title">${data[0]["locTitle"]}</h5>
											<p class="card-text mb-2">
												<p class="mb-1"><medium class="text-muted"><i class="far fa-clock"></i> Opening Hours: ${openingHour} - ${closingHour}</medium></p>
												<p class="mb-0"><medium class="text-muted"><i class="fas fa-car"></i><a href="${dirUrl}" target="_blank"> How to get to there?</a></medium></p>
											</p>
											<p class="card-text text-justify">
											${data[0]["locDesc"]}
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
											<h5 class="modal-title" id="lblActivityModal${activities[i].activityID}">${data[0]["locTitle"]}</h5>
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
													<input id="tbStartTime${activities[i].activityID}" type="text" class="form-control" value=${activities[i].startTime} />
												</div>
												<div class="form-group col-md-6">
													<label for="tbActivity${activities[i].activityID}">End Time</label>
													<input id="tbEndTime${activities[i].activityID}" type="text" class="form-control" value=${activities[i].endTime} />
												</div>
												<!-- <div class="form-group col-md-12">
													<div id="conflictAlert${activities[i].activityID}" class="alert alert-danger mb-0" role="alert" style="display: none;">
														Your start/end time conflict with your existing itinerary!
													</div>
												</div> -->
											</div>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
											<button type="button" class="btn btn-danger" onclick="editActivity(${activities[i].activityID})">Save Changes</button>
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
											<button type="button" class="btn btn-danger" onclick="deleteActivity(${activities[i].activityID})">Confirm Delete</button>
										</div>
										</div>
									</div>
								</div>
							</div>

							<!-- <div class="bg-white text-dark mt-1 mb-1">
								<div class="pl-5">
									<a href="${dirUrl}" class="mt-2"><medium>How to get to ${data[0].locTitle}?</medium></a>
								</div>
							</div> -->`;

							document.getElementById(moment(activities[i].activityDate).format("DD-MM-YYYY")).innerHTML += str;

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

							console.log(activities[i].activityID);

							$("#tbStartTime" + activities[i].activityID).timepicker({
								timeFormat: "hh:mm p",
								interval: 15,
								defaultTime: openingHour,
								minTime: openingHour,
								maxTime: closingHour,
								startTime: openingHour,
								dropdown: true,
								scrollbar: false,
								zindex: 3500,
								// change: function (time) {
								// 	$("#tbEndTime" + activities[i].activityID).timepicker("option", "minTime", time);
								// },
							});

							$("#tbEndTime" + activities[i].activityID).timepicker({
								timeFormat: "hh:mm p",
								interval: 15,
								zindex: 3500,
								defaultTime: closingHour,
								minTime: openingHour,
								maxTime: closingHour,
								dropdown: true,
								scrollbar: false,
								// change: function (time) {
								// 	$("#tbStartTime" + activities[i].activityID).timepicker("option", "maxTime", time);
								// },
							});
						},
					});
				}, 2000);
			} else {
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
														<input id="tbStartTime${activities[i].activityID}" type="text" class="form-control" value=${activities[i].startTime} />
													</div>
													<div class="form-group col-md-6">
														<label for="tbActivity${activities[i].activityID}">End Time</label>
														<input id="tbEndTime${activities[i].activityID}" type="text" class="form-control" value=${activities[i].endTime} />
													</div>
													<!-- <div class="form-group col-md-12">
														<div id="conflictAlert${activities[i].activityID}" class="alert alert-danger mb-0" role="alert" style="display: none;">
															Your start/end time conflict with your existing itinerary!
														</div>
													</div> -->
												</div>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
												<button type="button" class="btn btn-danger" onclick="editActivity(${activities[i].activityID})">Save Changes</button>
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
												<button type="button" class="btn btn-danger" onclick="deleteActivity(${activities[i].activityID})">Confirm Delete</button>
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

							document.getElementById(moment(activities[i].activityDate).format("DD-MM-YYYY")).innerHTML += str;

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

							console.log(activities[i].activityID);

							$("#tbStartTime" + activities[i].activityID).timepicker({
								timeFormat: "hh:mm p",
								interval: 15,
								defaultTime: openingHour,
								minTime: openingHour,
								maxTime: closingHour,
								startTime: openingHour,
								dropdown: true,
								scrollbar: false,
								zindex: 3500,
								// change: function (time) {
								// 	$("#tbEndTime" + activities[i].activityID).timepicker("option", "minTime", time);
								// },
							});

							$("#tbEndTime" + activities[i].activityID).timepicker({
								timeFormat: "hh:mm p",
								interval: 15,
								zindex: 3500,
								defaultTime: closingHour,
								minTime: openingHour,
								maxTime: closingHour,
								dropdown: true,
								scrollbar: false,
								// change: function (time) {
								// 	$("#tbStartTime" + activities[i].activityID).timepicker("option", "maxTime", time);
								// },
							});
						},
					});
				}, 2000);
			}
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
		data: { activity_id: clicked_id },
	}).done(function (responseText) {
		if (responseText == 1) {
			window.location.reload();
		}
	});
}

function display() {
	window.print();
}

function shareItinerary() {
	$("#successLink").attr("style", "display:none");
	$("#shareModal").modal("show");
	$("#tbShareLink").val(window.location.href.split("&")[0] + "&own=no");
}

function copyLink() {
	/* Get the text field */
	var copyText = document.getElementById("tbShareLink");

	/* Select the text field */
	copyText.select();
	copyText.setSelectionRange(0, 99999); /*For mobile devices*/

	/* Copy the text inside the text field */
	document.execCommand("copy");

	$("#successLink").attr("style", "display:''");
}

function copyItinerary() {
	var idParam = new URL(window.location.href).searchParams.get("id");
	var baseUrl = "../../php/objects/itineraryCopy.php";

	$.ajax({
		url: baseUrl,
		type: "POST",
		data: { itinerary_id: idParam, userID: sessionStorage.getItem("userID") },
	}).done(function (responseText) {
		if (responseText == 1) {
			$("#copyStatusTitle").html("Success");
			$("#copyStatusMsg").html("This itinerary has been successfully copied to your profile.");
			$("#copySuccessModal").modal("show");
		}
	});
}

function editItinerary() {
	var idParam = new URL(window.location.href).searchParams.get("id");
	var baseUrl = "../../php/objects/itineraryUpdateName.php";

	$.ajax({
		url: baseUrl,
		type: "POST",
		data: { itinerary_id: idParam, name: $("#tbItineraryTitle").val() },
	}).done(function (responseText) {
		if (responseText == 1) {
			window.location.reload();
		}
	});
}

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
