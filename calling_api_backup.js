// BACKUP FROM 10/23/2020 11:41PM



function call_api(keyword){

    document.getElementById('insert_poi').setAttribute('class',"");
    document.getElementById('insert_poi').setAttribute('style',"");

    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){

            var response_json = JSON.parse(this.responseText);
            var results = response_json.data.results
            var counter = 0;
            var new_str = "";
            var obj_to_prevent_duplicate = {};
            for(poi of results){               
                if(poi.images.length != 0 && poi.images[0].uuid != "" && poi.businessHour != undefined && !(poi.name in obj_to_prevent_duplicate)){
                    new_str += display_poi(poi.name, poi.images[0].uuid, counter, poi.uuid, poi.categoryDescription);
                    obj_to_prevent_duplicate[poi.name] = "";
                    counter++;
                }
                // else{
                //     new_str += display_poi(poi.name, "", counter, poi.uuid, poi.categoryDescription);
                // }
               
            }   
            document.getElementById('insert_poi').innerHTML = new_str + "</div>";
            

        }
    }
    const apiKey = 'i9IigYi6bl70KMqOcpewpzHHQ2NanEqx';
    var base_url = "https://tih-api.stb.gov.sg/content/v1/search/all";
    var final_url = base_url +'?apikey=' +apiKey +'&dataset=accommodation,attractions,event,food_beverages,shops,venue,walking_trail' + '&keyword=' + keyword;

    request.open("GET",final_url, true); 

    request.send();

}

function display_poi(name,image_uuid,counter,uuid,category){

    const apiKey = 'i9IigYi6bl70KMqOcpewpzHHQ2NanEqx';
    var category_type = type_of_dataset(category);
    var insert_here = document.getElementById('insert_poi');   
    var image_link = 'https://tih-api.stb.gov.sg/media/v1/download/uuid/'+image_uuid+'?apikey='+apiKey;
    
    if(counter == 0){
        temp = `                <div class='row pt-5 ml-2' style='justify-content: center;'>
                                    <div class="card" style="width: 18rem;">
                                        <img class="card-img-top" src="${image_link}" alt="Card image cap">
                                            <div class="card-body">
                                            <h5 class="card-title pb-1">${name}</h5>
                                            <button type='button' onclick="call_uuid_api('${uuid}','${category_type}')" class="btn btn-primary" >More details</button>
                                        </div>
                                    </div>`

    }
    else if(counter % 4 == 0){
        temp  = `
                                </div>
                                    <div class='row pt-5 ml-2' style='justify-content: center;'>
                                      <div class="card" style="width: 18rem;">
                                        <img class="card-img-top" src="${image_link}" alt="Card image cap" >
                                            <div class="card-body">
                                            <h5 class="card-title pb-1">${name}</h5>
                                            <button type='button' onclick="call_uuid_api('${uuid}','${category_type}')" class="btn btn-primary" >More details</button>
                                            
                                        </div>
                                    </div>`
    }
    // <a onclick="call_uuid_api('${uuid}','${category_type}')" class="btn btn-primary stretched-link">More details</a>
    // <a onclick="call_uuid_api('${uuid}','${category_type}')" class="btn btn-primary stretched-link">More details</a>             (Clickable the entire card)
    //<button type='button' onclick="call_uuid_api('${uuid}','${category_type}')" class="btn btn-primary" >More details</button>    (only button)
    else{
         temp = `                   <div class="card" style="width: 18rem;">
                                        <img class="card-img-top" src="${image_link}" alt="Card image cap" >
                                            <div class="card-body">
                                            <h5 class="card-title pb-1">${name}</h5>
                                            <button type='button' onclick="call_uuid_api('${uuid}','${category_type}')" class="btn btn-primary" >More details</button>
                                        </div>
                                    </div>`
    }

    return temp;
}

function display_specific_poi(image_uuid,title,rating,hp_contact,description,business_hours,lat,lng,postal,type_of_poi,reviews,email,website){
    
    var insert_poi = document.getElementById('insert_poi');
    const apiKey = 'i9IigYi6bl70KMqOcpewpzHHQ2NanEqx';
    var map_link = call_onemap_api(lat,lng,postal);
    var image_link = 'https://tih-api.stb.gov.sg/media/v1/download/uuid/'+image_uuid+'?apikey='+apiKey;
    


    // <div id='insert_poi' style='width:80%; margin:auto;' class='row'>
    insert_poi.setAttribute('style', 'width:80%; margin:auto;');
    insert_poi.setAttribute('class','row');
    // <span>On the Web: <a href='${website}'>${website}</a></span>      Link to their website (May be redundant cause some description shows it alry)
//     <div id='poi_price'>
    //     <h6>Price</h6>
    //     <p>??</p>                   Don't include price? API don't have price
//     </div>       
    var poi_html = `        <div class='col-7'>
                                <div id='title'>
                                    <h1 class='display-4'>${title}</h1>
                                </div>
                                <div id='poi_category' class='row'>
                                    <h6 class='col text-muted'>${rating}</h6>
                                    <h5 class='col text-muted'>${type_of_poi}</h5>
                                </div>
                                <div id='poi_image'>
                                    <img src="${image_link}" alt="${title}" class="img-thumbnail" style='width: 100%; height: 100%;'>
                                </div>
                                <div id='poi_description'>
                                    <p>${description}</p>
                                
                                </div>
                            </div>

                            <div class='col'>
                                <div id='empty_for_now' style='margin-bottom: 105px;'>

                                </div>
                                <div id='recommended_duration'>
                                    <h6>Recommended Duration</h6>
                                    <p>(dk what to put)</p>
                                </div>
                                <div id='poi_business_hours'>
                                    <h6>Business Hours</h6>
                                    <p>Opening hours: ${business_hours['openTime']} - ${business_hours['closeTime']} ()<br></p>
                                </div>
                                <div id='poi_contact'>
                                    <h6>Contact</h6>
                                    <p>Email: ${email} </br>
                                    Phone: ${hp_contact} </br>
                                    Website: ${website}</p> 
                                </div>
                                <div id='poi_itinerary_creation' style='width: 100%;'>
                                    <h6>Create an itinerary with ${title}</h6>
                                    <button type="button" style='margin:auto;' class="btn btn-info">Start Planning</button>
                                </div>
                                <div id='onemap_image' class='mt-3'>
                                    <img src='${map_link}' alt='map' class="img-thumbnail">
                                </div>
                            </div>
                        </div>`;
        
        insert_poi.innerHTML = poi_html;
}



function type_of_dataset(type){
    if(type == 'Attractions'){
        return 'attractions';
    }
    if(type == 'Malls & Shops'){
        return 'shops';
    }
    if(type == 'Venues'){
        return 'venue';
    }
    if(type == 'Food & Beverages'){
        return 'food-beverages';
    }
    if(type == 'Accommodation'){
        return 'accommodation';
    }

}

function call_uuid_api(uuid,type){
    console.log(type);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){

            var response_json = JSON.parse(this.responseText);
            var data = response_json.data[0];

            // if(data.images.length != 0 || data.images[0].uuid != ""){
            //     var image_uuid = data.images[0].uuid;
            // }
            // else{
            //     var image_uuid = '';
            // }
            
            // if(data.businessHour != undefined){
            //     var business_hours = data.businessHour[0];
            // }
            // else{
            //     var business_hours = {'daily':'none','openTime':'??','closeTime':"??"};
            // }

            var title = data.name;
            var rating = data.rating;
            var hp_contact = data.contact['primaryContactNo'];
            var description = data.body;
            var reviews = data.reviews; // array
            var lat = data.location['latitude'];
            var lng = data.location['longitude'];
            var postal = data.address['postalCode'];
            var type_of_poi = data.type;
            var email = data.officialEmail;
            var website = data.officialWebsite;

            display_specific_poi(image_uuid,title,rating,hp_contact,description,business_hours,lat,lng,postal,type_of_poi,reviews,email,website);
            }
        }
    
    const apiKey = 'i9IigYi6bl70KMqOcpewpzHHQ2NanEqx';
    var base_url = "https://tih-api.stb.gov.sg/content/v1/";
    var final_url = base_url + type +'?apikey=' +apiKey +'&uuid=' + uuid;

    request.open("GET",final_url, true); 

    request.send();

}



function call_onemap_api(lat,lng,postal){

    var layerchosen = 'layerchosen=default';
    var new_lat = '&lat=' + lat;
    var new_lng = '&lng=' + lng;
    var new_postal = '&postal=' + postal;
    var zoom = '&zoom=17'; // 11-19
    var width = '&width=512' //128 - 512
    var height = '&height=512' //128-512
    var points = `&points=[${lat},${lng},"255,255,178","A"]`; //optional, to have a pointer on the map

    var onemap_image = `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?` + layerchosen + new_lat + new_lng + new_postal + zoom + width + height + points;

    return onemap_image;
}

function validation_check(){

}

function review_section(reviews,rating){
    var number = 4; // integer only please jerriel, i wanna cyr
    var header_html = `<div class='container'>
                        <div class="row">
                            <div class="col-sm-3">
                            <div class="rating-block">
                                <h4>Average user rating</h4>
                                <h2 class="bold padding-bottom-7">${number}<small>/ 5</small></h2>`;

    header_html += creating_stars_html(number);
    header_html += `</div>
                </div>`;

    header_html += creating_reviews_html();

    // return header_html;
    document.getElementById('insert_poi').innerHTML = header_html;

}

function creating_stars_html(number){
    var stars_html = "";
    for(i=0;i<number;i++){
        stars_html += ` 			
					<button type="button" class="btn btn-warning btn-sm" aria-label="Left Align">
					  <span class="fas fa-star" aria-hidden="true"></span>
					</button>`;
    }
    for(i=0;i<5-number;i++){
        stars_html += `
                        <button type="button" class="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                            <span class="fas fa-star" aria-hidden="true"></span>
                        </button>`;
    }
    return stars_html;
}






function creating_reviews_html(){

    reviews_html =      `<div class="row">
                                <div class="col-sm-7">
                                    <hr/>
                                    <div class="review-block">`;

    for(i=0;i<reviews.length;i++){
        reviews_html +=             `<div class="row">
                                        <div class="col-sm-3">
                                            <img src="http://dummyimage.com/60x60/666/ffffff&text=No+Image" class="img-rounded">
                                            <div class="review-block-name"><a href="#">nktailor</a></div>
                                            <div class="review-block-date">January 29, 2016<br/>1 day ago</div>
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="review-block-rate">
                                                <button type="button" class="btn btn-warning btn-xs" aria-label="Left Align">
                                                <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                </button>
                                                <button type="button" class="btn btn-warning btn-xs" aria-label="Left Align">
                                                <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                </button>
                                                <button type="button" class="btn btn-warning btn-xs" aria-label="Left Align">
                                                <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                </button>
                                                <button type="button" class="btn btn-default btn-grey btn-xs" aria-label="Left Align">
                                                <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                </button>
                                                <button type="button" class="btn btn-default btn-grey btn-xs" aria-label="Left Align">
                                                <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                </button>
                                            </div>
                                            <div class="review-block-title">this was nice in buy</div>
                                            <div class="review-block-description">this was nice in buy. this was nice in buy. this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy</div>
                                        </div>
                                    </div>
                                    <hr/>`;
    }

    return reviews_html
}