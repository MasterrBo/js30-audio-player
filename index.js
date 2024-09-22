const player = document.querySelector('.player'),
  playBtn = document.querySelector('.play'),
  prevBtn = document.querySelector('.prev'),
  nextBtn = document.querySelector('.next'),
  audio = document.querySelector('.audio'),
  progressContainer = document.querySelector('.progress__container'),
  progress = document.querySelector('.progress'),
  title = document.querySelector('.song'),
  coverImg = document.querySelector('.cover__img'),
  imgSrc = document.querySelector('.img__src')

  //Названия песен
 
const songs = ['gubernator', 'ne-bylo-takoi', 'lubov-vo-vremya-voiny', 'Stella Maris']

// песня по умолчанию 
let songIndex = 0

//init

function loadSong (song) {
  title.innerHTML = song
  audio.src = `audio/${song}.mp3`
  coverImg.src = `./images/cover${songIndex + 1}.png`
} 

loadSong(songs[songIndex])

// songArtist = ['Аквариум', 'Cranberries', 'Bowie', 'SOAD']
// let artistIndex = 0

//play
function playSong() {  
  player.classList.add('play')
  imgSrc.src = './images/pause.png'
  audio.play()
} 
    
function pauseSong() {
  player.classList.remove('play')
  audio.pause()
  imgSrc.src = './images/play.png'
}

playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play')
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

//next song

function nextSong () {
  songIndex++

  if (songIndex > songs.length -1) {  
    songIndex = 0
  }

  loadSong(songs[songIndex])
  playSong()
}

nextBtn.addEventListener('click', nextSong)

//prev song

function prevSong () {
  songIndex--

  if (songIndex < 0) {
    songIndex = songs.length -1
  }

  loadSong(songs[songIndex])
  playSong()
}

prevBtn.addEventListener('click', prevSong)

//progress bar

function anyProgress (e) {
  const {duration, currentTime} = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', anyProgress)

//set progress

function setProgress (e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration
  
  audio.currentTime = (clickX / width) * duration
}

progressContainer.addEventListener('click', setProgress)

//autoplay
 audio.addEventListener('ended', nextSong)

  
 