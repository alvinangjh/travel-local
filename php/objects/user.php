<?php

include_once 'autoload.php';

    class User {
        // object properties
        private $userID;
        private $firstName;
        private $lastName;
        private $emailAdd;
        private $password;
        private $dob;
            
        // constructor with $db as database connection
        public function __construct($userID, $firstName, $lastName, $emailAdd, $password, $dob) {
            $this->userID = $userID;
            $this->firstName = $firstName;
            $this->lastName = $lastName;
            $this->emailAdd = $emailAdd;
            $this->password = $password;
            $this->dob = $dob;
        }

        public function getUserID(){
            return $this->userID;
        }

        public function getFirstName(){
            return $this->firstName;
        }

        public function getLastName(){
            return $this->lastName;
        }

        public function getEmailAdd(){
            return $this->emailAdd;
        }

        public function getPassword(){
            return $this->password;
        }

        public function getDOB(){
            return $this->dob;
        }
    }
?>