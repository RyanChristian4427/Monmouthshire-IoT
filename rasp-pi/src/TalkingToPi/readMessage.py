import requests 
import time
import pyttsx3
import socket
# api-endpoint 
URL = 'http://6759439e.ngrok.io/api/v1/sms' # change this to actual prod server when using in porduction
engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)
engine.setProperty('rate', 150)

while True:
    r = requests.get(url = URL)
    data = r.json()
    print(data)
    if len(data) == 1:
        _from = data[0]['from']
        body = data[0]['body']
        date = str(data[0]['timestamp']['hour']['low']) + ':' +str(data[0]['timestamp']['minute']['low'])
        engine.say('You have a new message from {} at {}. {}'.format(_from, date, body))
        engine.runAndWait()
        # requests.delete(url= URL + '/' +  data[0]['id'])
    elif len(data) > 1:
        engine.say('You have {} new messages'.format(len(data)))
        engine.runAndWait()
        for i, message in enumerate(data):
            print(message['id'])
            _from = message['from']
            body = message['body']
            date = str(message['timestamp']['hour']['low']) + ':' +str(message['timestamp']['minute']['low'])
            engine.say('Message {} from {} at {}. {}'.format(i+1, _from, date, body))
            engine.runAndWait()
            # requests.delete(url= URL + '/' + message['id']) 
    time.sleep(5) # checks every minute
