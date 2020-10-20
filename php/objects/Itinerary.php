<?php

class itinerary implements \JsonSerializable {

    private $itineraryID;
    private $name;
    private $startDate;
    private $endDate;
    private $userID;

    public function __construct($itineraryID, $name, $startDate, $endDate, $userID) {
        $this->itineraryID = $itineraryID;
        $this->name = $name;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->userID = $userID;
    }

    public function jsonSerialize(){
        if (!isset($json)) $json = new stdClass();
        foreach ($this as $key => $value){
            
            $json->$key = $value;
        }
        return $json;
    }

    public function getItineraryID() {
        return $this->itineraryID;
    }

    public function getName() {
        return $this->name;
    }

    public function getStartDate() {
        return $this->startDate;
    }

    public function getEndDate() {
        return $this->endDate;
    }

    public function getUserID() {
        return $this->userID;
    }

    public function __toString() { //Requires update to Itinerary Ver
        $statusMsg = 'available for adoption';
        if( $this->status == 'P' ) {
            $statusMsg = 'pending adoption';
        }

        $prefix = 'Miss';
        if( $this->gender = 'M' ) {
            $prefix = 'Mister';
        }

        return $prefix . ' ' . $this->name . ' is ' . $this->age . ' years old and ' . $statusMsg . '.';
    }
}

?>