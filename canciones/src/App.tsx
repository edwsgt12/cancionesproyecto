import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  url: string;
  note: string;
  color: string;
}

const PLAYLIST: Song[] = [
  {
    id: 1,
    title: "True Love",
    artist: "Saske",
    cover: "/fotos/3.webp", // Cambiado a .webp
    url: "/songs/saske_true_love.mp3",
    note: '"Y si lo sientes dilo. Dime que quieres estar conmigo..."',
    color: "#6E00B3"
  },
  {
    id: 2,
    title: "Buenos Aires en Llamas",
    artist: "Trueno",
    cover: "/fotos/trueno1.webp", // Cambiado a .webp
    url: "/songs/trueno.mp3",
    note: '"Si ya no queda tiempo, te llevo al ayer..."',
    color: "#00d4ff"
  },
  {
    id: 3,
    title: "El Mundo Se Va Acabar",
    artist: "Omar Courtz",
    cover: "/fotos/7.webp", // Cambiado a .webp
    url: "/songs/ousi.mp3",
    note: '"El cuento de nunca acabar..."',
    color: "#ff007a", 
  },
  {
    id: 4,
    title: "Yabba's Heartbreak",
    artist: "Drake",
    cover: "/fotos/2.webp", // Cambiado a .webp
    url: "/songs/drake.mp3",
    note: '"Can I show my love for you?..."',
    color: "#FFB5C0"
  },
  {
    id: 5,
    title: "Like You Do",
    artist: "Joji",
    cover: "/fotos/4.webp", // Cambiado a .webp
    url: "/songs/joji.mp3",
    note: '"If you ever go, all the songs that we like, will sound like bittersweet lullabies..."',
    color: "#FF2C2C", 
  },
  {
    id: 6,
    title: "Luther",
    artist: "Kendrick Lamar",
    cover: "/fotos/1.webp", // Cambiado a .webp
    url: "/songs/kendrick.mp3",
    note: '"If this world was mine, Id take your dreams and make em multiply..."',
    color: "#345766", 
  },
  {
    id: 7,
    title: "Golden Hour",
    artist: "JVKE",
    cover: "/fotos/8.webp", // Cambiado a .webp
    url: "/songs/golden_hour.mp3",
    note: '"Your slow down time, in your golden hour..."',
    color: "#EFBF04", 
  },
  {
    id: 8,
    title: "Solo por vos",
    artist: "Trueno",
    cover: "/fotos/spv.webp", // Cambiado a .webp
    url: "/songs/trueno2.mp3",
    note: '"Se que a veces debes pensar que no te pienso, mientras planeo borrarte la inseguridad a los besos..."',
    color: "#0047AB", 
  },
  {
    id: 9,
    title: "Fabricante de Lagrimas",
    artist: "THE TEARSMITH",
    cover: "/fotos/5.webp", // Cambiado a .webp
    url: "/songs/fabricante.mp3",
    note: '"La melodia de mi corazon cada que te veo..."',
    color: "#545454", 
  },
  {
    id: 10,
    title: "Feel it",
    artist: "d4vd",
    cover: "/fotos/12.webp", // Cambiado a .webp
    url: "/songs/d4dv.mp3",
    note: '"You told mo once that I was crazy, I said baby girl, i know. But I cant let you go away..."',
    color: "#008E8F", 
  },
  {
    id: 11,
    title: "Solo tu",
    artist: "Big Soto",
    cover: "/fotos/11.webp", // Cambiado a .webp
    url: "/songs/solo_tu.mp3",
    note: '"Lo intente y en ti me perdi, y ahora de tu lado no me quiero ir..."',
    color: "#C11C84", 
  },
  {
    id: 12,
    title: "Beso En Las Rocas",
    artist: "TINI",
    cover: "/fotos/10.webp", // Cambiado a .webp
    url: "/songs/tini.mp3",
    note: '"Si me das tres deseos como Aladín, te juro que tres veces te elijo a ti...',
    color: "#8A2BE2", 
  }
];

const CardsProject: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  useEffect(() => {
    if (selectedSong) {
      document.documentElement.style.setProperty('--accent-color', selectedSong.color);
    } else {
      document.documentElement.style.setProperty('--accent-color', '#6c5ce7');
    }
  }, [selectedSong]);

  return (
    <div className="main-container">
      <header>
        <h1 className="main-title">NUESTRA <i>Play</i>LIST</h1>
        <p className="subtitle">Haz clic en una carta para escuchar</p>
      </header>

      <div className="cards-grid">
        {PLAYLIST.map((song) => (
          <motion.div
            key={song.id}
            className="song-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSong(song)}
          >
            {/* Agregado loading="eager" para carga prioritaria de la cuadrícula */}
            <img 
              src={song.cover} 
              alt={song.title} 
              className="card-img" 
              loading="eager" 
              decoding="async" 
            />
            <div className="card-info">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
            <div style={{ 
              height: '4px', 
              width: '40px', 
              background: song.color, 
              marginTop: '10px',
              borderRadius: '2px'
            }}></div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedSong && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 100, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <button className="close-btn" onClick={() => setSelectedSong(null)}>✕</button>
              
              <motion.img 
                src={selectedSong.cover} 
                className="modal-img"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              <h2 style={{ fontSize: '2rem', margin: '10px 0' }}>{selectedSong.title}</h2>
              <p style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{selectedSong.artist}</p>
              
              <div className="note-box">
                <p>{selectedSong.note}</p>
              </div>

              {/* preload="auto" ayuda a que el navegador empiece a bajar el audio antes del play */}
              <audio 
                src={selectedSong.url} 
                controls 
                autoPlay 
                className="audio-player" 
                preload="auto" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardsProject;