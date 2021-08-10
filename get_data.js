const xmlHttp = new XMLHttpRequest()
xmlHttp.open('GET', 'https://zeevox.net/summer-project/server/get.php', false)
xmlHttp.send(null)
const data = JSON.parse(xmlHttp.responseText)

function populate (name, v, u, t, row) {
  const cell1 = row.insertCell(-1)
  cell1.innerHTML = name
  const cell2 = row.insertCell(-1)
  cell2.innerHTML = v
  const cell3 = row.insertCell(-1)
  cell3.innerHTML = u
  const cell4 = row.insertCell(-1)
  // Javascript timestamps are in milliseconds unlike PHP which is in seconds
  const time = new Date(t * 1000)
  cell4.innerHTML =
    time.toLocaleDateString() +
    ' ' +
    time.toLocaleTimeString(undefined, {
      timeZoneName: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
}

function roundnum (s, places) {
  return parseFloat(s).toFixed(places)
}

function createTable (table, d) {
  populate('Current', roundnum(d.v, 1), d.u, d.t, table.insertRow(-1))
  populate(
    'Maximum',
    roundnum(d.max, 1),
    d.u,
    d.maxt,
    table.insertRow(-1)
  )
  populate(
    'Minimum',
    roundnum(d.min, 1),
    d.u,
    d.mint,
    table.insertRow(-1)
  )
}

createTable(document.getElementById('temperature_table'), data.temp)
createTable(document.getElementById('humidity_table'), data.humidity)
createTable(document.getElementById('pressure_table'), data.pressure)

const genie = document.getElementById('weather_genie')
const weather = 'unknown'
const pressure = data.pressure.v

conditions = [
  'stormy ⛈️',
  'heavy rain 🌧️',
  'showers 🌦️',
  'cloudy ☁️',
  'mostly cloudy ⛅',
  'partly cloudy ⛅',
  'mostly sunny 🌤️',
  'sunny ☀️'
]

console.log(conditions)

const low_pressure = 1000
const high_pressure = 1030

if (pressure < low_pressure) {
  condition = 0
} else if (pressure > high_pressure) {
  condition = 6
} else {
  condition =
    ((pressure - low_pressure) / (high_pressure - low_pressure)) *
    (conditions.length - 1)
}

genie.innerHTML =
  'The weather genie says that it is currently ' +
  conditions[roundnum(condition, 0)]
