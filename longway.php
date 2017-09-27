<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "longwaydb";
$sum = 0;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM submissions";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $sum += $row["Distance"];

    }

    print json_encode($sum); 

} else {
    echo "0 results";
}
$conn->close();
?>
