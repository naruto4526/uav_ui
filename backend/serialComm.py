# import sys
# import serial

#print(sys.argv[1], sys.argv[2]);
# print('hello world');
# f = open("myfile.txt", "w");
# f.write("hehe this works")
# f.close() 
# ser = serial.Serial()
# ser.baudrate = 115200
# ser.port = 'COM5'
# ser.open()
 

# ser.write(bytes(b'message'))
 
# total = 0

# ser.close()

#! /usr/bin/env python3

# import serial
# import time


# MAX_BUFF_LEN = 255
# SETUP 		 = False
# port 		 = None

# prev = time.time()
# while(not SETUP):
# 	try:
# 		# 					 Serial port(windows-->COM), baud rate, timeout msg
# 		port = serial.Serial("COM5", 115200, timeout=1)

# 	except: # Bad way of writing excepts (always know your errors)
# 		if(time.time() - prev > 2): # Don't spam with msg
# 			print("No serial detected, please plug your uController")
# 			prev = time.time()

# 	if(port is not None): # We're connected
# 		SETUP = True


# # read one char (default)
# def read_ser(num_char = 1):
# 	string = port.read(num_char)
# 	return string.decode()

# # Write whole strings
# def write_ser(cmd):
# 	cmd = cmd + '\n'
# 	port.write(cmd.encode())

# # Super loop
# while(1):
# 	string = read_ser(MAX_BUFF_LEN)
# 	if(len(string)):
# 		print(string)

# 	cmd = input('give input ') # Blocking, there're solutions for this ;)
# 	if(cmd):
# 		write_ser(cmd)

import serial

ser = serial.Serial(
        port = 'COM13',
        baudrate = 9600,
        timeout = 10,
        xonxoff = False
)

val = 0
command = ''
command = input("Enter command: ")
command += str('\n')
val = ser.write(command.encode(encoding = 'ascii', errors = 'strict'))
print("Bytes written: ", val)
in_data = ''
in_data = ser.read_until(b'}')
print(in_data)