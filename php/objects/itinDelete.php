
<?php

require_once 'ItineraryDAO.php';
$dao = new itineraryDAO();


$result = json_encode($dao->delete_itinerary();

// {itinName: "fsdfsdfsd", itinType: "Family", startDate: "12-10-2020", endDate: "27-10-2020", userID: 2}

echo $result;

?>
