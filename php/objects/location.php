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
        private $createdBy; // Can change to user


        // constructor with $db as database connection
        public function __construct($locID, $locTitle, $locAddress, $locPostalCode, $locDesc, $recDuration, $rating, $imageUrl, $createdBy) {
            $this->locID = $locID;
            $this->locTitle = $locTitle;
            $this->locAddress = $locAddress;
            $this->locPostalCode = $locPostalCode;
            $this->locDesc = $locDesc;
            $this->recDuration = $recDuration;
            $this->rating = $rating;
            $this->imageUrl = $imageUrl;
            $this->createdBy = $createdBy;
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
    }
?>