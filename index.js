var latV = -38.2455615;
var lonV = 141.6251919;
var control;
google.maps.event.addDomListener(window, 'load', intilize);
function intilize() {
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById("txtautocomplete")); //autocomplete stuff     
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        var location = "Address: " + place.formatted_address + "<br/>";
        location += "Latitude: " + place.geometry.location.lat() + "<br/>";
        location += "Longitude: " + place.geometry.location.lng() + "<br/>";
        latV = place.geometry.location.lat(); //latitude
        lonV = place.geometry.location.lng(); //longitude
        control = 1;
        document.getElementById('lblresult').innerHTML = location;
        var weather = new XMLHttpRequest();
        weather.open("GET", "http://api.wunderground.com/api/4850cc440db5c809/conditions/q/" + latV + "," + lonV + ".json", false);
        weather.send(null);
        var r = JSON.parse(weather.response);
        //var dis = "Current location: " + r.current_observation.display_location.full + "  <p>";
        var temp = r.current_observation.temp_c + " &deg;C <p>";
        var wind = r.current_observation.wind_string + "  <p>";
        var precip = r.current_observation.precip_today_string + "  <p>";
        var raining = r.current_observation.precip_today_metric;
        function getWeather(id, res) {
            document.getElementById(id).innerHTML = res;
        }
        //getWeather("weather",dis);
        getWeather("temp", temp);
        getWeather("wind", wind);
        getWeather("precip", precip);
        //getWeather("raining", raining);
        //window.alert(raining);
        if (raining != 0) {
            //window.alert("It's raining!");
            alertify.alert("It's Raining!!!!");
            var bikeBus = "It's raining, you should bus";
            getWeather("bikeBus", bikeBus);
        }
        else {
            //window.alert("It's NOT raining!");
            alertify.alert("It's NOT raining!!!!!");
            var bikeBus = "It's NOT raining, you should bike!";
            getWeather("bikeBus", bikeBus);
        }
        $(function () {
            var note = $('#note'), ts = new Date(2012, 0, 1), newYear = false;
            if ((new Date()) > ts) {
                ts = (new Date()).getTime() + 24 * 60 * 60 * 1000; //counting 24 hours
                newYear = false;
            }
        });
    });
}
;
