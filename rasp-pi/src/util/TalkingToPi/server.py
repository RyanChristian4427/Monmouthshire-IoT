import socket

HOST_NAME = socket.gethostname() 
HOST_ADDRESS = socket.gethostbyname(HOST_NAME) # Server IP or Hostname
PORT = 12345 # Pick an open Port (1000+ recommended), must match the client sport
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print ('Socket created')

#managing error exception
try:
	s.bind((HOST_ADDRESS, PORT))
	s.listen(5)
	print ('Socket awaiting messages')
	(conn, addr) = s.accept()
	print ('Connected')
except socket.error:
	print ('Bind failed ')
	# awaiting for message
while True:
	data = conn.recv(1024).decode()
	reply = ''

	# process your message
	if data == 'hello':
		reply = 'Hello There!'

	elif data == 'this is important':
		reply = 'OK, I have done the important thing you have asked me!'

	#and so on and on until...
	elif data == 'quit':
		conn.send(b'Terminating')
		break
	else:
		reply = 'Unknown command'
	# Sending reply
	conn.send(reply.encode())
conn.close()