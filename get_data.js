let xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "https://zeevox.net/summer-project/server/get.php", false);
xmlHttp.send(null);
let data = JSON.parse(xmlHttp.responseText);

let temperature_row = document.getElementById("temperature_table").insertRow(-1);
let humidity_row = document.getElementById("humidity_table").insertRow(-1);
let pressure_row = document.getElementById("pressure_table").insertRow(-1);

function populate(name, d, row) {
  let cell1 = row.insertCell(-1);
  cell1.innerHTML = name
  let cell2 = row.insertCell(-1);
  cell2.innerHTML = d["v"]
  let cell3 = row.insertCell(-1);
  cell3.innerHTML = d["u"]
  let cell4 = row.insertCell(-1);
  //Javascript timestamps are in milliseconds unlike PHP which is in seconds
  cell4.innerHTML = new Date(d["t"] * 1000).toLocaleTimeString(undefined, { timeZoneName: 'short', hour: '2-digit', minute:'2-digit' })
}

populate("Temperature", data["temp"], temperature_row);
populate("Humidity", data["humidity"], humidity_row);
populate("Pressure", data["pressure"], pressure_row);

let genie = document.getElementById("weather_genie");
var weather = "unknown";
let pressure = data["pressure"]["v"];

if (pressure > 1009.144 && pressure < 1022.689) {
    weather = "partly cloudy 🌤️⛅🌥️";
} else if (pressure > 1022.689) {
    weather = "sunny ☀️";
} else if (pressure < 1009.144) {
    weather = "stormy ⛈️";
}

genie.innerHTML = "The weather genie says that it is currently " + weather;
