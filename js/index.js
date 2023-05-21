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
    this.y = -20;
    this.speed = Math.random() * 2 + 2;
    this.color = this.randomColor();
    this.blocks = this.createTetrimino();
    this.rotateAngle = 0;
    this.rotateSpeed = Math.random() * 0.02; 
    this.rotateDirection = Math.round(Math.random()) * 2 - 1;
    this.startDelay = Math.floor(Math.random() * 200); 
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

    return shapes[Math.floor(Math.random() * shapes.length)];
  }

  draw() {
    if (this.startDelay > 0) {
      this.startDelay--; // 지연이 있는 경우, 지연을 줄여나가며 시작시간을 지연시킴
      return;
    }
    this.y += this.speed;
    const blockSize = 20;
    ctx.save(); // 현재 캔버스 상태를 저장
    ctx.translate(this.x + blockSize * 1.5, this.y + blockSize * 1.5); // 회전 중심점을 블록의 중앙으로 이동
    ctx.rotate(this.rotateAngle); // 블록 회전시키기
    ctx.translate(-this.x - blockSize * 1.5, -this.y - blockSize * 1.5); // 회전 중심점을 원래 상태로 되돌리기
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
    ctx.restore(); // 이전 캔버스 상태를 복원
    
    this.rotateAngle +=  this.rotateSpeed * this.rotateDirection; // 회전 각도를 천천히 증가시키기

    if (this.y > canvas.height) { //한 번 만들어진 오브젝트가 화면 아래로 내려가면 위치 변수를 조정하고 새로 만듦
      this.y = -10;
      this.x = Math.random() * canvas.width;
      this.blocks = this.createTetrimino();
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
