
<?php
require_once 'activityDAO.php';
$dao = new activityDAO();

$itineraryID = file_get_contents("php://input");

$jsonData = json_encode($dao->retrieveByItineraryID($itineraryID));
echo $jsonData;

?>

