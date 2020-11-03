<?php 

include_once 'autoload.php';

$user = file_get_contents('php://input');

//echo "<script>console.log('Debug Objectsssssss: " . $_POST["email"] . "' );</script>";
$userdao = new UserDAO();
$user = $userdao->get($_POST["email"]);
$password = $_POST["password"];

// if ($user == "Success"){
//     echo "<script>console.log('Debug Objects: " . $user . "' );</script>";
//     exit;
// 
// else
//     echo "<script>console.log('Debug Objects: " . $user . "' );</script>";
//     exit;
// 

if ($user){
    // If username exists
    // get the hashed password from the database
    // Match the hashed password with the one which user entered
    // if it does not match. -> error
    $hashed = $user -> getPasswordHash();
    $status = password_verify($password,$hashed);
    //echo "<script>console.log('Debug Objects: " . $status . "' );</script>";
    // check if the plain text password is valid
    
    if ($status){ 
        echo "POI_CREATE.html";
        exit;
    }

    else{
        echo "fail";
        exit;
    }
}
else{
    echo "fail";
    exit;  
}


?>