#!/usr/bin/python3
import json
import time
import base64
import requests

# Set this to True if testing the code on a device without a sense hat
DEBUG = False

if not DEBUG:
    from sense_hat import SenseHat
    sense = SenseHat()

def getdata():
    if not DEBUG:
        return {"time": int(time.time()), "temp": {"v": sense.temp, "u": "\u00b0C"}, "humidity": {"v": sense.humidity, "u": "%"}, "pressure": {"v": sense.pressure, "u": "mmHg"}}
    else:
        return {"time": int(time.time()), "temp": {"v": 23.3563743, "u": "\u00b0C"}, "humidity": {"v": 64.7438325, "u": "%"}, "pressure": {"v": 1014.0276923, "u": "mmHg"}}

#def record():
#    with open('values.csv', 'a') as file:
#        writer = csv.writer(file)
#        if DEBUG:
#            writer.writerow([int(time.time()), 23.3563743, 64.7438325, 1014.0276923])
#        else:
#            writer.writerow([int(time.time()), sense.temp, sense.humidity, sense.pressure])
#    file.close()

def send(data):
    body = {"data": base64.encodestring(json.dumps(data).encode("utf-8"))}
    response = requests.post("https://zeevox.net/summer-project/server/post.php", params=body)


while True:
    send(getdata())
    #record()
    time.sleep(60)
    print("tick", int(time.time()))
