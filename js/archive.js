// var valueGet = $.ajax({
//     //remember to change the php to the user's select ID instead of all itin
//     url: "../travel-local-1/php/objects/itinAllRetrieve.php",
//     type: 'get',
//     dataType: 'json'
// });

// valueGet.done(function(data){
//     results.push(data);
//     for (let i in data){
//         activities.push(data[i].itineraryID);
//     }
//     var activitiesGet = $.ajax({
//         url: "../travel-local-1/php/objects/itinActsRetrieve.php",
//         type: 'POST',   
//         data: Object.assign({}, ['1','2','3']),
//     });
//     activitiesGet.done(function(response){
//         console.log(response);
//     })
//     // console.log(results);
// });

// var activitiesGet = $.ajax({
//     url: "../travel-local-1/php/objects/itinActsRetrieve.php",
//     type: 'POST',   
//     data: Object.assign({}, ['1','2','3']),
//     // success: function (response) {
//     //     console.log(response);
//     // },
//     // error: function(){
//     //     console.log("failed");
//     // }
// });






// var count = 0;
// var url= "../travel-local-1/php/objects/itinAllRetrieve.php";
// var request = new XMLHttpRequest();
// request.open("GET", url, true);
// request.send();
// request.onreadystatechange = function() {
//     if( this.readyState == 4 && this.status == 200 ) {

//         var itinsObj = JSON.parse(this.responseText);
//         display_default_cards(itinsObj);
//         for (itinCount in itinsObj){

//             let url= "../travel-local-1/php/objects/itinActsRetrieve.php";
//             var request = new XMLHttpRequest();
//             request.open("POST", url, true);
//             request.send(itinsObj[itinCount].itineraryID);
//             request.onreadystatechange = function() {
//                 if( this.readyState == 4 && this.status == 200 ) {

//                     var actsObj = JSON.parse(this.responseText)[0]; //Returns only first activity currently
//                     // console.log(actsObj.poiUUID); //first activity's uuid
//                     var base_url = "https://tih-api.stb.gov.sg/content/v1/attractions";
//                     var final_url = base_url + "?uuid=" + actsObj.poiUUID + "&apikey=" + apiKey;
                
//                     var tax = new XMLHttpRequest();
//                     tax.open("GET", final_url, true);
//                     tax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//                     tax.send();
//                     tax.onreadystatechange = function () {
//                         if (tax.readyState == 4 && tax.status == 200) {
//                             var data = JSON.parse(tax.responseText);
//                             // console.log(data.data[0].images[0].uuid); //first activity's image uuid
//                             var img_uuid = data.data[0].images[0].uuid;
//                             var pre_url = "https://tih-api.stb.gov.sg/media/v1/image/uuid/";
//                             var complete_url = pre_url + img_uuid + "?apikey=" + apiKey;
                            
//                             var tbx = new XMLHttpRequest();
//                             tbx.open("GET", complete_url, true);
//                             tbx.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//                             tbx.send();
                        
//                             tbx.onreadystatechange = function () {
//                                 if (tbx.readyState == 4 && tbx.status == 200) {

//                                     var img_url_data = JSON.parse(tbx.responseText);
//                                     // console.log(img_url.data.url);
//                                     var img_url = img_url_data.data.url + "?apikey=" + apiKey;
//                                     var current_itin = 'itinerary' + count;
//                                     // console.log(itinCount);
//                                     document.getElementById(current_itin).src = img_url;
//                                     count++;

                                    
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }   
//         }

//     }
// }