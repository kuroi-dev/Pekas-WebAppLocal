# CineLocal2 - Pecas

**Aplicación web para gestionar y reproducir contenido multimedia local**

Una plataforma tipo Netflix personalizada para organizar y disfrutar tu colección de anime, películas y series almacenada localmente.

---

## Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Arquitectura](#️-arquitectura)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Contribuir](#-contribuir)

---

## Características

- **Gestión de Anime** - Organización por temporadas y episodios
- **Biblioteca de Películas** - Catálogo completo de tu colección
- **Series de TV** - Administración de series y temporadas
- **Interfaz moderna** - Diseño tipo Netflix responsive
- **Logos personalizados** - Sistema automático de imágenes y logos
- **Reproductor integrado** - Reproducción directa desde el navegador
- **Navegación intuitiva** - Categorización clara del contenido
- **Rendimiento optimizado** - Carga rápida y eficiente

---

## Tecnologías

### Backend (Python)
- **Flask** - Framework web ligero
- **Flask-CORS** - Manejo de CORS
- **Python 3.x** - Lenguaje principal

### Frontend (JavaScript)
- **React 19.1.1** - Biblioteca de UI
- **React Router DOM** - Navegación SPA
- **CSS3** - Estilos personalizados
- **JavaScript ES6+** - Lógica del cliente

### Almacenamiento
- **Sistema de archivos local** - Contenido multimedia en disco
- **JSON** - Estructuras de datos dinámicas

---

## Arquitectura

```
CineLocal2/
├── backend-Python/         # Servidor Flask API
│   ├── app.py              # Punto de entrada principal
│   ├── models/             # Modelos de datos
│   ├── controllers/        # Controladores (futuro)
│   ├── templates/          # Templates HTML
│   └── static/             # Archivos estáticos
├── frontend-JS/            # Aplicación React
│   ├── src/                # Código fuente
│   ├── public/             # Archivos públicos
│   └── build/              # Build de producción
└── entornoVirtual/         # Entorno virtual Python
```

**Flujo de datos:**
1. React Frontend → API REST → Flask Backend
2. Backend → Sistema de archivos local
3. Servicio de archivos multimedia directo

---

## Instalación

### Prerrequisitos
- Python 3.8+
- Node.js 16+
- npm o yarn

### Backend (Flask)

```bash
# Navegar al directorio del proyecto
cd CineLocal2

# Activar entorno virtual
.\entornoVirtual\Scripts\activate

# Instalar dependencias Python (si es necesario)
pip install flask flask-cors

# Ejecutar servidor backend
cd backend-Python
python app.py
```

### Frontend (React)

```bash
# Navegar al frontend
cd frontend-JS

# Instalar dependencias
npm install

# Modo desarrollo
npm start

# Build de producción
npm run build
```

---

## Configuración

### Configuración del Backend

Edita las rutas en `backend-Python/app.py`:

```python
MEDIA_PATH = 'Y:'           # Ruta de archivos multimedia
IMAGES_PATH = 'Y:\\imgs'    # Ruta de imágenes/logos
```

### Estructura de Archivos Requerida

```
Y:/                         # Disco de contenido multimedia
├── anime/
│   ├── [nombre-anime]/
│   │   └── temporada-1/
│   │       ├── episodio1.mp4
│   │       └── episodio2.mp4
├── peliculas/
│   ├── pelicula1.mp4
│   └── pelicula2.mkv
├── series/
│   ├── [nombre-serie]/
│   │   └── temporada-1/
└── imgs/                   # Logos e imágenes
    ├── [anime]_logo.png
    ├── [anime]_tem1.png
    └── [pelicula].jpg
```

---

## Uso

1. **Iniciar la aplicación:**
   - Ejecutar backend: `python app.py`
   - Ejecutar frontend: `npm start`

2. **Acceder a la aplicación:**
   - Desarrollo: `http://localhost:3000`
   - Producción: `http://localhost:5000`

3. **Navegación:**
   - Página principal con 3 categorías
   - Clic en categoría → Carga automática de datos
   - Navegación por contenido organizado

---

## Estructura del Proyecto

```
CineLocal2/
├── README.md                    # Documentación principal
├── .gitignore                   # Exclusiones de Git
│
├── backend-Python/
│   ├── app.py                   # Servidor Flask principal
│   ├── models/
│   │   ├── __init__.py
│   │   └── moviesData.py        # Lógica de datos multimedia
│   ├── controllers/             # Controladores MVC (futuro)
│   ├── templates/
│   │   └── player.html          # Reproductor de video
│   ├── static/                  # Build del frontend
│   └── utils/                   # Utilidades
│
├── frontend-JS/
│   ├── package.json             # Dependencias npm
│   ├── src/
│   │   ├── App.js               # Componente principal
│   │   ├── index.js             # Punto de entrada
│   │   ├── pages/               # Páginas principales
│   │   │   ├── Home/           # Página de inicio
│   │   │   ├── Anime/          # Sección anime
│   │   │   ├── Peliculas/      # Sección películas
│   │   │   └── Series/         # Sección series
│   │   ├── components/          # Componentes reutilizables
│   │   └── assets/             # Recursos estáticos
│   └── build/                   # Build de producción
│
├── entornoVirtual/             # Entorno virtual Python
└── personal/                   # Archivos personales/tests
```

---

## API Endpoints

### Datos de Contenido
- `GET /api/data/anime` - Obtener datos de anime
- `GET /api/data/peliculas` - Obtener datos de películas  
- `GET /api/data/series` - Obtener datos de series

### Archivos Multimedia
- `GET /images/<filename>` - Servir imágenes/logos
- `GET /video/<filename>` - Servir archivos de video
- `GET /play/<filename>` - Reproductor de video

### Páginas Web
- `GET /` - Página principal (SPA)
- `GET /anime` - Redirección a SPA
- `GET /peliculas` - Redirección a SPA
- `GET /series` - Redirección a SPA

---

## Notas de Desarrollo

### Estado Actual
- Backend Flask funcional
- Frontend React básico
- Sistema de archivos implementado
- Navegación entre secciones
- Reproductor en desarrollo
- Interfaz de usuario en mejora


## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## Licencia

Este proyecto es de uso personal. Todos los derechos reservados.

---

## Solución de Problemas

### Problemas Comunes

**El backend no encuentra los archivos multimedia**
- Verificar que `MEDIA_PATH` apunte a la ubicación correcta
- Asegurar permisos de lectura en la carpeta

**El frontend no conecta con el backend**
- Verificar que Flask esté ejecutándose en puerto 5000
- Comprobar configuración de CORS

**No se muestran las imágenes**
- Verificar que `IMAGES_PATH` sea correcto
- Confirmar que los nombres de archivo coincidan con la convención

---

## Contacto

David Riquelme  
Chile  
david.riquelme.sb@gmail.com  

---