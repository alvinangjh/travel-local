<?php 

include_once 'autoload.php';

$location = file_get_contents('php://input');

$decoded = array();
 
//Decode the JSON string and convert it into a PHP associative array.
$decoded = json_decode($location, true);

$new_location = new Location("", $decoded["locTitle"], $decoded["locAddress"], $decoded["locPostalCode"], $decoded["locDesc"], $decoded["recDuration"],  $decoded["rating"], $decoded["imageUrl"], "", $decoded["latitude"], $decoded["longitude"], $decoded["venueType"], $decoded["businessContact"], $decoded["businessEmail"], $decoded["businessHrs"], $decoded["businessWeb"]);
echo "<script>console.log('Debug Objects: " .  $decoded["latitude"] . "' );</script>";
// (locID, locTitle, locAddress, locPostalCode, locDesc, recDuration, rating, imageUrl, createdBy)

// $new_user = new User("", $decoded->getFirstName(), )
$location = new LocationDAO();
$status = $location->add($new_location);
echo "<script>console.log('Debug Objects: " . $status . "' );</script>";
return $status;

?>