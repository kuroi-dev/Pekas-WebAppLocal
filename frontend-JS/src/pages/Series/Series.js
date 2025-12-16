import './Series.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';
import logoPecas from '../../assets/images/logoPekas.png';

const URL_BASE = "http://localhost:5010/";

function Series() {

  useEffect(() => {
    document.title = "Pecas - Series"; 
  }, []);

  const navigate = useNavigate();

  const [showMain, setShowMain] = useState(true);
  const [showMain2, setShowMain2] = useState(false);

  const [showBtn, setShowBtn] = useState(true);
  const [showBtn2, setShowBtn2] = useState(false);

  const [series, setSeries] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedSeries, setSelectedSeries] = useState('');

  const handleBackHome = () => {
    navigate('/');
  };

   const handleBackApp = () => {
    setSelectedSeries('');
    setShowMain(true);
    setShowMain2(false);
    setShowBtn(true);
    setShowBtn2(false);
  };

  const handleSeriesSelect = (seriesTitle) => {
    console.log(`Serie seleccionada: ${seriesTitle}`);
    setSelectedSeries(seriesTitle);
    setShowMain(false);
    setShowMain2(true);
    setShowBtn(false);
    setShowBtn2(true);
  };

  useEffect(() => {
    const loadData = async () => {
      const storedData = localStorage.getItem('seriesData');
      
      if (!storedData) {
        try {
          const response = await fetch(`${URL_BASE}/api/data/series`);
          const data = await response.json();
          setSeries(data.series || {});
          
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        const allData = JSON.parse(storedData);
        setSeries(allData.series || {});
      }
      
      setLoading(false);
    };

    loadData();
  }, []);

  const reproducirSerie = (url) => {
    console.log(`Reproduciendo serie desde URL: ${url}`);
    window.location.href = `${URL_BASE}${url}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Cargando series...</p>
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
        <h2 className='preTitle'>Series</h2>
        <div className="movies-grid">
          {Object.keys(series).map(seriesName => {
            console.log(seriesName, series[seriesName]);
            return (
              <MovieCard
                key={seriesName}
                title={seriesName}
                image={URL_BASE + "/images/" + seriesName + "_logo.jpg"}
                onClick={() => handleSeriesSelect(seriesName)}
              />
            );
          })}
        </div>
      </main>
      <main style={{ display: showMain2 ? 'block' : 'none' }} className='main2'>
        <h2 className='preTitle'>Capitulos</h2>
        <div className="content-series-detail">
          <div className="series-detail-container">
            <img className='imgSelected' src={URL_BASE + "/images/" + selectedSeries + "_logo.jpg"} alt={selectedSeries} />
          </div>
          <div className="seasons-container">
            {series[selectedSeries] && series[selectedSeries].temporadas ? (
              Object.keys(series[selectedSeries].temporadas).map(seasonKey => {
                console.log('Temporada:', seasonKey, series[selectedSeries].temporadas[seasonKey]);
                return (
                  <div key={seasonKey} className="season-section">
                    <h2>{`Temporada ${seasonKey.split('_')[1]}`}</h2>
                    <div className="episodes-grid">
                      {series[selectedSeries].temporadas[seasonKey].capitulos.map(episode => (
                        <button 
                          key={episode.numero} 
                          className="episode-button"
                          onClick={() => reproducirSerie(episode.url)}
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

export default Series;