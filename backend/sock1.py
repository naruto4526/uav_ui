import socket
import ctypes
import json
import

class message_t(ctypes.Structure):
    _fields_ = [
        ("packet_id", ctypes.c_int),
        ("x", ctypes.c_float),
        ("y", ctypes.c_float),
        ("z", ctypes.c_float)
    ]

transmit = message_t()
receive = message_t()

def json_to_struct(data, struct_type):
    struct = struct_type()
    for field, _ in struct._fields_:
        setattr(struct, field, data[field])
    return struct

# Convert JSON to a ctypes struct


with socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM) as sock:
    sock.bind(("127.0.0.1", 20001))
    print("Server started...")
    
    while True:

        data = sock.recv(1024).decode()
        jsonData = json.loads(data)

        # print(jsonData["packet_id"])
        my_struct = json_to_struct(jsonData, message_t)
        print(my_struct.x)
        # C-Style Struct
        # data = sock.recv_into(receive, ctypes.sizeof(message_t))
        # print(f"Data: {receive.packet_id, receive.x, receive.y, receive.z}")
        # print(f"From: {addr}\nData: {data.decode()}")
        # sock.sendto("Hello Client!".encode(), addr)