import http.server
import socketserver
import os
import webbrowser
import threading
import time

PORT = 8000
DIRECTORY = "c:\\Users\\Mandya_DCCB\\Desktop\\dsapro"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def open_browser():
    # Wait a bit for the server to start
    time.sleep(1)
    webbrowser.open_new(f'http://localhost:{PORT}')

def run_server():
    # Start the server
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server running at http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server")
        httpd.serve_forever()

if __name__ == "__main__":
    # Start browser opening in a separate thread
    browser_thread = threading.Thread(target=open_browser)
    browser_thread.start()
    
    # Run the server
    run_server()