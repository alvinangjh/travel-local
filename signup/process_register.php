<?php

include_once 'autoload.php';

    $errors = [];

    // Get the data from form processing
    $count = 0;

    $username = $_POST['username'];
    if ( strlen($username) == 0 ){
        $errors[] = "Name cannot be empty nor blank.";
        $count++;
    }

    $password = $_POST['password'];
    if ( strlen($password) == 0 ){
        $errors[] = "Password cannot be empty nor blank.";
        $count++;
    }

    $confirmPassword = $_POST['confirmPassword'];
    if ($password != $confirmPassword){
        $errors[] = "The passwords are different.";
        $count++;
    }
    
    // Check if username is already taken
    $UserDAO = new UserDAO();
    $available = $UserDAO -> get($username);
    if ($available){
        $errors[] = "Username is already taken.";
        $count++;
    }

    // If one or more fields have validation error
    if ($count != 0){
        $status = false;
    }

    // if everything is checked. Create user Object and write to database
    else{
        $hashed = password_hash($password, PASSWORD_DEFAULT);
        $User = new User($username,$hashed);
        $newuser = $UserDAO -> create($User);
        $status = true;
    }


if ( $status ) {
    // success; redirect page
    $_SESSION["login_page"] = $username;
    header("Location: login.php");
    exit();
}
else {
    $_SESSION["login_fail"] = $username;
    $_SESSION["errors"] = $errors;
    header("Location: register.php");
    exit();
}
    
?>
