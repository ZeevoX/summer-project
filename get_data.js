let xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "https://zeevox.net/summer-project/server/get.php", false);
xmlHttp.send(null);
let data = JSON.parse(xmlHttp.responseText);

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

function onedp(s) {
  return parseFloat(s).toFixed(1);
}

function createTable(table, d) {
  populate("Current",  onedp(d["v"]),  d["u"],  d["t"], table.insertRow(-1));
  populate("Maximum",  onedp(d["max"]),  d["u"],  d["maxt"], table.insertRow(-1));
  populate("Minimum",  onedp(d["min"]),  d["u"],  d["mint"], table.insertRow(-1));
}

createTable(document.getElementById("temperature_table"), data["temp"]);
createTable(document.getElementById("humidity_table"), data["humidity"]);
createTable(document.getElementById("pressure_table"), data["pressure"]);

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
