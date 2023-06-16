/*
 *@type {HTMLCanvasElement}
 */
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const playerLives = document.getElementById('lives');
const playerTimesNow = document.getElementById('time');
const playerTimesRecord = document.getElementById('record');
const playerFinished = document.getElementById('finish');
const countTimeout = document.getElementById('timeout');
const btnRestart = document.getElementById('restart');


window.addEventListener('load', startGame);
window.addEventListener('resize', startGame);
window.addEventListener('keydown', playerMove);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

const playerPosition = {
  x: undefined,
  y: undefined,
}

const giftPosition = {
  x: undefined,
  y: undefined,
};

let enemyPositions = [];

let elementsSize;
let canvasSize;
let level = 0;
let lives = 3;
let timeInterval;
let timeStart;
let timePlayer;
let keyLocalStorage = 'playerTimeRecord'

function startGame() {

  let valueWidth = window.innerWidth;
  let valueHeight = window.innerHeight;

  canvasSize = Math.round((valueWidth + valueHeight) / 2 * 0.5);

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementsSize = canvasSize / 10;

  const map = maps[level];

  if (!map) {
    gameWinAndRecord();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }

  const mapRows = map.trim().split('\n'); // clear string
  const mapRowsCols = mapRows.map(cols => cols.trim().split(''));

  showLives();

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  // clear enemies and player position

  enemyPositions = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

  // for each icon in the map.

  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {

      if (
        mapRowsCols[row - 1][col - 1] == 'O' &&
        playerPosition.x === undefined &&
        playerPosition.y === undefined
      ) {
        playerPosition.x = Math.round(col * elementsSize);
        playerPosition.y = Math.round(row * elementsSize);

      } else if (mapRowsCols[row - 1][col - 1] == 'I') {
        giftPosition.x = Math.ceil(col * elementsSize);
        giftPosition.y = Math.ceil(row * elementsSize);

      } else if (mapRowsCols[row - 1][col - 1] == 'X') {
        enemyPositions.push({
          x: Math.round(col * elementsSize),
          y: Math.round(row * elementsSize)
        });

      }


      game.fillText(emojis[mapRowsCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
    }
  }
  moveEmojiPlayer();

  // window.innerHeight()
  // window.innerWidth()
};

function moveEmojiPlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX = Math.round(enemy.x);
    const enemyCollisionY = Math.round(enemy.y);
    if (enemyCollisionX == playerPosition.x && enemyCollisionY == playerPosition.y) {
      return enemyCollisionX && enemyCollisionY;
    }
  });

  if (enemyCollision) {
    game.fillText(emojis['BOMB_COLLISION'], playerPosition.x, playerPosition.y);
    lives -= 1;
    levelFail();
  }

}


function playerMove(event) {
  switch (event.code) {
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowDown':
      moveDown();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowRight':
      moveRight();
      break;
  }
};

function moveUp() {
  if ((playerPosition.y - elementsSize) < elementsSize) {
    console.log('OUT!');
  } else {
    playerPosition.y -= elementsSize;
    startGame();
    if ((playerPosition.x == giftPosition.x) && (playerPosition.y == giftPosition.y)) {
      levelUp();
    }
  }
}

function moveDown() {
  if ((playerPosition.y + elementsSize) > canvasSize) {
    console.log('OUT!');
  } else {
    playerPosition.y += elementsSize;
    startGame();
    if (playerPosition.x == giftPosition.x && playerPosition.y == giftPosition.y) {
      levelUp();
    }
  }
};

function moveLeft() {
  if ((playerPosition.x - elementsSize) < elementsSize) {
    console.log('OUT!');
  } else {
    playerPosition.x -= elementsSize;
    startGame();
    if (playerPosition.x == giftPosition.x && playerPosition.y == giftPosition.y) {
      levelUp();
    }
  }
};

function moveRight() {
  if ((playerPosition.x + elementsSize) > canvasSize) {
    console.log('OUT!');
  } else {
    playerPosition.x += elementsSize;
    startGame();
    if (playerPosition.x == giftPosition.x && playerPosition.y == giftPosition.y) {
      levelUp();
    }
  }
};

function levelUp() {
  level++;
  startGame();
}

function levelFail() {
  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWinAndRecord() {
  clearInterval(timeInterval);

  const totalTimeOfTheGame = playerTimesNow.getInnerHTML();
  if (localStorage.length === 0) {
    localStorage.setItem(keyLocalStorage, totalTimeOfTheGame);
    playerTimesRecord.innerHTML = localStorage.getItem(keyLocalStorage);
  } else if (localStorage.length !== 0 && localStorage.getItem(keyLocalStorage) > totalTimeOfTheGame) {
    localStorage.removeItem(keyLocalStorage);
    localStorage.setItem(keyLocalStorage, totalTimeOfTheGame);
    playerTimesRecord.innerHTML = localStorage.getItem(keyLocalStorage);
  } else {
    playerTimesRecord.innerHTML = localStorage.getItem(keyLocalStorage);
  }

  finish();

}

function showLives() {
  const heartsArray = Array(lives).fill(emojis['HEART']);

  // clear for every moving step
  playerLives.innerHTML = "";

  for (let i = 0; i < heartsArray.length; i++) {
    playerLives.append(heartsArray[i]);
  }
}

function showTime() {
  playerTimesNow.innerHTML = Date.now() - timeStart;
}

function showRecord() {
  playerTimesRecord.innerHTML = localStorage.getItem(keyLocalStorage) || 0;
}

function finish() {
  playerFinished.classList.remove('notVisible');
  document.querySelector('.game-container').style.filter = "blur(5px)"

  let count = 10;

  let interval = setInterval(() => {
    count--;
    countTimeout.textContent = count.toString();

    if (count === 0) {
      clearInterval(interval);
      location.reload();
    }
  }, 1000);

  btnRestart.addEventListener('click', () => {
    location.reload();
  })
}