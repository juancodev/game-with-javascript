/*
 *@type {HTMLCanvasElement}
 */
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');

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
}

let elementsSize;
let canvasSize;

function startGame() {

  let valueWidth = window.innerWidth;
  let valueHeight = window.innerHeight;

  canvasSize = Math.round((valueWidth + valueHeight) / 2 * 0.5);

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementsSize = canvasSize / 10;

  const mapRows = maps[0].trim().split('\n'); // clear string
  const mapRowsCols = mapRows.map(cols => cols.trim().split(''));
  console.log({
    mapRows,
    mapRowsCols
  });

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  game.clearRect(0, 0, canvasSize, canvasSize);
  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {

      if (
        mapRowsCols[row - 1][col - 1] == 'O' &&
        playerPosition.x === undefined &&
        playerPosition.y === undefined
      ) {
        playerPosition.x = Math.round(col * elementsSize);
        playerPosition.y = Math.round(row * elementsSize);
        console.log({
          playerPosition
        })
      } else if (mapRowsCols[row - 1][col - 1] == 'I') {
        giftPosition.x = Math.round(col * elementsSize);
        giftPosition.y = Math.round(row * elementsSize);
        console.log({
          giftPosition
        })
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
    if (playerPosition.x == giftPosition.x && playerPosition.y == giftPosition.y) {
      alert('congratulation');
    }
  }
}

function moveDown() {
  if ((playerPosition.y + elementsSize) > canvasSize) {
    console.log('OUT!');
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
};

function moveLeft() {
  if ((playerPosition.x - elementsSize) < elementsSize) {
    console.log('OUT!');
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
};

function moveRight() {
  if ((playerPosition.x + elementsSize) > canvasSize) {
    console.log('OUT!');
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
};