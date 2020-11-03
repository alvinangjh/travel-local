<?php

include_once '../includes/autoload.php';

class ActivityDAO {

    public function retrieveByItineraryID($itineraryID) {
        $connMgr = new Connection();
        $conn = $connMgr->getConnection();

        $sql = "SELECT * FROM activity WHERE itineraryID = :itineraryID";
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

        $activities = [];
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        while( $row = $stmt->fetch() ) {
            $activity = new Activity(
                $row["activityID"],
                $row["poiUUID"],
                $row["startTime"],
                $row["endTime"],
                $row["activityDate"],
                $row["itineraryID"]
            );
            $activities[] = $activity;
        }


        $stmt = null;
        $conn = null;

        return $activities;
    }

    public function updateActivity($activityID, $activityDate, $startTime, $endTime) {
        // STEP 1
        $connMgr = new Connection();
        $conn = $connMgr->getConnection();

        // STEP 2
        $sql = "UPDATE activity SET activityDate = :activityDate, startTime = :startTime, endTime = :endTime WHERE activityID = :activityID";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':activityID', $activityID, PDO::PARAM_INT);
        $stmt->bindParam(':activityDate', $activityDate, PDO::PARAM_STR);
        $stmt->bindParam(':startTime', $startTime, PDO::PARAM_STR);
        $stmt->bindParam(':endTime', $endTime, PDO::PARAM_STR);
        

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

    public function deleteActivity($activityID){
        $conn = new Connection();
        $pdo = $conn->getConnection();

        $sql = "DELETE from activity where activityID = :activityID";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':activityID', $activityID, PDO::PARAM_INT);

        $isOK = $stmt->execute();
        $stmt=null;
        $pdo = null;

        return $isOK;
    }

    // public function add($itinerary) {
    
    //     $connMgr = new Connection();
    //     $pdo = $connMgr->getConnection();
    //     $sql = 'INSERT INTO itinerary (itineraryID, name, startDate, endDate, userID)
    //             VALUES (:itineraryID, :name, :startDate, :endDate, :userID)';
    //     $stmt = $pdo->prepare($sql); 

    //     $itineraryID = $itinerary->getItineraryID(); 
    //     $name = $itinerary->getName(); 
    //     $startDate = $itinerary->getStartDate(); 
    //     $endDate = $itinerary->getEndDate();
    //     $userID = $itinerary->getUserID(); 

    //     $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_INT);
    //     $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    //     $stmt->bindParam(':startDate', $startDate, PDO::PARAM_STR);
    //     $stmt->bindParam(':endDate', $endDate, PDO::PARAM_STR);
    //     $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);

    //     try {
    //         $stmt->execute();
    //         $stmt = null;
    //         $pdo = null;
    //         return "Success";
    //     } catch (Exception $e) {
    //         return $e;
    //     }
    // }
}
?>