<?php

include_once 'autoload.php';

class LocationDAO {
    
    //locID	locTitle	locAddress	locPostalCode	locDesc	recDuration	rating	imageUrl	createdBy
    public function add($location) {
    
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection();
        $sql = 'INSERT INTO custom_loc (locID, locTitle, locAddress, locPostalCode, locDesc, recDuration, rating, imageUrl, createdBy)
                VALUES (:locID, :locTitle, :locAddress, :locPostalCode, :locDesc, :recDuration, :rating, :imageUrl, :createdBy)';
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

        $stmt->bindParam(':locID', $locID, PDO::PARAM_INT);
        $stmt->bindParam(':locTitle', $locTitle, PDO::PARAM_STR);
        $stmt->bindParam(':locAddress', $locAddress, PDO::PARAM_STR);
        $stmt->bindParam(':locPostalCode', $locPostalCode, PDO::PARAM_INT);
        $stmt->bindParam(':locDesc', $locDesc, PDO::PARAM_STR);
        $stmt->bindParam(':recDuration', $recDuration, PDO::PARAM_INT);
        $stmt->bindParam(':rating', $rating, PDO::PARAM_INT);
        $stmt->bindParam(':imageUrl', $imageUrl, PDO::PARAM_STR);
        $stmt->bindParam(':createdBy', $createdBy, PDO::PARAM_INT);

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