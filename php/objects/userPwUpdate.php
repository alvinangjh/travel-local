<?php 

include_once '../includes/autoload.php';

$user = file_get_contents('php://input');

$user_decoded = array();

$user_decoded = json_decode($user, true);

$user = new UserDAO();

$status = $user->updateUserPw($user_decoded["email"], $user_decoded["pw"]);

return $status;

?>