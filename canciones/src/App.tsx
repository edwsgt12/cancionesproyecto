import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DEFINICIÓN DE TIPOS ---
interface LyricLine {
  time: number;
  text: string;
}

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  lyrics: LyricLine[];
  audioUrl: string;
}

// --- DATOS DE LAS CANCIONES ---
const SONGS_DATA: Song[] = [
 {
    id: 1,
    title: "True Love",
    artist: "Saske",
    cover: "https://i.scdn.co/image/ab67616d0000b27387f6e2f89c09d57a9167198d",
    audioUrl: "/songs/saske_true_love.mp3",
    lyrics: [
      { time: 0, text: "Sigo pensándote de noche..." },
      { time: 2.8, text: "Pero tú no estás aquí, no" }, 
      { time: 6.2, text: "Sigo pensándote de noche, pero tú no estás, ma'" },
      { time: 10.5, text: "Sigo pensándote de noche, pero tú no estás aquí, no" },
      { time: 14.2, text: "Sigo pensándote de noche, pero tú no estás" },
      { time: 18.0, text: "Sigo pensándote de noche, pero tú no estás (no estás aquí)" },
      { time: 21.8, text: "Solo mi seria cara de miseria" },
      { time: 25.5, text: "Y mil problemas que escribir en este beat de jazz" },
      { time: 29.2, text: "Pero dudo que alguno se resuelva" },
      { time: 32.8, text: "Y cuando cierras los ojos solo pa' no pensar (¿en qué?)" },
      { time: 36.5, text: "En una cara, esa cara es la que recuerdas" },
      { time: 40.2, text: "Y yo recuerdo que te vi y me dije ¡dale gas!" },
      { time: 44.0, text: "O vienen y se te adelantan por la izquierda" },
      { time: 47.8, text: "Y me acerqué a su mesa y le dije mi negra" },
      { time: 51.5, text: "Por esa cara cualquiera empieza una guerra" },
      { time: 55.2, text: "Mi nombre es Alex, rey del underground, baby" },
      { time: 59.0, text: "Y a partir de este momento, tú mi reina" },
      { time: 62.8, text: "Te necesito pa' dormir como a la hierba" },
      { time: 66.5, text: "Haz el favor y pilla esta llamada, ¡venga!" },
      { time: 70.2, text: "Arregla esta noche de mierda" },
      { time: 74.0, text: "Quítame las penas, ponme entre tus piernas" },
      { time: 77.8, text: "Las que me sacan de la tierra pa' llevarme al cielo" },
      { time: 81.5, text: "Cuando está cerca me despega la suela del suelo" },
      { time: 85.2, text: "Y aunque los perros no están hechos pa' los caramelos" },
      { time: 89.0, text: "Voy a tomar hasta que muera ese puto veneno" },
      { time: 94.5, text: "Y lo haré forever (forever)" },
      { time: 98.2, text: "Como lo que escupo y lo que escupen mis colegas" },
      { time: 102.0, text: "Porque tú no llegas" },
      { time: 105.8, text: "Alguien tiene que llegarte dentro pa' calmar ese lamento" },
      { time: 109.5, text: "Y esa pena, y esa fuiste tú, nena" },
      { time: 113.2, text: "Mi flor, mi tesoro, contigo hago el amor" },
      { time: 117.0, text: "Me sentía solo y ahora saltan en mi polla" },
      { time: 120.8, text: "Pero no será ese cuello el que mi rap llene de joyas" },
      { time: 124.5, text: "Because I love you, this is true love" },
      { time: 128.2, text: "No duermo tranquilo si no escucho tu voz" },
      { time: 132.0, text: "Sé que estamos hechos para acabar juntos" },
      { time: 135.8, text: "Tú y yo, tú y yo, tú y yo" },
      { time: 139.5, text: "Sin ti me siento flojo y con ganas de llorar" },
      { time: 143.2, text: "Como cuando se te mete algo en el ojo" },
      { time: 147.0, text: "Pero vienes y me curan esos besos venenosos" },
      { time: 150.8, text: "No imagino un mundo lejos de tus labios rojos" },
      { time: 154.5, text: "Tú eres el aire para esta cometa, la muleta pa' este cojo" },
      { time: 158.2, text: "El trozo que completa el hueco de mi corazón roto" },
      { time: 162.0, text: "Tú, la chica más bonita de todo el planeta" },
      { time: 165.8, text: "So, dime que sí, muñeca" },
      { time: 169.5, text: "Y yo me planto en el jodido banco con una escopeta" },
      { time: 173.2, text: "Vamos a cambiar el barrio por Miami" },
      { time: 177.0, text: "Yo voy preparando las maletas" },
      { time: 180.8, text: "Porque contigo no me tripo de setas y flipo" },
      { time: 184.5, text: "Te necesito como un yonqui necesito un pico" },
      { time: 188.2, text: "Por eso comete varios delitos" },
      { time: 192.0, text: "Así te necesito, true love" },
      { time: 195.8, text: "Hay una estrella abajo de la Luna" },
      { time: 199.5, text: "Como un lunar debajo de tus ojos" },
      { time: 203.2, text: "Que son mi luz en días flojos" },
      { time: 207.0, text: "El mundo nos jodió y borré todas tus fotos" },
      { time: 210.8, text: "Solo el tiempo dirá lo que será de nosotros" },
      { time: 214.5, text: "Yo te cantaba en el coche, tú me mirabas bonito" },
      { time: 218.2, text: "Y lo hicimos, hicimos eterno un ratito" },
      { time: 222.0, text: "Y lo escribo pa' hacerlo infinito" },
      { time: 225.8, text: "Como cuando nos miramos tú y yo y el tiempo se para" },
      { time: 229.5, text: "Y hoy escribo pa' ti sin ti" },
      { time: 233.2, text: "Escribo pa' que sepas lo que no pude decir" },
      { time: 237.0, text: "This is true love, for real" },
      { time: 240.8, text: "Solos tú y yo, mami, know mean?" },
      { time: 244.5, text: "Hoy la chica más guapa del party quiere conmigo" },
      { time: 248.2, text: "Y no sé qué hago aquí si quiero estar contigo" },
      { time: 252.0, text: "Que me robes la ropa como lo hacías" },
      { time: 255.8, text: "Pa' que cuando me la des huela a ti durante días" },
      { time: 259.5, text: "True love, aunque ya ni nos miremos" },
      { time: 263.2, text: "Ya nos veremos por el centro pa' volver a besarnos" },
      { time: 267.0, text: "Tú sin mí es Frank Sinatra sin voz" },
      { time: 270.8, text: "Sin sentido, como sin rascacielos Nueva York" },
      { time: 274.5, text: "Y me hiciste llorar y después lo hice yo" },
      { time: 278.2, text: "Aunque sé que volverás pa' estar juntos los dos" },
      { time: 282.0, text: "Despertarme contigo desnuda y te pinte como Jack a Rose" },
      { time: 285.8, text: "Hablar de música, reírme de tus paranoias" },
      { time: 289.5, text: "Sacar esa sonrisa que ni Helena de Troya" },
      { time: 293.2, text: "Ain't no sunshine when she's gone" },
      { time: 297.0, text: "¿De qué sirve un santero sin santo?" },
      { time: 300.8, text: "Si no estás tú me falta algo" },
      { time: 304.5, text: "No sé por qué no crecen las flores que planto" },
      { time: 308.2, text: "Solo sé que tú no estás y las estrellas no brillan tanto" },
      { time: 312.0, text: "Por eso canto, pa' que me escuches desde tu cuarto" },
      { time: 315.8, text: "Joder, cómo puedo echarlo tanto de menos" },
      { time: 319.5, text: "Te estaré esperando" },
      { time: 323.2, text: "Pa' volver a pintarte mensajes en los cristales de tu carro" },
      { time: 327.0, text: "Ven a buscarme a mi puerta y si lo sientes, dilo" },
      { time: 330.8, text: "Dime que quieres estar conmigo" },
      { time: 334.5, text: "Y nos vamos pa' la playa que dijimos" },
      { time: 338.2, text: "¿De qué sirven los sueños si no los cumplimos?" },
      { time: 342.0, text: "True love, this is true love..." }
    ]
  },
  {
    id: 2,
    title: "Buenos Aires en Llamas",
    artist: "Trueno",
    cover: "https://i.scdn.co/image/ab67616d0000b2734e56598379435889758e5f6e",
    audioUrl: "/songs/trueno.mp3",
    lyrics: [
      { time: 0, text: "Buenos Aires en llamas..." },
      { time: 3.5, text: "El cielo se tiñe de rojo, hermano" },
      { time: 7.0, text: "Caminando por la city con el humo en la mano" },
      { time: 11.5, text: "La calle me grita, el barrio no engaña" },
    ]
  },
  {
    id: 3,
    title: "Like You Do",
    artist: "Joji",
    cover: "https://i.scdn.co/image/ab67616d0000b2735996071720364969234b6b63",
    audioUrl: "/songs/joji.mp3",
    lyrics: [
      { time: 0, text: "Lost in the blue..." },
      { time: 6.2, text: "They don't love me like you do" },
      { time: 10.5, text: "Those biters are just passing through" },
      { time: 15.0, text: "I'm only me when I'm with you" },
    ]
  },
  {
    id: 4,
    title: "Yebba's Heartbreak",
    artist: "Drake ft. Yebba",
    cover: "https://i.scdn.co/image/ab67616d0000b273cd395662706856715f3484f9",
    audioUrl: "/songs/drake.mp3",
    lyrics: [
      { time: 0, text: "How much I love you..." },
      { time: 5.0, text: "I'll show you when the time is right" },
      { time: 9.5, text: "Even when we're in the dark of night" },
    ]
  },
  {
    id: 5,
    title: "Luther",
    artist: "Kendrick Lamar",
    cover: "https://i.scdn.co/image/ab67616d0000b273d27690623f7988354c599b53",
    audioUrl: "/songs/kendrick.mp3",
    lyrics: [
      { time: 0, text: "New Kung Fu Kenny..." },
      { time: 4.8, text: "The spirit of the street is on me" },
      { time: 8.5, text: "I'm the king of the city, you know me" },
    ]
  }
];

export default function App() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  return (
    <div className="main-wrapper">
      <AnimatePresence mode="wait">
        {!selectedSong ? (
          // PANTALLA INICIAL: CARTAS
          <motion.div 
            key="list"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="grid-container"
          >
            <h1 style={{ gridColumn: '1/-1', textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem' }}>
              Proyectico Musical
            </h1>
            {SONGS_DATA.map((song) => (
              <div key={song.id} className="song-card" onClick={() => setSelectedSong(song)}>
                <img src={song.cover} alt={song.title} />
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>
            ))}
          </motion.div>
        ) : (
          // PANTALLA REPRODUCTOR
          <motion.div 
            key="player"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="player-screen"
          >
            <button className="btn-back" onClick={() => setSelectedSong(null)}>
              ← Volver
            </button>
            <LyricsPlayer song={selectedSong} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- COMPONENTE DEL REPRODUCTOR DE LETRAS ---
function LyricsPlayer({ song }: { song: Song }) {
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Lógica para encontrar la letra actual
  const currentLine = [...song.lyrics]
    .reverse()
    .find((line) => currentTime >= line.time);

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <audio 
        ref={audioRef}
        src={song.audioUrl}
        autoPlay
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentLine?.text || 'intro'}
          initial={{ opacity: 0, y: 40, filter: 'blur(15px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -40, filter: 'blur(15px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="lyrics-text">{currentLine?.text || "..."}</h1>
          <p className="song-info">{song.title} — {song.artist}</p>
        </motion.div>
      </AnimatePresence>
      
      {/* CORAZONES FLOTANTES */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: -1 }}>
        {[...Array(8)].map((_, i) => (
          <FloatingHeart key={i} delay={i * 2} />
        ))}
      </div>
    </div>
  );
}

function FloatingHeart({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ y: '80vh', opacity: 0, x: `${Math.random() * 100}vw` }}
      animate={{ y: '-20vh', opacity: [0, 0.3, 0] }}
      transition={{ duration: 12, repeat: Infinity, delay, ease: "linear" }}
      style={{ position: 'absolute', color: 'rgba(255,255,255,0.2)', fontSize: '18px' }}
    >
      ♥
    </motion.div>
  );
}