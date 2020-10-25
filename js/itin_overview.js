const apiKey = "2DeahNNW3hdNmHNNpsUFv0BH7mQeZm63"; //Hong Tao's API Auth Token

// Data Picker Initialization



var url= "../travel-local-1/php/objects/itinAllRetrieve.php";
ajaxCall(url,display_default_cards,'POST',{userID:2});

function ajaxCall(search,callback,method='GET',value=null){
    // console.log('test');
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
    // return null;
    // console.log(intineraries);
    let startDate = null;
    let itins_view = document.getElementById("popular_itins");
    for (let i = 0; i < intineraries.length; i++){
        startDate = intineraries[i].startDate.replaceAll('-', '/');
        endDate = intineraries[i].endDate.replaceAll('-', '/');
        let new_card = document.createElement('div');
        new_card.className = "col-lg-3 col-md-4 d-flex"; 
        new_card.innerHTML = `
            <div class="card mx-auto mb-5" style="width: 22rem;">
                <img alt="Card image cap" id="${'itinerary'+i}" class="card-img-top img-fluid" src="../travel-local-1/images/${intineraries[i].itineraryType}.jpg">
                <div class="card-img-overlay">
                    <h4 class="card-title"><a href="#">${intineraries[i].name}</a> ${display_rating(0)}</h4>
                    <footer class="blockquote-footer">${startDate} - ${endDate}</p>
                </div>
            </div>
            `;
        itins_view.appendChild(new_card);
    }
    // console.log(itins_view.getElementsByClassName("col-lg-3 col-md-4 d-flex"));
}

function display_rating(i){ //Currently disabled due to not needing it
//     stars = '';
//     for (let n = 0; n < i; n++){
//         stars += "<span class='fa fa-star fa-xs checked'></span>";
//     }
    
    // return stars;
    return '';
}

