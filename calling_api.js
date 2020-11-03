


function call_api(keyword, data_types){

    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){

            var response_json = JSON.parse(this.responseText);
            var results = response_json.data.results
            var counter = 0;
            var new_str = '';
            var obj_to_prevent_duplicate = {};  
            for(poi of results){               
                if(poi.images.length != 0 && poi.images[0].uuid != "" && !(poi.name in obj_to_prevent_duplicate)){
                    new_str += display_poi(poi.name, poi.images[0].uuid, counter, poi.uuid, poi.categoryDescription,poi.description);
                    obj_to_prevent_duplicate[poi.name] = "";
                    counter++;
                }
            }   
            document.getElementById('insert_poi_result').innerHTML = new_str + "</div> </div>";
        }

    }

    if(data_types == 'all'){
        var dataset = 'accommodation,attractions,event,food_beverages,shops,venue,walking_trail';
    }
    else{
        var dataset = data_types;
    }


    const apiKey = 'i9IigYi6bl70KMqOcpewpzHHQ2NanEqx';
    var base_url = "https://tih-api.stb.gov.sg/content/v1/search/all";
    var final_url = base_url +'?dataset='+ dataset  + '&keyword=' + keyword + '&apikey=' +apiKey ;

    request.open("GET",final_url, true); 

    request.send();

}

function display_poi(name,image_uuid,counter,uuid,category,description){

    const apiKey = 'i9IigYi6bl70KMqOcpewpzHHQ2NanEqx';
    var category_type = type_of_dataset(category); 

    var image_link = 'https://tih-api.stb.gov.sg/media/v1/download/uuid/'+image_uuid+'?apikey='+apiKey;
    

    
    var search_poi_html = `<div class="card mb-3" >
                            <div class="row no-gutters">
                                <div class="col-md-5">
                                    <img src="${image_link}" class="card-img stretched-link" onclick="call_uuid_api('${uuid}','${category_type}')" alt="${name}" style='height:250px;'>                                 
                                </div>
                                <div class="col-md-7 w-100">
                                    <div class="card-body">
                                        <h5 class="card-title">${name}</h5>
                                        <p class="card-text">${description}</p>
                                        <a onclick="call_uuid_api('${uuid}','${category_type}')" class="btn btn-primary stretched-link">More details</a>     
                                    </div>
                                </div>
                            </div>
                        </div>`;

    return search_poi_html;
}

function display_specific_poi(image_uuid,title,rating,hp_contact,description,business_hours,lat,lng,postal,type_of_poi,reviews,email,website){
    
    var insert_poi = document.getElementById('insert_poi');
    const apiKey = 'i9IigYi6bl70KMqOcpewpzHHQ2NanEqx';
    var map_link = call_onemap_api(lat,lng,postal);
    var image_link = 'https://tih-api.stb.gov.sg/media/v1/download/uuid/'+image_uuid+'?apikey='+apiKey;
    
    

    insert_poi.setAttribute('style', 'width:80%; margin:auto;');
    // insert_poi.setAttribute('class','row');
     
    var poi_html = `        <div class='container my-4'>                 
                                    <div id='title'>
                                        <p class='h2'>${title}</p>
                                    </div>
                            </div>
                            <div id='poi_category' class='row'>
                                        <h4 class='col-4 text-muted ml-2'> ${creating_stars_html(Math.floor(rating))}</h4>
                                       
                                        <h5 class='col-4 text-muted'>${type_of_poi}</h5>
                            </div>
                        

                            <div class='row'>
                                <div class='col-7'>
                                    <div id='poi_image'>
                                        <img src="${image_link}" alt="${title}" class="img-thumbnail" style='width: 100%; height: 100%;'>
                                    </div>
                                    <div id='poi_description'>
                                        <p>${description}</p>
                                    </div>
                                </div>
                                

                            <div class='col'>

                                <div id='poi_business_hours'>
                                    <h6>Business Hours</h6>
                                    <p>Opening hours: ${business_hours['openTime']} - ${business_hours['closeTime']}<br></p>
                                </div>
                                <div id='poi_contact'>
                                    <h6>Contact</h6>
                                    <p>Email: ${email} </br>
                                    Phone: ${hp_contact} </br>
                                    Website: ${website}</p> 
                                </div>
                                <div id='poi_itinerary_creation' style='width: 100%;'>
                                    <h6>Create an itinerary with ${title}</h6>
                                    <button type="button" style='margin:auto;' class="btn btn-info" data-toggle="modal" data-target="#exampleModal">Start Planning</button>
                                </div>
                                <div id='onemap_image' class='mt-3'>
                                    <img src='${map_link}' alt='map' class="img-thumbnail">
                                </div>
                            </div>
                        </div>`;
        
        insert_poi.innerHTML = poi_html + review_section(reviews,rating);
        window.scrollTo(0,0);
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
    if(type == 'All'){
        return 'all';
    }

}

function call_uuid_api(uuid,type){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200 ){
            console.log(uuid);
            var response_json = JSON.parse(this.responseText);
            var data = response_json.data[0];

            if(data.images.length != 0 || data.images[0].uuid != ""){
                var image_uuid = data.images[0].uuid;
            }
            else{
                var image_uuid = '';
            }
            
            if(data.businessHour != undefined){
                if(data.businessHour.length != 0) {
                    var business_hours = {'openTime': moment(data.businessHour[0]["openTime"], "HH:mm").format("hh:mm A"), 'closeTime': moment(data.businessHour[0]["closeTime"], "HH:mm").format("hh:mm A") };
                }
                else{
                    var business_hours = {'daily':'none','openTime':'??','closeTime':"??"};
                }
            }
            else{
                var business_hours = {'daily':'none','openTime':'??','closeTime':"??"};
            }
            if(data.officialEmail == ""){
                var email = "-";
            }
            else{
                var email = data.officialEmail;
            }
            if(data.officialWebsite == ""){
                var website = "-";
            }
            else{
                var website = data.officialWebsite;
            }
            if(data.contact['primaryContactNo'] == ""){
                var hp_contact = "-";
            }
            else{
                var hp_contact = data.contact['primaryContactNo'];
            }
            
            var title = data.name;
            var rating = data.rating;
            var description = data.body;
            var reviews = data.reviews; // array
            var lat = data.location['latitude'];
            var lng = data.location['longitude'];
            var postal = data.address['postalCode'];
            var type_of_poi = data.type;

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

function review_section(reviews,rating){
    var number = Math.floor(rating); // integer only please jerriel, i wanna cyr
    var header_html = "";

    if(reviews != null){
        header_html += creating_reviews_html(reviews);
    }

    return header_html;
    // document.getElementById('insert_poi').innerHTML = header_html;

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

function creating_reviews_html(reviews){

    var reviews_html =      `<div class="row">
                                <div class="col-sm-12">
                                    <hr/>
                                    <div class="review-block">`;

    for(j=0;j<reviews.length;j++){
        // var temp = reviews[j]['time'].split('T');
        // var date = temp[0];
        // var time = temp[1].slice(0,temp[1].length-1);
        var title = reviews[j].text.split('.')[0];
        reviews_html +=             `<div class="row">
                                        <div class="col-sm-3">
                                            <img src="${reviews[j].profilePhoto}" class="img-rounded" style='width: 100px; height: 100px;'>
                                            <div class="review-block-name ml-3"><a href="${reviews[j].authorURL}">${reviews[j].authorName}</a></div>
                                            <div class="review-block-date"><br/></div>
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="review-block-rate">`;
        reviews_html += creating_stars_html(Math.floor(reviews[j].rating));                                 
        reviews_html +=                 `</div>
                                            <div class="review-block-title">${title}</div>
                                            <div class="review-block-description">${reviews[j].text}</div>
                                        </div>
                                    </div>
                                    <hr/>`;
    }
    reviews_html += `				</div>
                                </div>
                            </div>
                        </div>`;

    return reviews_html
}

function filter(){
    var checkboxes = document.getElementsByName('categories');
    var categories_array = [];

    for (var checkbox of checkboxes) {
        if (checkbox.checked){
            categories_array.push(checkbox.getAttribute('value'));
        }     
    }
    var str_for_types = '';
    for(category of categories_array){
        str_for_types += category + ',';
    }
    call_api(document.getElementById('searching_poi').value,str_for_types.slice(0,str_for_types.length-1));
}

function poi_page_html(keyword,data_types){

    document.getElementById('insert_poi').setAttribute('class',"");
    document.getElementById('insert_poi').setAttribute('style',"");

    document.getElementById('insert_poi').innerHTML = `<div class="jumbotron jumbotron-fluid">
                                                        <div class="container">
                                                            <h1 class="display-4" style='text-align:center;'>Things to do in Singapore</h1>
                                                            </div>
                                                        </div>`;    
    document.getElementById('insert_poi').innerHTML += `<div class='container row'>
                                                            <div class='col-3 ml-3'>
                                                                <div class='container border'>   
                                                                    <div class='border-bottom px-3 pt-2 pb-3'>
                                                                        <div class='row'>
                                                                            <h3>Filter</h3>
                                                                        </div>
                                                                        <div class="form-check">
                                                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                                                                            <label class="form-check-label" for="exampleRadios1">
                                                                            Hidden Gem
                                                                            </label>
                                                                        </div>
                                                                        <div class="form-check">
                                                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
                                                                            <label class="form-check-label" for="exampleRadios2">
                                                                            Tourist Attractions
                                                                            </label>
                                                                        </div>
                                                                    </div>    
                                                                    <div class ='px-3 pb-5 pt-2'>   
                                                                        <div class='row'>
                                                                            <h3>Categories</h3>
                                                                        </div>
                                                                        <div class="form-check">
                                                                            <input class="form-check-input" type="checkbox" name='categories' value="accommodation" id="accommodation">
                                                                            <label class="form-check-label" for="accommodation">
                                                                                Accommodation
                                                                            </label>
                                                                        </div>
                                                                        <div class="form-check">
                                                                            <input class="form-check-input" type="checkbox" name='categories' value="attractions" id="attractions">
                                                                            <label class="form-check-label" for="attractions">
                                                                                Attractions
                                                                            </label>
                                                                        </div>
                                                                        <div class="form-check">
                                                                            <input class="form-check-input" type="checkbox"name='categories'  value="venue" id="venues">
                                                                            <label class="form-check-label" for="venues">
                                                                                Venues
                                                                            </label>
                                                                        </div>
                                                                        <div class="form-check">
                                                                            <input class="form-check-input" type="checkbox" name='categories' value="food_beverages" id="food">
                                                                            <label class="form-check-label" for="food">
                                                                                Food & Beverages
                                                                            </label>
                                                                        </div>   
                                                                        <div class="form-check">
                                                                            <input class="form-check-input" type="checkbox" name='categories' value="walking_trail" id="walking_trails">
                                                                            <label class="form-check-label" for="walking_trails">
                                                                                Walking Trails
                                                                            </label>
                                                                        </div> 
                                                                        <div class="form-check">
                                                                            <input class="form-check-input" type="checkbox" name='categories' value="shops" id="shops">
                                                                            <label class="form-check-label" for="shops">
                                                                                Malls & Shops
                                                                            </label>
                                                                        </div>  
                                                                    </div>

                                                                    <button type="button" class="btn btn-primary" onclick='filter()'>CLICK ME</button>
                                                                </div>   
                                                            </div>
                                                            <div class='col' id='insert_poi_result'>
                                                                <h5> Recommended for you</h5>`;
    call_api(keyword,data_types);

}

function onEvent(event) {
    if (event.key === "Enter") {
        // After user typed enter
        poi_page_html(document.getElementById('searching_poi').value,'all');
    }
};