// guide \\

const question = document.querySelector('.area-for-hover');
const guide = document.querySelector('.guide');
const buttons = document.querySelectorAll('a');

question.addEventListener('mouseover', ()=>{
  guide.classList.remove('hidden');
});
question.addEventListener('mouseout', ()=>{
    guide.classList.add('hidden');
  });
// guide \\


//Tetris-Rain \\

const canvas = document.getElementById("tetris-rain");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Tetrimino {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.speed = Math.random() * 2 + 1;
    this.color = this.randomColor();
    this.blocks = [];
    this.createTetrimino();
  }

  randomColor() {
    const colors = ["cyan", "blue", "orange", "yellow", "green", "purple", "red"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  createTetrimino() {
    const shapes = [
      [[1, 1, 1],
      [0, 1, 0]],

      [[1, 1, 0],
      [0, 1, 1]],

      [[0, 1, 1],
      [1, 1, 0]],

      [[1, 1],
      [1, 1]],

      [[1, 1, 0],
      [1, 1]],

      [[1, 1],
      [0, 1, 1]],

      [[0, 0, 1],
      [1, 1, 1]]
    ];

    this.blocks = shapes[Math.floor(Math.random() * shapes.length)];
  }

  draw() {
    this.y += this.speed;

    const blockSize = 20;

    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].length; j++) {
        if (this.blocks[i][j]) {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x + blockSize * j, this.y + blockSize * i, blockSize, blockSize);
          ctx.strokeStyle = 'black';
          ctx.strokeRect(this.x + blockSize * j, this.y + blockSize * i, blockSize, blockSize);
        }
      }
    }
    
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
      this.blocks = [];
      this.createTetrimino();
    }
  }
}

let tetriminos = [];

function createTetriminos() {
  for (let i = 0; i < 100; i++) {
    tetriminos.push(new Tetrimino());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const tetrimino of tetriminos) {
    tetrimino.draw();
  }

  requestAnimationFrame(animate);
}

createTetriminos();
animate();
