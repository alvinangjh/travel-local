<?php

include_once 'autoload.php';

    class Location {
        // object properties
        private $locID;
        private $locTitle;
        private $locAddress;
        private $locPostalCode;
        private $locDesc;
        private $recDuration;
        private $rating;
        private $imageUrl;
        private $createdBy;
        private $latitude;
        private $longitude;
        private $venueType;
        private $businessContact;
        private $businessEmail;
        private $businessHrs;
        private $businessWeb;


        // constructor with $db as database connection
        public function __construct($locID, $locTitle, $locAddress, $locPostalCode, $locDesc, $recDuration, $rating, $imageUrl, $createdBy, $latitude, $longitude, $venueType, $businessContact, $businessEmail, $businessHrs, $businessWeb) {
            $this->locID = $locID;
            $this->locTitle = $locTitle;
            $this->locAddress = $locAddress;
            $this->locPostalCode = $locPostalCode;
            $this->locDesc = $locDesc;
            $this->recDuration = $recDuration;
            $this->rating = $rating;
            $this->imageUrl = $imageUrl;
            $this->createdBy = $createdBy;
            $this->latitude = $latitude;
            $this->longitude = $longitude;
            $this->venueType = $venueType;
            $this->businessContact = $businessContact;
            $this->businessEmail = $businessEmail;
            $this->businessHrs = $businessHrs;
            $this->businessWeb = $businessWeb;
        }

        public function getLocID(){
            return $this->locID;
        }

        public function getLocTitle(){
            return $this->locTitle;
        }

        public function getLocAddress(){
            return $this->locAddress;
        }

        public function getLocPostalCode(){
            return $this->locPostalCode;
        }

        public function getLocDesc(){
            return $this->locDesc;
        }

        public function getRecDuration(){
            return $this->recDuration;
        }

        public function getRating(){
            return $this->rating;
        }

        public function getImageUrl(){
            return $this->imageUrl;
        }

        public function getCreatedBy(){
            return $this->createdBy;
        }

        public function getLatitude(){
            return $this->latitude;
        }

        public function getLongitude(){
            return $this->longitude;
        }

        public function getVenueType(){
            return $this->venueType;
        }

        public function getBusinessContact(){
            return $this->businessContact;
        }

        public function getBusinessEmail(){
            return $this->businessEmail;
        }

        public function getBusinessHrs(){
            return $this->businessHrs;
        }

        public function getBusinessWeb(){
            return $this->businessWeb;
        }
    }
?>