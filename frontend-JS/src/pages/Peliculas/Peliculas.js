import './Peliculas.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import logoPecas from '../../assets/images/logoPekas.png';

const URL_BASE = "";

function Peliculas() {

  useEffect(() => {
    document.title = "Pecas - Películas";
  }, []);

  const navigate = useNavigate();
  const [peliculas, setPeliculas] = useState({});
  const [loading, setLoading] = useState(true); 

  const [showMain, setShowMain] = useState(true);
  const [showMain2, setShowMain2] = useState(false);

  const [showBtn, setShowBtn] = useState(true);
  const [showBtn2, setShowBtn2] = useState(false);

  const [selectedCategoria, setSelectedCategoria] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const storedData = localStorage.getItem('peliculasData');
      
      if (!storedData) {
        try {
          const response = await fetch(`${URL_BASE}/api/data/peliculas`);
          const data = await response.json();
          setPeliculas(data.peliculas || {});
          localStorage.setItem('peliculasData', JSON.stringify(data));
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        const allData = JSON.parse(storedData);
        setPeliculas(allData.peliculas || {});
      }
      
      setLoading(false);
    };

    loadData();
  }, []);

  const handleBackApp = () => {
    setSelectedCategoria('');
    setShowMain(true);
    setShowMain2(false);
    setShowBtn(true);
    setShowBtn2(false);
  };

  const handleBackHome = () => {
    navigate('/');
  };

  const handleCategoriaSelect = (categoria) => {
    setSelectedCategoria(categoria);
    setShowMain(false);
    setShowMain2(true);
    setShowBtn(false);
    setShowBtn2(true);
  };

  const reproducirPelicula = (url) => {
    console.log(`Reproduciendo película desde URL: ${url}`);
    window.location.href = `${URL_BASE}${url}`;
  };

  if (loading) {
    return <div>Cargando películas...</div>;
  }

  return (
    <div className="App-nefli">
      <header className="App-header-nefli">
        <img src={logoPecas} alt="Logo de Pekas" className="logo-pekas" />
        <button onClick={handleBackApp} className="back-button" style={{ display: showBtn2 ? 'block' : 'none' }}>Volver</button>
        <button onClick={handleBackHome} className="back-button" style={{ display: showBtn ? 'block' : 'none' }}>Volver</button>
      </header>
      
      <main style={{ display: showMain ? 'block' : 'none' }}>

        <h2 className='preTitle'>Categorías</h2>

        <div className="movies-grid">
          {Object.keys(peliculas).map(categoria => {
            console.log(categoria, peliculas[categoria]);
            return ( // ← AGREGAR ESTO
              <CategoryCard 
                  key={categoria}
                  title={categoria}
                  onClick={() => handleCategoriaSelect(categoria)} 
              />
          );
          })}
        </div>
      </main>

      <main style={{ display: showMain2 ? 'block' : 'none' }}>
        <h2 className='preTitle'>{selectedCategoria}</h2>
        <div className="movies-grid">
          {selectedCategoria && peliculas[selectedCategoria] ? 
            (() => {
              console.log(selectedCategoria);
              return Object.keys(peliculas[selectedCategoria]).map(peliculaNombre => (
                <MovieCard
                  key={peliculaNombre}
                  title={peliculaNombre}
                  image={`${URL_BASE}/images/${peliculaNombre}_logo.jpg`}
                  onClick={() => reproducirPelicula(peliculas[selectedCategoria][peliculaNombre].peliculas[0].url)}
                />
              ));
            })() : null
          }
        </div>
      </main>

      <footer className="App-footer-nefli">
        <p>&copy; 2026 CineLocal. Derechos reservados para Cefi Don perro y Chinita.</p>
      </footer>
    </div>
  );
}

export default Peliculas;