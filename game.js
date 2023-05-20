/*
 *@type {HTMLCanvasElement}
 */
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame)

function startGame() {


  let valueWidth = window.innerWidth;
  let valueHeight = window.innerHeight;

  let canvasSize = (valueWidth + valueHeight) / 2 * 0.55;

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  let elementsSize = canvasSize / 10;

  console.log({
    canvasSize,
    elementsSize
  });

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  for (let i = 1; i <= 10; i++) {
    game.fillText(emojis['X'], elementsSize * i, elementsSize);
  }
  // window.innerHeight()
  // window.innerWidth()
  // game.fillRect(0, 0, 100, 100);
  // game.clearRect(0, 0, 50, 50);
  // game.clearRect(0, 0, 100, 50);

  // game.fillText('Test', 50, 50);
  // game.fillStyle = 'indigo';
  // game.textAlign = 'start';
  // game.font = '25px Verdana';
}