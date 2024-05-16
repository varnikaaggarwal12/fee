var mainContainer = document.getElementById("main-container");
var musicPlayer = document.getElementById("music-player");
var musicPlayList = document.getElementById("music-playlist");

var responceData;
var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://5dd1894f15bbc2001448d28e.mockapi.io/playlist", true);
xhttp.onreadystatechange = function () {
  if (this.readyState === 4) {
    responceData = JSON.parse(this.responseText);

    for (var i = 0; i < responceData.length; i++) {
      musicPlayList.appendChild(createMusicCardList(responceData[i], i));
    }
    musicPlayer.appendChild(createMusicPlayer(responceData[0], 0));
  }
};
xhttp.send();

function createMusicPlayer(data, i) {
  var musicCard = document.createElement("div");
  musicCard.className = "music-card";
  musicPlayer.appendChild(musicCard);
  var audioTrack = document.createElement("audio");
  audioTrack.id = "play-audio";
  audioTrack.src = data.file;
  musicCard.appendChild(audioTrack);
  var playerImage = document.createElement("img");
  playerImage.className = "player-image";
  playerImage.src = data.albumCover;
  musicCard.appendChild(playerImage);
  var progressWrapper = document.createElement("div");
  progressWrapper.id = "progress-wrapper";
  progressWrapper.addEventListener(
    "mousedown",
    function (event) {
      var clickedPosition = event.clientX - event.target.offsetLeft;
      audioTrack.currentTime =
        (clickedPosition / event.target.offsetWidth) * audioTrack.duration - 60;
    },
    false
  );
  var progress = document.createElement("div");
  progress.id = "progress";
  progressWrapper.appendChild(progress);
  musicCard.appendChild(progressWrapper);
  var musicIcons = document.createElement("div");
  musicIcons.className = "play-btn";
  musicCard.appendChild(musicIcons);
  var randomPlayBtn = document.createElement("i");
  randomPlayBtn.className = "fas fa-random";
  randomPlayBtn.classList.add("player-icon");
  randomPlayBtn.onclick = function () {
    var randomSong = Math.floor(Math.random() * responceData.length + 1);
    if (i == 0 || i < responceData.length) {
      i = randomSong;
      handleForwardBackwordList([i]);
    }
  };
  musicIcons.appendChild(randomPlayBtn);
  var backwordPlayBtn = document.createElement("i");
  backwordPlayBtn.className = "fas fa-step-backward";
  backwordPlayBtn.classList.add("player-icon");
  backwordPlayBtn.onclick = function () {
    if (i > 0 && i < responceData.length - 1) {
      i--;
      handleForwardBackwordList([i]);
    } else {
      i = responceData.length - 1;
      handleForwardBackwordList([i]);
    }
  };
  musicIcons.appendChild(backwordPlayBtn);
  var playBtn = document.createElement("i");
  playBtn.className = "far fa-play-circle";
  playBtn.classList.add("player-icon");
  playBtn.classList.add("play-icon-btn");
  playBtn.id = "play-btn-id";
  playBtn.onclick = function () {
    pauseBtn.style.display = "inline-block";
    playBtn.style.display = "none";
    // audioTrack.paused ? audioTrack.play() : audioTrack.pause();
    audioTrack.play();
    audioTrack.ontimeupdate = function () {
      var progressInPercent =
        (audioTrack.currentTime / audioTrack.duration) * 100;
      progress.style.width = progressInPercent + "%";
    };
  };
  var pauseBtn = document.createElement("i");
  pauseBtn.className = "far fa-pause-circle";
  pauseBtn.classList.add("player-icon");
  pauseBtn.classList.add("play-icon-btn");
  pauseBtn.style.display = "none";
  pauseBtn.id = "pause-btn-id";
  musicIcons.appendChild(playBtn);
  pauseBtn.onclick = function () {
    pauseBtn.style.display = "none";
    playBtn.style.display = "inline-block";
    audioTrack.pause();
  };
  musicIcons.appendChild(pauseBtn);
  var forwardPlayBtn = document.createElement("i");
  forwardPlayBtn.className = "fas fa-step-forward";
  forwardPlayBtn.classList.add("player-icon");

  forwardPlayBtn.onclick = function () {
    if (i < responceData.length - 1) {
      i++;
      handleForwardBackwordList([i]);
    } else {
      i = 0;
      handleForwardBackwordList([i]);
    }
  };

  musicIcons.appendChild(forwardPlayBtn);
  var restartMusicBtn = document.createElement("i");
  restartMusicBtn.className = "fas fa-history";
  restartMusicBtn.classList.add("player-icon");
  restartMusicBtn.onclick = function () {
    audioTrack.currentTime = 0;
  };
  musicIcons.appendChild(restartMusicBtn);
  var musicDetails = document.createElement("div");
  musicCard.appendChild(musicDetails);
  var musicName = document.createElement("h3");
  musicName.className = "song-name";
  musicName.innerHTML = data.track;
  musicDetails.appendChild(musicName);
  var musicSinger = document.createElement("p");
  musicSinger.className = "singer-name";
  musicSinger.innerHTML = data.artist;
  musicDetails.appendChild(musicSinger);

  function handleForwardBackwordList() {
    audioTrack.src = "";
    audioTrack.src = responceData[i].file;
    audioTrack.currentTime = 0;
    playerImage.src = "";
    playerImage.src = responceData[i].albumCover;
    musicName.innerHTML = "";
    musicName.innerHTML = responceData[i].track;
    musicSinger.innerHTML = "";
    musicSinger.innerHTML = responceData[i].artist;
    pauseBtn.style.display = "inline-block";
    playBtn.style.display = "none";
    audioTrack.play();
    audioTrack.ontimeupdate = function () {
      var progressInPercent =
        (audioTrack.currentTime / audioTrack.duration) * 100;
      progress.style.width = progressInPercent + "%";
    };
  }

  return musicCard;
}

function createMusicCardList(data, i) {
  var musicCardlist = document.createElement("div");
  musicCardlist.className = "music-card-list";

  musicCardlist.onclick = function () {
    musicPlayer.innerHTML = "";
    musicPlayer.appendChild(createMusicPlayer(responceData[i], i));
    var playAudio = document.getElementById("play-audio");
    playAudio.play();

    var musicPauseBtn = document.getElementById("pause-btn-id");
    musicPauseBtn.style.display = "inline-block";
    var musicPlayBtn = document.getElementById("play-btn-id");
    musicPlayBtn.style.display = "none";
    var progresBar = document.getElementById("progress");
    playAudio.ontimeupdate = function () {
      var progressInPercent =
        (playAudio.currentTime / playAudio.duration) * 100;
      progresBar.style.width = progressInPercent + "%";
    };
  };
  var musicImage = document.createElement("img");
  musicImage.src = data.albumCover;
  musicImage.className = "music-image";
  musicCardlist.appendChild(musicImage);
  var musicDetails = document.createElement("div");
  musicDetails.className = "music-details";
  musicCardlist.appendChild(musicDetails);
  var musicName = document.createElement("h5");
  musicName.className = "music-name";
  musicName.innerHTML = data.track;
  musicDetails.appendChild(musicName);
  var artistName = document.createElement("p");
  artistName.className = "singer-name";
  artistName.innerHTML = data.artist;
  musicDetails.appendChild(artistName);

  return musicCardlist;
}
