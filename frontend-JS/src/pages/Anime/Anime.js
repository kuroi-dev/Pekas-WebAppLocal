import './Anime.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';
import logoPecas from '../../assets/images/logoPekas.png';

const URL_BASE = "";

function Anime() {

  useEffect(() => {
    document.title = "Pecas - Anime"; 
  }, []);

  const navigate = useNavigate();

  const [showMain, setShowMain] = useState(true);
  const [showMain2, setShowMain2] = useState(false);

  const [showBtn, setShowBtn] = useState(true);
  const [showBtn2, setShowBtn2] = useState(false);

  const [animes, setAnimes] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedAnime, setSelectedAnime] = useState('');

  const handleBackHome = () => {
    navigate('/');
  };

   const handleBackApp = () => {
    setSelectedAnime('');
    setShowMain(true);
    setShowMain2(false);
    setShowBtn(true);
    setShowBtn2(false);
  };

  const handleAnimeSelect = (animeTitle) => {
    console.log(`Anime seleccionado: ${animeTitle}`);
    setSelectedAnime(animeTitle);
    setShowMain(false);
    setShowMain2(true);
    setShowBtn(false);
    setShowBtn2(true);
  };

  useEffect(() => {
    const loadData = async () => {
      const storedData = localStorage.getItem('animeData');
      
      if (!storedData) {
        try {
          const response = await fetch(`${URL_BASE}/api/data/anime`);
          const data = await response.json();
          setAnimes(data.anime || {});
          
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        const allData = JSON.parse(storedData);
        setAnimes(allData.anime || {});
      }
      
      setLoading(false);
    };

    loadData();
  }, []);

  const reproducirAnime = (url) => {
    console.log(`Reproduciendo anime desde URL: ${url}`);
    window.location.href = `${URL_BASE}${url}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Cargando animes...</p>
      </div>
    );
  }

  return (
    <div className="App-nefli">
      <header className="App-header-nefli">
        <img src={logoPecas} alt="Logo de Pekas" className="logo-pekas" />
        <button onClick={handleBackApp} className="back-button" style={{ display: showBtn2 ? 'block' : 'none' }}>Volver</button>
        <button onClick={handleBackHome} className="back-button" style={{ display: showBtn ? 'block' : 'none' }}>Volver</button>
      </header>
      <main style={{ display: showMain ? 'block' : 'none' }}>
        <h2 className='preTitle'>Anime</h2>
        <div className="movies-grid">
          {Object.keys(animes).map(animeName => {
            console.log(animeName, animes[animeName]);
            return (
              <MovieCard
                key={animeName}
                title={animeName}
                image={URL_BASE + "/images/" + animeName + "_logo.jpg"}
                onClick={() => handleAnimeSelect(animeName)}
              />
            );
          })}
        </div>
      </main>
      <main style={{ display: showMain2 ? 'block' : 'none' }} className='main2'>
        <h2 className='preTitle'>Capitulos</h2>
        <div className="content-anime-detail">
          <div className="anime-detail-container">
            <img className='imgSelected' src={URL_BASE + "/images/" + selectedAnime + "_logo.jpg"} alt={selectedAnime} />
          </div>
          <div className="seasons-container">
            {animes[selectedAnime] && animes[selectedAnime].temporadas ? (
              Object.keys(animes[selectedAnime].temporadas).map(seasonKey => {
                console.log('Temporada:', seasonKey, animes[selectedAnime].temporadas[seasonKey]);
                return (
                  <div key={seasonKey} className="season-section">
                    <h2>{`Temporada ${seasonKey.split('_')[1]}`}</h2>
                    <div className="episodes-grid">
                      {animes[selectedAnime].temporadas[seasonKey].capitulos.map(episode => (
                        <button 
                          key={episode.numero} 
                          className="episode-button"
                          onClick={() => reproducirAnime(episode.url)}
                        >
                          {episode.numero}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No hay información de temporadas disponibles.</p>
            )}
          </div>
        </div>
        
      </main>
      <footer className="App-footer-nefli">
        <p>&copy; 2026 CineLocal. Derechos reservados para Cefi Don perro y Chinita.</p>
      </footer>
    </div>
  );
}

export default Anime;