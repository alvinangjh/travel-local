<?php

include_once '../includes/autoload.php';

class LocationDAO {
    
    //locID	locTitle	locAddress	locPostalCode	locDesc	recDuration	rating	imageUrl	createdBy
    public function add($location) {
    
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection();
        $sql = 'INSERT INTO custom_loc (locID, locTitle, locAddress, locPostalCode, locDesc, recDuration, rating, imageUrl, createdBy, latitude, longitude, venueType, businessContact, businessEmail, businessHrs, businessWeb)
        VALUES (:locID, :locTitle, :locAddress, :locPostalCode, :locDesc, :recDuration, :rating, :imageUrl, :createdBy, :latitude, :longitude, :venueType, :businessContact, :businessEmail, :businessHrs, :businessWeb)';
        $stmt = $pdo->prepare($sql); 

        $locID = $location->getLocID(); 
        $locTitle = $location->getLocTitle(); 
        $locAddress = $location->getLocAddress(); 
        $locPostalCode = $location->getLocPostalCode(); 
        $locDesc = $location->getLocDesc(); 
        $recDuration = $location->getRecDuration(); 
        $rating = $location->getRating(); 
        $imageUrl = $location->getImageUrl(); 
        $createdBy = $location->getCreatedBy(); 
        $latitude = $location->getLatitude(); 
        $longitude = $location->getLongitude(); 
        $venueType = $location->getVenueType(); 
        $businessContact = $location->getBusinessContact(); 
        $businessEmail = $location->getBusinessEmail(); 
        $businessHrs = $location->getBusinessHrs(); 
        $businessWeb = $location->getBusinessWeb(); 

        $stmt->bindParam(':locID', $locID, PDO::PARAM_INT);
        $stmt->bindParam(':locTitle', $locTitle, PDO::PARAM_STR);
        $stmt->bindParam(':locAddress', $locAddress, PDO::PARAM_STR);
        $stmt->bindParam(':locPostalCode', $locPostalCode, PDO::PARAM_INT);
        $stmt->bindParam(':locDesc', $locDesc, PDO::PARAM_STR);
        $stmt->bindParam(':recDuration', $recDuration, PDO::PARAM_INT);
        $stmt->bindParam(':rating', $rating, PDO::PARAM_INT);
        $stmt->bindParam(':imageUrl', $imageUrl, PDO::PARAM_STR);
        $stmt->bindParam(':createdBy', $createdBy, PDO::PARAM_INT);
        $stmt->bindParam(':latitude', $latitude, PDO::PARAM_STR);
        $stmt->bindParam(':longitude', $longitude, PDO::PARAM_STR);
        $stmt->bindParam(':venueType', $venueType, PDO::PARAM_STR);
        $stmt->bindParam(':businessContact', $businessContact, PDO::PARAM_INT);
        $stmt->bindParam(':businessEmail', $businessEmail, PDO::PARAM_STR);
        $stmt->bindParam(':businessHrs', $businessHrs, PDO::PARAM_STR);
        $stmt->bindParam(':businessWeb', $businessWeb, PDO::PARAM_STR);

        try {
            $stmt->execute();
            $stmt = null;
            $pdo = null;
            return "Success";
        } catch (Exception $e) {
            return $e;
        }
    }
}

?>