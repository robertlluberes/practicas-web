$(document).ready(function () {
    getDate();
    getLocation();
});

var latitude = "";
var longitude = "";
var baseTemperature = 0; //kelvin grades
var $grades = $("#grades");
var $isCelcius = $('#isCelcius');
var $weather = $("#weatherConditions");
var $icon = $("#icon");

function getLocation() {
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

                getForescastWeather(latitude, longitude);
            }
        }); //End of AJAX
    }, function (error) {
        if (error.code == error.PERMISSION_DENIED)
            $weather.text("Error: please share your location.");
        else
            $weather.text("error: " + error.message);
    }
    ); //End of navigator.geolocation.getCurrentPosition
} //End of getLocation()

function getForescastWeather(latitude, longitude) {

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
            baseTemperature = data.main.temp;
            GradesConverter(baseTemperature, isCelcius);
            $icon.attr("src", "http://www.openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            $weather.text(data.weather[0].description).css("text-transform:capitalize");
        },
        error(ex) {
            $weather.text(ex.message);
        }
    });

} //End of getForescastWeather

function GradesConverter(kelvinGrades, isCelcius) {
    if(kelvinGrades > 0){
        if ($isCelcius.is(':checked')) {

            var celciusGrades = Math.round(kelvinGrades - 273);
            $grades.text(celciusGrades).fadeOut('slow').hide().fadeIn();
            $grades.append('<span>°</span>');
    
        } else {
    
            var farenheitGrades = Math.round(9 / 5 * (kelvinGrades - 273) + 32);
            $grades.text(farenheitGrades).fadeOut('slow').hide().fadeIn();
            $grades.append('<span>°</span>');
        }
    }
} //End of convertGrades


$isCelcius.click(function () {
    GradesConverter(baseTemperature, isCelcius);
});


function getDate() {
    var currentDate = new Date();
    var weekDay = getWeekDay(currentDate);
    var monthName = getMonthName(currentDate)
    var dayOfMonth = currentDate.getDate();
    var year = currentDate.getFullYear();

    $("#date").text(weekDay + ", " + monthName + " " + dayOfMonth + " " + year);
}

function getWeekDay(date) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[date.getDay()]
}

function getMonthName(date) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[date.getMonth()]
}