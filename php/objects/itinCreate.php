
<?php

require_once 'ItineraryDAO.php';
$dao = new itineraryDAO();

$data = file_get_contents("php://input");
$new = array();
$new = json_decode($data,true);

$itinName = $new['itinName'];
$startDate = $new['startDate'];
$endDate = $new['endDate'];
$itinType = $new['itinType'];
$userID = $new['userID'];
$result = json_encode($dao->add_itinerary($itinName,$startDate,$endDate,$itinType,$userID));
// ($name, $startDate, $endDate, $itineraryType, $userID)
// echo "<script>alert('Debug Objects: " . $new['itinName'] . "' );</script>";

// {itinName: "fsdfsdfsd", itinType: "Family", startDate: "12-10-2020", endDate: "27-10-2020", userID: 2}

echo $result;

?>
