<?php

class activity implements \JsonSerializable {

    private $activityID;
    private $poiUUID;

    public function __construct($activityID,$poiUUID) {
        $this->activityID = $activityID;
        $this->poiUUID = $poiUUID;
    }

    public function jsonSerialize(){
        if (!isset($json)) $json = new stdClass();
        foreach ($this as $key => $value){
            
            $json->$key = $value;
        }
        return $json;
    }

    public function getActivityID() {
        return $this->activityID;
    }

    public function getPoiUUID() {
        return $this->name;
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