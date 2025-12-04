import os
import json
import re

folder_path = 'Y:'  # Cambia esto por tu ruta
images_path = 'Y:\\imgs'  # Nueva ruta de imágenes

json_result_anime = {
    "anime": {}
}

def ObtenerDataAnime():
    anime_path = os.path.join(folder_path, "anime")
    if os.path.exists(anime_path):
        # Primero obtener todos los animes (carpetas nivel 1)
        anime_folders = [d for d in os.listdir(anime_path) if os.path.isdir(os.path.join(anime_path, d))]
        
        for anime_name in anime_folders:
            anime_folder_path = os.path.join(anime_path, anime_name)
            
            # Buscar logo principal del anime en Y:\imgs
            logo_principal = None
            for ext in ['.png', '.jpg', '.jpeg']:
                logo_filename = f"{anime_name}_logo{ext}"
                logo_path = os.path.join(images_path, logo_filename)
                if os.path.exists(logo_path):
                    logo_principal = logo_filename
                    break
            
            # Inicializar estructura del anime
            json_result_anime["anime"][anime_name] = {
                "logo_principal": logo_principal,
                "temporadas": {}
            }
            
            # Buscar temporadas (carpetas nivel 2)
            temporada_folders = [d for d in os.listdir(anime_folder_path) 
                               if os.path.isdir(os.path.join(anime_folder_path, d))]
            
            for temporada_name in temporada_folders:
                temporada_path = os.path.join(anime_folder_path, temporada_name)
                
                # Buscar logo de la temporada en Y:\imgs
                logo_temporada = None
                for ext in ['.png', '.jpg', '.jpeg']:
                    logo_filename = f"{anime_name}_tem{temporada_name[-1]}{ext}"  # Obtiene último carácter del nombre
                    logo_path = os.path.join(images_path, logo_filename)
                    if os.path.exists(logo_path):
                        logo_temporada = logo_filename
                        break
                
                # Obtener capítulos (archivos .mp4)
                capitulos = []
                files = [f for f in os.listdir(temporada_path) 
                        if f.lower().endswith('.mp4')]
                
                # Función para extraer el número del archivo
                def extraer_numero(filename):
                    # Buscar el patrón _número.mp4
                    match = re.search(r'_(\d+)\.mp4$', filename, re.IGNORECASE)
                    if match:
                        return int(match.group(1))
                    return 999999  # Si no encuentra número, poner al final
                
                # Ordenar archivos por el número extraído
                files.sort(key=extraer_numero)
                
                for file in files:
                    # Extraer el número del capítulo del nombre del archivo
                    numero_capitulo = extraer_numero(file)
                    
                    # URL donde Flask servirá el capítulo
                    capitulo_url = f"/play/anime/{anime_name}/{temporada_name}/{file}"
                    
                    capitulos.append({
                        "numero": numero_capitulo,
                        "titulo": f"Capítulo {numero_capitulo}",
                        "url": capitulo_url,
                        "archivo": file
                    })
                
                # Agregar temporada al anime
                if capitulos:  # Solo agregar si tiene capítulos
                    json_result_anime["anime"][anime_name]["temporadas"][temporada_name] = {
                        "logo_temporada": logo_temporada,
                        "capitulos": capitulos
                    }
    
    #print(json.dumps(json_result_anime, indent=4, ensure_ascii=False))
    return json_result_anime


json_result_peliculas = {
    "peliculas": {}
}

def ObtenerDataPeli():
    peliculas_path = os.path.join(folder_path, "peliculas")
    if os.path.exists(peliculas_path):
        # Obtener todas las categorías (carpetas nivel 1)
        categoria_folders = [d for d in os.listdir(peliculas_path) if os.path.isdir(os.path.join(peliculas_path, d))]
        
        for categoria_name in categoria_folders:
            categoria_folder_path = os.path.join(peliculas_path, categoria_name)
            
            # Inicializar estructura de la categoría
            json_result_peliculas["peliculas"][categoria_name] = {}
            
            # Obtener todas las películas dentro de la categoría (carpetas nivel 2)
            pelicula_folders = [d for d in os.listdir(categoria_folder_path) if os.path.isdir(os.path.join(categoria_folder_path, d))]
            
            for pelicula_name in pelicula_folders:
                pelicula_folder_path = os.path.join(categoria_folder_path, pelicula_name)
                
                # Buscar logo principal de la película en Y:\imgs
                logo_principal = None
                for ext in ['.png', '.jpg', '.jpeg']:
                    logo_filename = f"{pelicula_name}_logo{ext}"
                    logo_path = os.path.join(images_path, logo_filename)
                    if os.path.exists(logo_path):
                        logo_principal = logo_filename
                        break
                
                # Obtener archivos de película (archivos .mp4)
                peliculas_files = []
                files = [f for f in os.listdir(pelicula_folder_path) 
                        if f.lower().endswith('.mp4')]
                
                # Función para extraer el número de la película
                def extraer_numero_pelicula(filename):
                    # Buscar números en el nombre del archivo
                    match = re.search(r'(\d+)', filename)
                    if match:
                        return int(match.group(1))
                    return 1  # Si no encuentra número, es la primera película
                
                # Ordenar archivos por el número extraído
                files.sort(key=extraer_numero_pelicula)
                
                for file in files:
                    # Extraer el número de la película del nombre del archivo
                    numero_pelicula = extraer_numero_pelicula(file)
                    
                    # URL donde Flask servirá la película
                    pelicula_url = f"/play/peliculas/{categoria_name}/{pelicula_name}/{file}"
                    
                    # Nombre de la película sin extensión
                    titulo_pelicula = os.path.splitext(file)[0]
                    
                    peliculas_files.append({
                        "numero": numero_pelicula,
                        "titulo": titulo_pelicula,
                        "url": pelicula_url,
                        "archivo": file
                    })
                
                # Agregar película a la categoría
                if peliculas_files:  # Solo agregar si tiene archivos
                    json_result_peliculas["peliculas"][categoria_name][pelicula_name] = {
                        "logo_principal": logo_principal,
                        "peliculas": peliculas_files
                    }
    
    #print(json.dumps(json_result_peliculas, indent=4, ensure_ascii=False))
    return json_result_peliculas

def ObtenerDataSerie():
    print("ObtenerDataSerie called")