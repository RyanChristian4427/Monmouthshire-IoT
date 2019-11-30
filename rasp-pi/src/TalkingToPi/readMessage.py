import requests 
import time
import pyttsx3
# api-endpoint 
URL = 'http://192.168.0.83:8000/api/v1/sms'

engine= pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)
engine.setProperty('rate', 150)

while True:
        r = requests.get(url = URL)
        data = r.json() 
        for i in data:
            _from = i['from']
            body = i['body']
            date = str(i['timestamp']['hour']['low']) + ':' +str(i['timestamp']['minute']['low'])
            engine.say('You have a new message from {} at {}. {}'.format(_from, date, body))
            engine.runAndWait()
        time.sleep(5)
