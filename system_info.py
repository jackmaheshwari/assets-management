import platform
import psutil
import socket
import os

def get_system_info():
    # Hardware Info
    info = {
        "OS": f"{platform.system()} {platform.release()} ({platform.version()})",
        "Processor": platform.processor(),
        "Machine": platform.machine(),
        "CPU Cores": psutil.cpu_count(logical=True),
        "Total RAM": f"{round(psutil.virtual_memory().total / (1024**3), 2)} GB",
    }

    # Network Info
    hostname = socket.gethostname()
    info["Hostname"] = hostname
    info["IP Address"] = socket.gethostbyname(hostname)
    
    # Python Version (Software example)
    info["Python Version"] = platform.python_version()

    return info

if __name__ == "__main__":
    try:
        sys_info = get_system_info()
        for key, value in sys_info.items():
            print(f"{key}: {value}")
    except Exception as e:
        print(f"Error: {e}")
        print("Note: You may need to install 'psutil' using 'pip install psutil'")
