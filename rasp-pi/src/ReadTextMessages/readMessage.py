import requests 
import time
from subprocess import call
# api-endpoint 
URL = 'http://1c222f26.ngrok.io/api/v1/sms' # change this to actual prod server when using in porduction
cmd_beg= 'espeak '
cmd_end= ' 2>/dev/null &' # To play back the stored .wav file and to dump the std errors to /dev/null

while True:
    try:
        r = requests.get(url = URL)
        if r.status_code == 200:
            data = r.json()
            if len(data) == 1:
                _from = data[0]['from']
                phoneNumber = _from.replace('',',')
                body = data[0]['body']
                date = str(data[0]['timestamp']['minute']['low']) + 'past' + str(data[0]['timestamp']['hour']['low']) 
                text =('You have a new message from {} at {}. {}'.format(phoneNumber, date, body))
                text = text.replace(' ', '_')
                call([cmd_beg+text+cmd_end], shell=True)
                requests.delete(url= URL + '/' +  data[0]['id'])
            elif len(data) > 1:
                text = ('You have {} new messages'.format(len(data)))
                text = text.replace(' ', '_')
                call([cmd_beg+text+cmd_end], shell=True)
                for i, message in enumerate(data):
                    _from = message['from']
                    phoneNumber = _from.replace('',',')
                    body = message['body']
                    date =  str(message['timestamp']['minute']['low'])+ 'past' + str(message['timestamp']['hour']['low'])
                    text = ('Message {} from {} at {}. {}'.format(i+1, phoneNumber, date, body))
                    text = text.replace(' ', '_')
                    call([cmd_beg+text+cmd_end], shell=True)
                    requests.delete(url= URL + '/' + message['id'])
    except:
        pass # Do nothing if you can't retrieve the emdpoint
    time.sleep(10) # Checks 10 seconds
