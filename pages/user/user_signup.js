function register() {
	var user = {
		firstName: $("#firstName").val(),
		lastName: $("#lastName").val(),
		email: $("#email").val(),
		password: $("#password").va(),
    };
    
    var baseUrl = "../../php/objects/"

	$.ajax({
		url: baseUrl,
		type: "POST",
		dataType: "json",
		data: {
			activityID: clicked_id,
			startTime: document.getElementById("tbStartTime" + clicked_id).value,
			endTime: document.getElementById("tbEndTime" + clicked_id).value,
		},
	}).done(function (responseText) {
		if (responseText == 1) {
			window.location.reload();
		}
	});
}
