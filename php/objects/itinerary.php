<?php

include_once '../includes/autoload.php';

    class Itinerary {
        // object properties
        public $itineraryID;
        public $name;
        public $startDate;
        public $endDate;
        public $userID;
            
        // constructor with $db as database connection
        public function __construct($itineraryID, $name, $startDate, $endDate, $userID) {
            $this->itineraryID = $itineraryID;
            $this->name = $name;
            $this->startDate = $startDate;
            $this->endDate = $endDate;
            $this->userID = $userID;
        }

        public function getItineraryID(){
            return $this->itineraryID;
        }

        public function getName(){
            return $this->name;
        }

        public function getStartDate(){
            return $this->startDate;
        }

        public function getEndDate(){
            return $this->endDate;
        }

        public function getUserID(){
            return $this->userID;
        }
    }
?>