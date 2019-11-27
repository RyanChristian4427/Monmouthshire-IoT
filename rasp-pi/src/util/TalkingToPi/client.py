import socket
import pyttsx3
import speech_recognition as sr

HOST_NAME = socket.gethostname() 
HOST_ADDRESS = socket.gethostbyname(HOST_NAME)  # Enter IP or Hostname of your server
PORT = 12345 # Pick an open Port (1000+ recommended), must match the server port

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST_ADDRESS,PORT))

engine= pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voices', voices[1].id)

recognizer = sr.Recognizer()
mic = sr.Microphone()
#Lets loop awaiting for your input
while True:
	engine.say('please say command')
	engine.runAndWait()
	with mic as source:
		recognizer.adjust_for_ambient_noise(source)
		audio = recognizer.listen(source)

	command = {
		'success': True,
		'error': None,
		'transcription': None
	}
	try:
		command['transcription'] = recognizer.recognize_google(audio)
		s.send(command['transcription'].encode())
		reply = s.recv(1024).decode()
		if reply == 'Terminating':
			engine.say('Goodbye')
			engine.runAndWait()
			break
		engine.say(reply)
		engine.runAndWait()
	except sr.RequestError:
		# API was unreachable or unresponsive
		command['success'] = False
		command['error'] = 'API unavailable'
		engine.say('I am sorry, but I am unable to connect to the API. Please contact system administrator')
		engine.runAndWait()
	except sr.UnknownValueError:
		# speech was unintelligible
		command['error'] = 'Unable to recognize speech'
		engine.say(command['error'])
		engine.runAndWait()
	print(command)
	
