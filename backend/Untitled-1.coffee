


adj_list = {
        "ISO_PERIS(in)":{
            "ISO_PERIS.IP1": [
                [
                    ["port1", "port2"]
                    ["port3", "port4"]
                ]
            ]
            "ISO_PERIS.IP2": [
                [
                    ["port1", "port7"]
                ]
            ]
            "ISO_PERIS.IP6" : [
                [
                    ["port5", "port4"]
                ]
            ]
        }
        "ISO_G3D(out)": {
            "ISO_PERIS(in)": {
                [
                    ["port8", "port1"]
                ]
            }
        }
        "ISO_PERIS.IP1": {
            "ISO_PERIS.IP2": {
                [
                    ["port5", "port7"]
                ]
            }
        }
        "ISO_PERIS(out)" : {
            "ISO_CMU(in)" : {
                ["port29", "port9"]
            }
        }
}







input wire portname, // to IP1:dstn_port
output wire portname, // from IP2:src_port

if "to" in path:
                dstn_blk, dstn_port = path[-1].split(":")
                graph[f"{top_name}(in)"].setdefault(f"{top_name}.dstn_blk", []).append((port_name, dstn_port))
            elif "from" in path:
                src_blk, src_port = path[-1].split(":")
                graph[f"{src_blk}"].setdefault(f"{top_name}(out)", []).append((src_port, port_name))
    else:
        port_info = port_info.split("// to ")
        dstn_blk, dstn_port = port_info[-1].split(":")
        graph[f"{top_name}(in)"].setdefault(dstn_blk, []).append((port_name, dstn_port))

{
    'ISO_PERIS:port1': ['ISO_PERIS.IP1', 'ISO_PERIS.IP2'], 'ISO_PERIS:port3': ['ISO_PERIS.IP1'], 
    'ISO_PERIS:port5': ['ISO_PERIS.IP6'], 
    'ISO_G3D:port8': ['ISO_PERIS:port1'], 
    'ISO_PERIS.IP1': ['ISO_PERIS.IP2'], 
    'ISO_PERIS.IP2': ['ISO_PERIS(out)'], 
    'ISO_PERIS:port29': ['ISO_CMU:port9']
}



# adj_list = {
    #         "ISO_PERIS(out)": [
    #                 "ISO_G3D(in)",
    #                 "ISO_NOCL0(in)",
    #                 "WRAP_RETIMER"
    #             ],
    #         "ISO_G3D(out)": [
    #                 "ISO_CPUCL0(in)"
    #             ],
    #         "ISO_G3D(in)": [
    #             "ISO_G3D.IP4"
    #             ],
    #         "ISO_PERIS(in)": [
    #                 "ISO_PERIS.IP1"
    #             ],
    #         "ISO_PERIS.IP1": [
    #             ],
    #         "ISO_G3D.IP4": [
    #             ],
    #         "ISO_NOCL0(out)": [], 
    #         "WRAP_RETIMER": ["ISO_G3D(in)"]
    #         }
    
    # adj_list = {
    #         "ISO_NOCL0(out)": {
    #             "WRAP_RETIMER" : [
    #                 ["Port1", "Port2"], 
    #                 ["Port3", "Port4"]
    #             ]
    #         },
    #         "WRAP_RETIMER": {"ISO_CPUCL0(in)", "ISO_G3D(in)"},
    #         "ISO_CPUCL0(in)": [],
    #         "ISO_CPUCL0(out)": ["WRAP_RETIMER"],
    #         "ISO_G3D(in)": [],
    #         }
    
    # source = "ISO_NOCL0.IP1"
    # destination = "ISO_G3D.IP4"