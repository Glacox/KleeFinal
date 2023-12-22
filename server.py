import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        # Si la racine est demandée, servir index.html
        if self.path == '/':
            self.path = '/pages/search.html'

        # Chemin du fichier à servir
        file_path = self.path.strip('/')

        # Déterminer le type de contenu
        if file_path.endswith(".html"):
            content_type = 'text/html'
        elif file_path.endswith(".css"):
            content_type = 'text/css'
        elif file_path.endswith(".js"):
            content_type = 'application/javascript'
        elif file_path.endswith(".jpg") or file_path.endswith(".jpeg"):
            content_type = 'image/jpeg'
        elif file_path.endswith(".png"):
            content_type = 'image/png'
        else:
            content_type = 'application/octet-stream'

        # Essayer de servir le fichier
        try:
            with open(file_path, 'rb') as file:
                self.send_response(200)
                self.send_header('Content-type', content_type)
                self.end_headers()
                self.wfile.write(file.read())
        except FileNotFoundError:
            self.send_error(404, 'File Not Found: %s' % self.path)

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        # Ici, traitez les données reçues comme vous le souhaitez
        print("Données reçues:", data)

        # Envoi d'une réponse
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response_data = {'message': 'POST request processed'}
        self.wfile.write(bytes(json.dumps(response_data), 'utf-8'))

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Server started on port {port}")
    httpd.serve_forever()

run()