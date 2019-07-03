let xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "https://zeevox.net/summer-project/server/get.php", false);
xmlHttp.send(null);
let data = JSON.parse(xmlHttp.responseText);

let temperature_table = document.getElementById("temperature_table");
let humidity_table = document.getElementById("humidity_table");
let pressure_table = document.getElementById("pressure_table");

function populate(name, v, u, t, row) {
  let cell1 = row.insertCell(-1);
  cell1.innerHTML = name
  let cell2 = row.insertCell(-1);
  cell2.innerHTML = v
  let cell3 = row.insertCell(-1);
  cell3.innerHTML = u
  let cell4 = row.insertCell(-1);
  //Javascript timestamps are in milliseconds unlike PHP which is in seconds
  let time = new Date(t * 1000);
  cell4.innerHTML = time.toLocaleDateString() + " " + time.toLocaleTimeString(undefined, { timeZoneName: 'short', hour: '2-digit', minute:'2-digit' });
}

populate("Current", data["temp"]["v"], data["temp"]["u"], data["temp"]["t"], temperature_table.insertRow(-1));
populate("Maximum", data["temp"]["max"], data["temp"]["u"], data["temp"]["maxt"], temperature_table.insertRow(-1));
populate("Minimum", data["temp"]["min"], data["temp"]["u"], data["temp"]["mint"], temperature_table.insertRow(-1));

populate("Current", data["humidity"]["v"], data["temp"]["u"], data["temp"]["t"], humidity_table.insertRow(-1));
populate("Maximum", data["humidity"]["max"], data["temp"]["u"], data["temp"]["maxt"], humidity_table.insertRow(-1));
populate("Minimum", data["humidity"]["min"], data["temp"]["u"], data["temp"]["mint"], humidity_table.insertRow(-1));

populate("Current", data["pressure"]["v"], data["temp"]["u"], data["temp"]["t"], pressure_table.insertRow(-1));
populate("Maximum", data["pressure"]["max"], data["temp"]["u"], data["temp"]["maxt"], pressure_table.insertRow(-1));
populate("Minimum", data["pressure"]["min"], data["temp"]["u"], data["temp"]["mint"], pressure_table.insertRow(-1));

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
