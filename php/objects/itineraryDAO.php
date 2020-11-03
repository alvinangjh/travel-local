<?php

include_once '../includes/autoload.php';

class ItineraryDAO {

    public function retrieveByItineraryID($itineraryID) {
        $connMgr = new Connection();
        $conn = $connMgr->getConnection();

        $sql = "SELECT * FROM itinerary WHERE itineraryID = :itineraryID";
        $stmt = $conn->prepare($sql);
        
        // echo "<script>console.log('Debug Objects: " . $itineraryID . "' );</script>";

        $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_INT);
        
        $status = $stmt->execute();

        // $activity = [];
        // $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // while( $row = $stmt->fetch() ) {
        //     $activity[] = ["activityID" => $row["activityID"], 
        //         "poiUUID" => $row["poiUUID"],
        //         "itineraryID" => $row["itineraryID"]];
        // }

        $itineraries = [];
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        while( $row = $stmt->fetch() ) {

            $timestamp = strtotime($row["startDate"]);
            $startDate = date('d M Y', $timestamp);

            $timestamp = strtotime($row["endDate"]);
            $endDate = date('d M Y', $timestamp);

            $itinerary = new Itinerary(
                $row["itineraryID"],
                $row["name"],
                $startDate,
                $endDate,
                $row["userID"]
            );
            $itineraries[] = $itinerary;
        }
        
        $stmt = null;
        $conn = null;

        return $itineraries;
    }

    public function add($itinerary) {
    
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection();
        $sql = 'INSERT INTO itinerary (itineraryID, name, startDate, endDate, userID)
                VALUES (:itineraryID, :name, :startDate, :endDate, :userID)';
        $stmt = $pdo->prepare($sql); 

        $itineraryID = $itinerary->getItineraryID(); 
        $name = $itinerary->getName(); 
        $startDate = $itinerary->getStartDate(); 
        $endDate = $itinerary->getEndDate();
        $userID = $itinerary->getUserID(); 

        $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_INT);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':startDate', $startDate, PDO::PARAM_STR);
        $stmt->bindParam(':endDate', $endDate, PDO::PARAM_STR);
        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);

        try {
            $stmt->execute();
            $stmt = null;
            $pdo = null;
            return "Success";
        } catch (Exception $e) {
            return $e;
        }
    }

    public function updateItinerary($itineraryID, $name, $startDate, $endDate) {
        // STEP 1
        $connMgr = new Connection();
        $conn = $connMgr->getConnection();

        // STEP 2
        $sql = "UPDATE itinerary SET name = :name, startDate = :startDate, endDate = :endDate WHERE itineraryID = :itineraryID";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_INT);
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':startDate', $startDate, PDO::PARAM_STR);
        $stmt->bindParam(':endDate', $endDate, PDO::PARAM_STR);
        

        // STEP 3
        if( $stmt->execute() ) {
            // STEP 4
            $stmt = null;
            $conn = null;
            return true;
        }

        // STEP 4
        return false;
    }

    public function deleteItinerary($itineraryID){
        $conn = new Connection();
        $pdo = $conn->getConnection();

        $sql = "DELETE from itinerary where itineraryID = :itineraryID";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_INT);

        $isOK = $stmt->execute();
        $stmt=null;
        $pdo = null;

        return $isOK;
    }
}
?>