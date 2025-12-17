import './Home.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondoImagen from '../../assets/images/fondoAnime.avif';
import fondoPeli from '../../assets/images/fondoPeli.jpg';
import fondoSerie from '../../assets/images/fondoSerie.jpg';
import logoPecas from '../../assets/images/logoPekas.png';


const URL_BASE = "";

function Home() {

  useEffect(() => {
    document.title = "Pecas - Inicio";
  }, []);

  const navigate = useNavigate();

  const fecthBack = (type) => {
    fetch(`${URL_BASE}/api/data/${type}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      localStorage.setItem(`${type}Data`, JSON.stringify(data));
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const handleAnimeClick = () => {
    navigate('/anime');
    fecthBack('anime');
  };

  const handlePeliculasClick = () => {
    navigate('/peliculas');
    fecthBack('peliculas');
  };

  const handleSeriesClick = () => {
    navigate('/series');
    fecthBack('series');
  };

  return (
    <div className="App-nefli">
      <header className="App-header-nefli">
        <img src={logoPecas} alt="Logo de Pekas" className="logo-pekas" />
      </header>
      <main>
        <button className='contentSectionApp' style={{backgroundImage: `url(${fondoImagen})`}} onClick={handleAnimeClick}><h1>ANIME</h1></button>
        <button className='contentSectionApp' style={{backgroundImage: `url(${fondoPeli})`}} onClick={handlePeliculasClick}><h1>PELÍCULAS</h1></button>
        <button className='contentSectionApp' style={{backgroundImage: `url(${fondoSerie})`}} onClick={handleSeriesClick}><h1>SERIES</h1></button>
      </main>
      <footer className="App-footer-nefli">
        <p>&copy; 2026 CineLocal. Derechos reservados para 666.</p>
      </footer>
    </div>
  );
}

export default Home;
