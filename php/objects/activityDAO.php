<?php

include_once 'Activity.php';
include_once 'connection.php';

class ActivityDAO {

    public function retrieveByItineraryID($itineraryID) {
        $connMgr = new Connection();
        $conn = $connMgr->getConnection();

        $sql = "SELECT * FROM activity WHERE activityID = :itineraryID ";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':itineraryID', $itineraryID, PDO::PARAM_INT);
        
        $status = $stmt->execute();

        $activities = [];
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        while( $row = $stmt->fetch() ) {
            $activity = new Activity(
                $row["activityID"], 
                $row["poiUUID"],
            );

            $activities[] = $activity;
        }


        $stmt = null;
        $conn = null;

        return $activities;
    }


}
?>