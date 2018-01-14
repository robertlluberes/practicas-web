$(document).ready(function () {
    getLocation();
    setTimeout(getForescastWeather, 3000);

    navigator.geolocation.watchPosition(function (position) {
        console.log("i'm tracking you!");
        console.log(position);
    },
        function (error) {
            if (error.code == error.PERMISSION_DENIED)
                console.log("you denied me :-(");
        });
});

var latitude = "";
var longitude = "";
var $grades = $("#grades");
var $isCelcius = $('#isCelcius');

function getLocation() {
    if (!("geolocation" in navigator)) {
        console.log("Geolocation is not enabled");
    } else {
        var $country = $("#country");
        var $city = $("#city");

        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true",
                success: function (data) {
                    $city.text(data.results[0].address_components[3].long_name);
                    $country.text(data.results[0].address_components[4].long_name);
                }
            }); //End of AJAX
        }); //End of navigator.geolocation.getCurrentPosition
    }
} //End of getLocation()

function getForescastWeather() {

    var $weather = $("#weatherConditions");
    var $icon = $("#icon");

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=061f24cf3cde2f60644a8240302983f2",
        cache: false,
        beforeSend: function () {
            $("#grades").hide();
            $("#icon").hide();
            $("#weatherConditions").hide();
            $("#loading").fadeIn();
        },
        complete: function () {
            $("#loading").hide();
            $("#grades").fadeIn('slow');
            $("#icon").fadeIn('slow');
            $("#weatherConditions").fadeIn('slow');
        },
        success: function (data) {

            GradesConverter(data.main.temp, isCelcius);

            $icon.attr("src", "http://www.openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            $weather.text(data.weather[0].description).css("text-transform:capitalize");
        },
        error() {
            $weather.text("Error: please share your location");
        }
    });

} //End of getForescastWeather

function GradesConverter(kelvinGrades, isCelcius) {
    if ($isCelcius.is(':checked')) {
        $grades.text(Math.round(kelvinGrades - 273)).fadeOut('slow').hide().fadeIn();
        $grades.append('<span>°</span>');
    } else {
        $grades.text(Math.round(9 / 5 * (kelvinGrades - 273) + 32)).fadeOut('slow').hide().fadeIn();
        $grades.append('<span>°</span>');
    }
} //End of convertGrades


$isCelcius.click(function () {
    getForescastWeather();
});

///------------------------------------------
var currentDate = new Date();

$("#date").text(getWeekDay(currentDate) + ", " + getMonthName(currentDate) + " " + currentDate.getDate() + " " + currentDate.getFullYear());

function getWeekDay(date) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[date.getDay()]
}

function getMonthName(date) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[date.getMonth()]
}