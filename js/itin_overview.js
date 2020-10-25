const apiKey = "2DeahNNW3hdNmHNNpsUFv0BH7mQeZm63"; //Hong Tao's API Auth Token


var url= "../travel-local-1/php/objects/itinAllRetrieve.php";
var get_userID = 2
ajaxCall(url,display_default_cards,'POST',{'userID':get_userID});

function ajaxCall(search,callback,method='GET',value=null){
    console.log(value);
    $.ajax({
        url: search,
        type: method,
        timeout: 500,
        dataType: 'json',
        data: value,
        async:true,
        success: function (response) {
            // console.log(response);
            callback(response);
        },
        error: function(response){
            console.log("error");
        }
    });
}

function display_default_cards(intineraries){
    let startDate = null;
    let itins_view = document.getElementById("popular_itins");
    itins_view.innerHTML = '';
    for (let i = 0; i < intineraries.length; i++){
        startDate = intineraries[i].startDate.replaceAll('-', '/');
        endDate = intineraries[i].endDate.replaceAll('-', '/');
        let new_card = document.createElement('div');
        new_card.className = "col-lg-3 col-md-4 d-flex"; 
        new_card.innerHTML = `
            <div class="card mx-auto mb-5" style="width: 22rem;">
                <img alt="Card image cap" class="card-img-top img-fluid" src="../travel-local-1/images/${intineraries[i].itineraryType}.jpg">
                <div class="card-img-overlay">
                    <h4 class="card-title"><a href="#">${intineraries[i].name}</a></h4>
                    <footer class="blockquote-footer">${startDate} - ${endDate}</p>
                </div>
                <div class="card-footer bg-transparent border-success">Footer</div>
            </div>
            `;
        itins_view.appendChild(new_card);
    }
}


function add_itinerary() {

    var itinerary = {
        itinName: $("#itinName").val(),
        itinType: $("#itinType").val(),
        startDate: dateFormat($("#startDate").val()),
        endDate: dateFormat($("#endDate").val()),
        userID: 2
    };
    // date receives in MM-DD-YYYY -> YYYY-MM-DD
    var data = JSON.stringify(itinerary);
    let url = "../travel-local-1/php/objects/itinCreate.php";
    ajaxCall(url,console.log,'POST',data);
    url= "../travel-local-1/php/objects/itinAllRetrieve.php";
    var get_userID = 2
    ajaxCall(url,display_default_cards,'POST',{'userID':get_userID});
}

function dateFormat(date){
    // console.log(date);
    let date_array = date.split('/');
    let new_date = [date_array[2],date_array[0],date_array[1]];
    return new_date.join('-');
}

