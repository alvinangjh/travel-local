<?php

include_once '../includes/autoload.php';

    class Activity {
        // object properties
        public $activityID;
        public $poiUUID;
        public $itineraryID;
            
        // constructor with $db as database connection
        public function __construct($activityID, $poiUUID, $startTime, $endTime, $activityDate, $itineraryID) {
            $this->activityID = $activityID;
            $this->poiUUID = $poiUUID;
            $this->startTime = $startTime;
            $this->endTime = $endTime;
            $this->activityDate = $activityDate;
            $this->itineraryID = $itineraryID;
        }

        public function getActivityID(){
            return $this->activityID;
        }

        public function getPOIUUID(){
            return $this->poiUUID;
        }

        public function getStartTime(){
            return $this->startTime;
        }

        public function getActivityDate(){
            return $this->activityDate;
        }

        public function getEndTime(){
            return $this->endTime;
        }

        public function getItineraryID(){
            return $this->itineraryID;
        }
    }
?>