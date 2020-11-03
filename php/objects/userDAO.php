<?php

include_once '../includes/autoload.php';

class UserDAO {

    public function add($user) {
    
        $connMgr = new Connection();
        $pdo = $connMgr->getConnection();
        $sql = 'INSERT INTO user (userID, firstName, lastName, emailAddress, password, dob)
                VALUES (:userID, :firstName, :lastName, :emailAdd, :password, :dob)';
        $stmt = $pdo->prepare($sql); 

        $userID = $user->getUserID(); 
        $firstName = $user->getFirstName(); 
        $lastName = $user->getLastName(); 
        $emailAdd = $user->getEmailAdd(); 
        $password = $user->getPassword(); 
        $dob = $user->getDOB(); 

        // echo "<script>console.log('Debug Objects: " . $userID . "' );</script>";
        // echo "<script>console.log('Debug Objects: " . $firstName . "' );</script>";
        // echo "<script>console.log('Debug Objects: " . $lastName . "' );</script>";
        // echo "<script>console.log('Debug Objects: " . $emailAdd . "' );</script>";
        // echo "<script>console.log('Debug Objects: " . $password . "' );</script>";
        // echo "<script>console.log('Debug Objects: " . $dob . "' );</script>";

        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
        $stmt->bindParam(':firstName', $firstName, PDO::PARAM_STR);
        $stmt->bindParam(':lastName', $lastName, PDO::PARAM_STR);
        $stmt->bindParam(':emailAdd', $emailAdd, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        $stmt->bindParam(':dob', $dob, PDO::PARAM_STR);

        try {
            $stmt->execute();
            $stmt = null;
            $pdo = null;
            return "Success";
        } catch (Exception $e) {
            return $e;
        }
    }

    public function deleteUser($userID){
        $pdo = $conn->getConnection();

        $sql = "DELETE from User where userID = :userID";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);

        $isOK = $stmt->execute();
        $stmt=null;
        $pdo = null;

        return $isOK;
    }

    public function retrieveAll() {
        $connMgr = new Connection();
        $conn = $connMgr->getConnection();

        $sql = "SELECT * FROM User";
        $stmt = $conn->prepare($sql);
        
        $status = $stmt->execute();

        $users = [];
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        while( $row = $stmt->fetch() ) {
            $users[] = new User(
                $row["userID"], 
                $row["firstName"],
                $row["lastName"],
                $row["emailAddress"],
                $row["password"],
                $row["dob"]
            );
        }


        $stmt = null;
        $conn = null;

        return $users;
    }

    // input first parameter userID for searching which row to update, rest of the parameters are for you to input new values to update
    
    public function updateUser($userID, $firstName, $lastName,$emailAddress,$password,$dob) {
        // STEP 1
        $connMgr = new Connection();
        $conn = $connMgr->getConnection();

        // STEP 2
        $sql = "UPDATE
                    User
                SET
                    firstName = :firstName
                    lastName = :lastName
                    emailAddress = :emailAddress
                    password = :password
                    dob = :dob

                WHERE 
                    userID = :userID";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
        $stmt->bindParam(':firstName', $firstName, PDO::PARAM_STR);
        $stmt->bindParam(':lastName', $lastName, PDO::PARAM_STR);
        $stmt->bindParam(':emailAddress', $emailAddress, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        $stmt->bindParam(':dob', $dob, PDO::PARAM_STR);


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
}
?>