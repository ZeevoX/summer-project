#!/usr/bin/python3
import os
import json
import time
import base64
import requests
from datetime import datetime

from sense_hat import SenseHat
sense = SenseHat()

def getcputemp():
    temp = os.popen("vcgencmd measure_temp").readline()
    return float(temp[5:-3])

def getroomtemp():
    temp = sense.temp
    return round(temp-(getcputemp()-temp)/2, 2)

def getdata():
    return {"time": int(time.time()),
            "temp": {"v": getroomtemp(), "u": "\u00b0C"},
            "cpu_temp": {"v": getcputemp(), "u": "\u00b0C"},
            "raw_temp": {"v": round(sense.temp, 2), "u": "\u00b0C"},
            "humidity": {"v": round(sense.humidity, 2), "u": "%"},
            "pressure": {"v": round(sense.pressure, 2), "u": "mmHg"}}

def send(data):
    body = {"data": base64.encodestring(json.dumps(data).encode("utf-8"))}
    response = requests.post("https://zeevox.net/summer-project/server/post.php", params=body)

send(getdata())
print(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), "CPU Temp:", getcputemp(), "Room temp:", round(sense.temp, 2), "Calibrated room temp:", getroomtemp())
sense.show_message(str(round(getroomtemp(), 1)) + "'C")
