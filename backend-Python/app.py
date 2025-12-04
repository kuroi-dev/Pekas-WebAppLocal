from flask import Flask, send_from_directory, jsonify, render_template
from flask_cors import CORS
from models.moviesData import ObtenerDataAnime , ObtenerDataPeli
import os

app = Flask(__name__, static_folder="static", static_url_path="")

CORS(app, origins="*")

MEDIA_PATH = 'Y:'
IMAGES_PATH = 'Y:\\imgs'

@app.route("/")
def serve_index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/api/data/anime")
def get_data_anime():
    result = ObtenerDataAnime()
    #print("Data fetched for anime:", result)
    return jsonify(result)

@app.route("/api/data/peliculas")
def get_data_pelicula():
    result = ObtenerDataPeli()
    #print("Data fetched for peliculas:", result)
    return jsonify(result)

@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory(IMAGES_PATH, filename)

# Ruta para reproducir videos (similar a tu ejemplo)
@app.route('/play/<path:nombre_archivo>')
def play_movie(nombre_archivo):
    return render_template('player.html', video_file=nombre_archivo)

# Ruta para servir archivos de video directamente
@app.route('/video/<path:filename>')
def serve_video(filename):
    return send_from_directory(MEDIA_PATH, filename)

@app.route('/anime')
@app.route('/peliculas')
@app.route('/series')
def serve_react_routes():
    return send_from_directory(app.static_folder, "index.html")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5010)