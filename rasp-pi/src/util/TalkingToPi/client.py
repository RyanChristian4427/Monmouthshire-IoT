import socket
import pyttsx3

engine= pyttsx3.init()

HOST_NAME = socket.gethostname() 
HOST_ADDRESS = socket.gethostbyname(HOST_NAME)  # Enter IP or Hostname of your server
PORT = 12345 # Pick an open Port (1000+ recommended), must match the server port
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST_ADDRESS,PORT))

#Lets loop awaiting for your input
while True:
	command = input('Enter your command: ')
	s.send(command.encode())
	reply = s.recv(1024).decode()
	if reply == 'Terminating':
		engine.say('Goodbye')
		engine.runAndWait()
		break
	engine.say(reply)
	engine.runAndWait()
