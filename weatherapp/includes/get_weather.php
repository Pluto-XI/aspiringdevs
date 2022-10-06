<?php
$api_key = "0c36d527227f4829942201248220907";

//User inputted data.
$form_location = $_POST["location-data"];
//Check for spaces
$form_location = str_replace(" ", "%20", $form_location);

$form_days = $_POST["forecast-days"];


//Format for user selected temperature system
//REFACTOR THIS, too complicated smh. DRY
$temp_max = "maxtemp_";
$temp_min = "mintemp_";
$temp_avg = "avgtemp_";
$current_temp = "temp_";
$temp_system = $_POST["unit"];
if ($temp_system == "c") {
    $temp_max .= "c";
    $temp_min .= "c";
    $temp_avg .= "c";
    $current_temp .= "c";
} else {
    $temp_max .= "f";
    $temp_min .= "f";
    $temp_avg .= "f";
    $current_temp .= "f";
}


//Format query string for forecast data
$weather_query = "https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${form_location}&days=${form_days}&aqi=no&alerts=no";
$api_response = file_get_contents($weather_query);
$jsonobj  = json_decode($api_response);

// echo "<pre>";
// print_r($jsonobj);
// echo "</pre>";

//Location
$location_name = $jsonobj->location->name;
$region_name = $jsonobj->location->region;
$country_name = $jsonobj->location->country;


//Current
$current_day_temp = $jsonobj->current->{$current_temp};
$uv_index = $jsonobj->current->uv;
$current_image = $jsonobj->current->condition->icon;
$current_text = $jsonobj->current->condition->text;
$current_humidity = $jsonobj->current->humidity;

//Format forecast days.
function forecast($jsonobj, $form_days, $temp_max, $temp_avg, $temp_min, $temp_system)
{
    if ($form_days > 1) {
        for ($i = 0; $i < $form_days; $i++) {
            $forecast_date = $jsonobj->forecast->forecastday[$i]->date;
            $forecast_max_temp = $jsonobj->forecast->forecastday[$i]->day->{$temp_max};
            $forecast_min_temp = $jsonobj->forecast->forecastday[$i]->day->{$temp_min};
            $forecast_avg_temp = $jsonobj->forecast->forecastday[$i]->day->{$temp_avg};

            $text = $jsonobj->forecast->forecastday[$i]->day->condition->text;
            $picture = $jsonobj->forecast->forecastday[$i]->day->condition->icon;

            //Forecast day cards
            echo "<div class=\"forecast-day-card\">";
            echo "<img src=\"$picture\" />";
            echo "<p>$text</p>";
            echo "<p class=\"sub-display\">High: $forecast_max_temp" . '&#176;' . "</p>";
            echo "<p class=\"sub-display\">Low: $forecast_min_temp" . '&#176;' . "</p>";
            echo "<p class=\"sub-display\">Avg: $forecast_avg_temp" . '&#176;' . "</p>";
            echo "<p>$forecast_date</p>";
            echo "</div>";
        }
    }
}


//To avoid redirect, action the same page.
//If form data exists, show result, otherwise show nothing.
