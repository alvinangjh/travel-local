<?php 

include_once '../includes/autoload.php';

$user = file_get_contents('php://input');

$decoded = array();

$decoded = json_decode($user, true);

$new_user = new User("", $decoded["firstName"], $decoded["lastName"], $decoded["emailAdd"], $decoded["password"], $decoded["dob"]);

//$new_user = new User("", $_POST["firstName"], $_POST["lastName"], $_POST["emailAdd"], $_POST["password"], $_POST["dob"]);

$user = new UserDAO();
$status = $user->add($new_user);
echo "<script>console.log('Debug Objects: " . $status . "' );</script>";
return $status;

?>