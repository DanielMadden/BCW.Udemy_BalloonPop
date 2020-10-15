//#region region GAME LOGIC AND DATA

// DATA
let clickCount = 0;
let height = 120;
let width = 100;
let inflationRate = 20;
let maxSize = 300;
let highestPopCount = 0
let currentPopCount = 0;
let gameLength = 10000;
let clockId = 0;
let timeRemaining = 0
let currentPlayer = {}
let currentColor = "pink"
let possibleColors = ["pink", "red", "reddish", "purplish", "purple"]

let gameReady = false;
let gameMode = false;
let lobbyMusicChoice = "cake";
let lobbyMusic = document.getElementById("lobby-music-" + lobbyMusicChoice)

//#region most of the stuff I added outside the tutorial

function popSound() {
  // @ts-ignore
  document.getElementById("pop-sound").currentTime = 0;
  //@ts-ignore
  document.getElementById("pop-sound").play();
}

function playMusic() {
  lobbyMusic = document.getElementById("lobby-music-" + lobbyMusicChoice)// @ts-ignore
  lobbyMusic.currentTime = 0;// @ts-ignore
  lobbyMusic.play();
}

function logoClick() {

  popSound()

  if (gameMode == false) {
    document.getElementById("pointer-finger").classList.add("hidden")
    document.getElementById("game-modes").classList.remove("hidden")
    gameMode = true
  }

}

function modeNorm() {
  lobbyMusicChoice = "cake";
  lobbyMusic = document.getElementById("lobby-music-" + lobbyMusicChoice)// @ts-ignore

  // @ts-ignore
  setTimeout(function () { lobbyMusic.play(); }, 0500)
  setInterval(function () {// @ts-ignore
    lobbyMusic.currentTime = 0;// @ts-ignore
    lobbyMusic.play();
    playMusic();
  }, 81000)
}

function modeCode() {

  //@ts-ignore
  document.getElementById("balloon-pop-logo").src = "balloon-pop-logo-codeworks.png"
  let root = document.documentElement;
  root.style.setProperty("--primary", "#03e1ff");
  root.style.setProperty("--primary-dark", "#009eb3");
  root.style.setProperty("--primary-lighten", "#47e9ff");
  root.style.setProperty("--balloon-gradient", "linear-gradient(90deg, rgba(199,248,255,1) 0%, rgba(3,225,255,1) 50%, rgba(0,158,179,1) 100%)");
  root.style.setProperty("--logo-animation", "1s linear infinite");
  root.style.setProperty("--logo-animation-end", "translateX(20px)");
  root.style.setProperty("--logo-animation-start", "translateX(-20px)");
  root.style.setProperty("--balloon-animation", "1s linear infinite");
  root.style.setProperty("--balloon-animation-end", "translateX(20px)");
  root.style.setProperty("--balloon-animation-start", "translateX(-20px)");
  // root.style.setProperty("--logo-animation", "3s linear infinite");
  // root.style.setProperty("--logo-animation", "3s linear infinite");

  lobbyMusicChoice = "8bit"; //@ts-ignore
  lobbyMusic = document.getElementById("lobby-music-" + lobbyMusicChoice)// @ts-ignore
  setTimeout(function () { lobbyMusic.play(); }, 0500)
  setInterval(function () {// @ts-ignore
    lobbyMusic.currentTime = 0;// @ts-ignore
    lobbyMusic.play();
  }, 180000)
}

function modeMetal() {
  //@ts-ignore
  document.getElementById("balloon-pop-logo").src = "balloon-pop-logo-metal.png"
  let root = document.documentElement;
  root.style.setProperty("--primary", "red");
  root.style.setProperty("--primary-dark", "rgb(145, 0, 0)");
  root.style.setProperty("--primary-lighten", "rgb(255, 78, 78)");
  root.style.setProperty("--balloon-gradient", "linear-gradient(90deg, rgba(254,185,185,1) 0%, rgba(255,0,0,1) 47%, rgba(108,0,0,1) 100%)");
  root.style.setProperty("--balloon-animation", "1s linear infinite");
  root.style.setProperty("--balloon-animation-end", "translateX(20px)");
  root.style.setProperty("--balloon-animation-start", "translateX(-20px)");
  root.style.setProperty("--balloon-animation-type", "balloon-shake");
  root.style.setProperty("--logo-animation-type", "balloon-shake");
  root.style.setProperty("--logo-animation", "1s linear infinite");

  //@ts-ignore
  // setTimeout(function () { lobbyMusic.play(); }, 0500)
  // setInterval(function () {// @ts-ignore
  //   lobbyMusic.currentTime = 0;// @ts-ignore
  //   lobbyMusic.play();
  // }, 81000)

  document.getElementById("start-button").setAttribute("onclick", "startGame('metal'), popSound()")
  document.getElementById("pump").setAttribute("onclick", "inflate()")

}

function revealGame() {
  popSound()

  document.getElementById("game-modes").classList.add("hidden")
  document.getElementById("game-display").classList.remove("hidden")

}

function readyGame() {
  document.getElementById("game-controls").classList.remove("hidden")
  document.getElementById("main-controls").classList.add("hidden")
  document.getElementById("scoreboard").classList.add("hidden")
  let countdownElem = document.getElementById("countdown")
  let gameLengthRounded = Math.round(gameLength / 1000)
  countdownElem.innerText = gameLengthRounded.toString()
  gameReady = true;
}

function checkGame() {
  if (gameReady == true) {
    startGame();
    gameReady = false;
  }
}

//#endregion

function startGame(type) {

  if (type == 'metal') {
    gameLength = 7500
    readyGame()
    //@ts-ignore
    document.getElementById("guitar-start").play();
    //@ts-ignore
    lobbyMusic.pause();
    setTimeout(
      //@ts-ignore
      function () { document.getElementById("guitar-music").play() }
      , 1000)
    // setTimeout(
    //   //@ts-ignore
    //   function () { lobbyMusic.play() }
    //   , 7500)
    startClock()
    setTimeout(stopGame, 7500)
  } else {
    startClock()
    setTimeout(stopGame, gameLength)
  }

  //#region unused audio concept
  // setTimeout(
  //   //@ts-ignore
  //   function () { document.getElementById("guitar-build").play() }
  //   , 1000)
  // setTimeout(
  //   //@ts-ignore
  //   function () { document.getElementById("guitar-music").play() }
  //   , 3500)
  // setTimeout(
  //   //@ts-ignore
  //   function () { document.getElementById("guitar-build").pause() }
  //   , 3800)
  //#endregion
}

function startClock() {
  timeRemaining = gameLength;
  drawClock()
  clockId = setInterval(drawClock, 1000)
}

function stopClock() {
  clearInterval(clockId)
}

function drawClock() {
  let countdownElem = document.getElementById("countdown")
  countdownElem.innerText = (Math.round(timeRemaining / 1000)).toString();
  timeRemaining -= 1000;
}

function inflate() {
  clickCount++;
  height += inflationRate;
  width += inflationRate;
  checkBalloonPop();
  draw();
}

function checkBalloonPop() {
  if (height >= maxSize) {
    console.log("pop the balloon")
    let balloonElement = document.getElementById("balloon");
    balloonElement.classList.remove(currentColor)
    getRandomColor()
    balloonElement.classList.add(currentColor)

    popSound()

    currentPopCount++;
    height = 0;
    width = 0;
  }
}

function getRandomColor() {
  let i = Math.floor(Math.random() * possibleColors.length);
  currentColor = possibleColors[i]
}

function draw() {

  let balloonElement = document.getElementById("balloon");
  let clickCountElem = document.getElementById("click-count");
  let popCountElem = document.getElementById("pop-count");
  let highPopCountElem = document.getElementById("high-pop-count")

  let playerNameElem = document.getElementById("player-name")

  balloonElement.style.height = height + "px";
  balloonElement.style.width = width + "px";

  clickCountElem.innerText = clickCount.toString();
  popCountElem.innerText = currentPopCount.toString();
  highPopCountElem.innerText = currentPlayer.topScore.toString();

  playerNameElem.innerText = currentPlayer.name;

}

function stopGame() {
  console.log("game done")

  document.getElementById("game-controls").classList.add("hidden")
  document.getElementById("main-controls").classList.remove("hidden")
  document.getElementById("scoreboard").classList.remove("hidden")

  clickCount = 0
  height = 120
  width = 100

  if (currentPopCount > currentPlayer.topScore) {
    currentPlayer.topScore = currentPopCount
    savePlayers()
  }

  currentPopCount = 0

  stopClock();
  draw();
  drawScoreboard();

  gameReady = false;

  //@ts-ignore
  // document.getElementById("lobby-music").play();
}

//#endregion

let players = []
loadPlayers()

function setPlayer(event) {
  event.preventDefault()
  let form = event.target

  let playerName = form.playerName.value

  currentPlayer = players.find(player => player.name == playerName)

  if (!currentPlayer) {
    currentPlayer = { name: playerName, topScore: 0 }
    players.push(currentPlayer)
    savePlayers()
  }

  form.reset()
  document.getElementById("game").classList.remove("hidden")
  form.classList.add("hidden")
  draw()
  drawScoreboard()
}

function changePlayer() {
  document.getElementById("player-form").classList.remove("hidden")
  document.getElementById("game").classList.add("hidden")
}

function savePlayers() {
  window.localStorage.setItem("players", JSON.stringify(players))
}

function loadPlayers() {
  let playersData = JSON.parse(window.localStorage.getItem("players"))
  if (playersData) {
    players = playersData
  }
}

function drawScoreboard() {
  let template = ""

  players.sort((p1, p2) => p2.topScore - p1.topScore)

  players.forEach(player => {
    template += `
    <div class="d-flex space-between">
        <span>
          <i class="fa fa-user"></i>
          ${player.name}
        </span>
        <span>${player.topScore}</span>
      </div>
    `
  })

  document.getElementById("players").innerHTML = template;

}

drawScoreboard()
