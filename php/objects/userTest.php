<?php 

include_once 'autoload.php';

$user = file_get_contents('php://input');

$decoded = array();
 
//Decode the JSON string and convert it into a PHP associative array.
$decoded = json_decode($user, true);

// $new_user = new User("", $decoded["firstName"], $decoded["lastName"], $decoded["emailAdd"], $decoded["password"], $decoded["dob"]);

$new_user = new User("", $_POST["firstName"], $_POST["lastName"], $_POST["emailAdd"], $_POST["password"], $_POST["dob"]);

// $new_user = new User("", $decoded->getFirstName(), )
$user = new UserDAO();
// $status = $user->add($new_user);
$status = $user->deleteUser(1);
echo "<script>console.log('Debug Objects: " . $status . "' );</script>";
return $status;



?>