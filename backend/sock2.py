import socket
import ctypes
import random
import json

class message_t(ctypes.Structure):
    _fields_ = [
        ("packet_id", ctypes.c_int),
        ("x", ctypes.c_float),
        ("y", ctypes.c_float),
        ("z", ctypes.c_float)
    ]

transmit = message_t()
receive = message_t()

transmit.packet_id += 1
transmit.x = 2.13 * random.randint(1, 10)
transmit.y = transmit.x * random.randint(1, 5)
transmit.z = transmit.y * 7.333

def struct_to_dict(struct):
    result = {}
    for field, _ in struct._fields_:
        value = getattr(struct, field)
        if isinstance(value, bytes):
            value = value.decode()
        elif isinstance(value, ctypes.Array):
            value = list(value)
        result[field] = value
    return result

transmitDict = struct_to_dict(transmit)

# transmitDict = {"x":transmit.x, "y":transmit.y, "z":transmit.z, "packet_id":transmit.packet_id}
json_data = json.dumps(transmitDict)

with socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM) as sock:
    sock.connect(("127.0.0.1", 41234))
    
    sock.sendall(json_data.encode('utf-8'))
    
    # data, addr = sock.recvfrom(1024)
    # print(f"From: {addr}\nData: {data.decode()}")