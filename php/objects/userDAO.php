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
        $conn = new ConnectionManager();
        $pdo = $conn->getConnection();

        $sql = "DELETE from User where userID = :userID";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':userID', $userID, PDO::PARAM_INT);

        $isOK = $stmt->execute();
        $stmt=null;
        $pdo = null;

        return $isOK;
    }
}
?>