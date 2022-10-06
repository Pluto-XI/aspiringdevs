<?php
if (!empty($_POST["location-data"])) {
    include_once './includes/get_weather.php';
} else {
    echo " ";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather</title>
    <link rel="stylesheet" href="./css/styles.css?v=<?php echo time(); //CSS doesn't work without this? 
                                                    ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
</head>


<body>
    <header>
    <h1>Weather</h1>
    <form id="weather-form" action="index.php" method="POST">
        <label for="location-data">Enter a location: </label>
        <input type="text" name="location-data" id="location-form" placeholder="Zipcode, Coordinates, IP, or name" />
        <label for="forecast-days">How many days in forecast?</label>
        <select name="forecast-days" class="dropdown">
            <?php
            //Populate amount of days, free plan of API only allows 3
            for ($i = 0; $i < 3; $i++) {
                echo '<option value=' . ($i + 1) . ">" . ($i + 1) . "</option>";
            }
            ?>
        </select>
        <div class="form-radio">
        <label for="farenheit">Farenheit</label>
        <input type="radio" id="farenheit" value="f" name="unit" checked="checked" />
        <label for="celsius">Celsius</label>
        <input type="radio" value="c" name="unit" id="celsius" />
        </div>
        <input type="submit" value="Submit" id="submit-btn" />
    </form>
    </header>
    <main>

    <?php 
    if (!empty($_POST["location-data"])) {
    echo '<div class="current-temp-card">
        <div class="card-header">
            <p class="card-title">' . "$location_name, $region_name $country_name" . '</p>
        </div>
        <div class="current-body">
            <div>
                <p class="display">' . $current_day_temp . '&#176;' . '</p>
                <p class="sub-display">UV index: ' . $uv_index . '</p>
                <p class="sub-display">Humidity: ' . $current_humidity . '% </p>
            </div>
            <div class="current-icon">
                <img class="display-img" src="' . $current_image . '" />
                <p class="sub-display">' . $current_text . '</p>
            </div>
        </div>
    </div>
<div class="forecast-container">';

    if (!empty($_POST["location-data"]) && $form_days > 1) {
        echo "<h2>Forecast</h2>";
        forecast($jsonobj, $form_days, $temp_max, $temp_avg, $temp_min, $temp_system);
    } else {
        echo " ";
    }
echo '</div>';
    };
?>
    </main>
</body>

</html>