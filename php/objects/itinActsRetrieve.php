
<?php
// header('Content-Type: application/json');
require_once 'activityDAO.php';
$dao = new activityDAO();

$itineraryIDs = file_get_contents("php://input");
// $itineraryID = $_POST['itineraryID'];
$all_actObj = [];

// foreach ($itineraryIDs as $itineraryID){
//     $jsonData = json_encode($dao->retrieveByItineraryID($itineraryID));
//     $all_actObj[] = $jsonData;
// }

// $jsonData = json_encode($dao->retrieveByItineraryID($itineraryID));
// echo $jsonData;
echo $itineraryIDs;
exit();
?>

