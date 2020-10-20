const falseDB = [ 
    {
        "id": "1",
        "name": "Itinerary 1",
        "rating": "4",
        "pic_url": "https://worldtoptop.com/wp-content/uploads/2011/05/marina_bay_sands-.jpg",
        "description": "The roof looks like a boat! Now, that's cool."
    },
    {
        "id": "2",
        "name": "Itinerary 2",
        "rating": "3",
        "pic_url": "https://worldtoptop.com/wp-content/uploads/2011/05/merlion_park_4.jpg",
        "description": "A lion pokemon uses water gun"
    },
    {
        "id": "3",
        "name": "Itinerary 3",
        "rating": "5",
        "pic_url": "https://worldtoptop.com/wp-content/uploads/2011/05/buddha_tooth_relic_temple_singapore_3.jpg",
        "description": "A blast from the past! See the old stand against the new in this trip.A blast from the past! See the old stand against the new in this trip.A blast from the past! See the old stand against the new in this trip."
    },
    {
        "id": "4",
        "name": "Itinerary 4",
        "rating": "4",
        "pic_url": "https://worldtoptop.com/wp-content/uploads/2011/05/fountain_of_wealth_suntec.jpg",
        "description": "I ripped all these image off worldtoptop LMAO. Please don't sue me :X"
    },
    {
        "id": "5",
        "name": "Itinerary 5",
        "rating": "3",
        "pic_url": "https://worldtoptop.com/wp-content/uploads/2011/05/henderson_waves_bridge_2.jpg",
        "description": "This trip is up and down.This trip is up and down.This trip is up and down.This trip is up and down.This trip is up and down.This trip is up and down.This trip is up and down.This trip is up and down.This trip is up and down.This trip is up and down."
    },
    {
        "id": "6",
        "name": "Itinerary 6",
        "rating": "2",
        "pic_url": "https://worldtoptop.com/wp-content/uploads/2011/05/the_esplanade_theaters_on_the_bay.jpg",
        "description": "This trip will be real pointy... IDK I tried to be funny and clearly failed."
    }
];

const apiKey = "2DeahNNW3hdNmHNNpsUFv0BH7mQeZm63";

var url= "../travel-local-1/php/objects/itinAllRetrieve.php";
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if( this.readyState == 4 && this.status == 200 ) {

        var response_json = JSON.parse(this.responseText);
        // console.log(response_json.records);
        display_default_cards(response_json);
    }
}
request.open("GET", url, true);
request.send();



// for (var i = 0; i < poiUUID_list.length; i++) {
//     (function (i) {
    var base_url = "https://tih-api.stb.gov.sg/content/v1/attractions";
    var final_url = base_url + "?uuid=" + poiUUID_list[i] + "&apikey=" + apiKey;

    var request = new XMLHttpRequest();
    request.open("GET", final_url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
        var data = JSON.parse(request.responseText);

        }
    };
//     })(i);
// }

// function call_api(url,function_callback){
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = function() {
//         if( this.readyState == 4 && this.status == 200 ) {

//             var response_json = JSON.parse(this.responseText);
//             // console.log(response_json.records);
//             var Obj = response_json.records;
//             function_callback(Obj);
//         }
//     }
//     request.open("GET", url, true);
//     request.send();
// }

function display_default_cards(locations){ //Runs on load
    // console.log('new card method');
    let itins_view = document.getElementById("popular_itins");
    for (let i = 0; i < 3; i++){
        let new_card = document.createElement('div');
        new_card.className = "col-lg-3 col-md-4 d-flex";
        new_card.innerHTML = `
            <div class="card mx-auto mb-5" style="width: 22rem;">
                <img alt="Card image cap" class="card-img-top img-fluid" src="${falseDB[i].pic_url}">
                <div class="card-body">
                    <h4 class="card-title"><a href="#">${locations[i].name}</a> ${display_rating(0)}</h4>
                    <p class="card-text danger">${locations[i].startDate} - ${locations[i].endDate}</p>
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