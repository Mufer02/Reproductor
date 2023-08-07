const audioPlayer = document.getElementById("audioPlayer");
const playPauseButton = document.getElementById("playPauseButton");
const stopButton = document.getElementById("stopButton");
const volumeUpButton = document.getElementById("volumeUpButton");
const volumeDownButton = document.getElementById("volumeDownButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const rewindButton = document.getElementById("rewindButton");
const fastForwardButton = document.getElementById("fastForwardButton");
const songImage = document.getElementById("songImage");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const progressBar = document.getElementById("progressBar");

const songs = [
  { title: "Besame sin sentir", artist: "Micro TDH", image: "cancion1.jpg", source: "cancion1.mp3" },
  { title: "La noche mas linda", artist: "Adalberto Santiago", image: "cancion2.jpg", source: "cancion2.mp3" },
  { title: "Labios rotos", artist: "Zoé", image: "cancion3.jpg", source: "cancion3.mp3" },
  { title: "Brillas", artist: "León Larregui", image: "cancion4.jpg", source: "cancion4.mp3" },
  { title: "Y llegaste tu", artist: "Sin Bandera", image: "cancion5.jpg", source: "cancion5.mp3" },
  { title: "Tus ojos", artist: "Los Cafres", image: "cancion6.jpg", source: "cancion6.mp3" },
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  songImage.src = song.image;
  audioPlayer.src = song.source;
  audioPlayer.load();
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist || "Unknown Artist";
}

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    songImage.classList.remove("rotating");
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    audioPlayer.play();
    if (!audioPlayer.paused) {
      songImage.classList.add("rotating");
    }
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
  }
  isPlaying = !isPlaying;
});

stopButton.addEventListener("click", () => {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  songImage.classList.remove("rotating");
  playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
  isPlaying = false;
});

volumeUpButton.addEventListener("click", () => {
  if (audioPlayer.volume < 1) {
    audioPlayer.volume += 0.1;
  }
});

volumeDownButton.addEventListener("click", () => {
  if (audioPlayer.volume > 0) {
    audioPlayer.volume -= 0.1;
  }
});

rewindButton.addEventListener("click", () => {
  audioPlayer.currentTime -= 10; // Retrocede 10 segundos
});

fastForwardButton.addEventListener("click", () => {
  audioPlayer.currentTime += 10; // Adelanta 10 segundos
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) {
    audioPlayer.play();
  }
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) {
    audioPlayer.play();
  }
});

audioPlayer.addEventListener("timeupdate", () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progress}%`;
});

loadSong(currentSongIndex);