const locations = [ 
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

function display_default_cards(){ //as name implies
    let str = '';
    console.log(document.getElementById("popular_itins").innerHTML);
    for (var i = 0; i < locations.length; i++){
        str += `
            <div class="col-lg-3 col-md-4 d-flex">
                <div class="card mx-auto mb-5" style="width: 22rem;">
                    <img alt="Card image cap" class="card-img-top img-fluid" src="${locations[i].pic_url}">
                    <div class="card-body">
                        <h4 class="card-title"><a href="#">${locations[i].name}</a> ${display_rating(locations[i].rating)}</h4>
                        <p class="card-text">${locations[i].description}</p>
                    </div>
                </div>
            </div>
            `;
    }
    document.getElementById("popular_itins").innerHTML = str;
}

function display_rating(i){
    stars = '';
    for (let n = 0; n < i; n++){
        stars += "<span class='fa fa-star fa-xs checked'></span>";
    }
    
    return stars;
}