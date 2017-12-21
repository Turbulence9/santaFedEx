let canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = 960;
canvas.height = 640;

let blueBox = new Image(224, 224);
blueBox.src = 'assets/blueBox.png';
let redBox = new Image(224, 224);
redBox.src = 'assets/redBox.png';
let greenBox = new Image(224, 224);
greenBox.src = 'assets/greenBox.png';
let yellowBox = new Image(224, 224);
yellowBox.src = 'assets/yellowBox.png';
let santa = new Image(224, 448);
santa.src = 'assets/santa.png';
let bluePresent = new Image(56, 56);
bluePresent.src = 'assets/bluePresent.png';
let redPresent = new Image(56, 56);
redPresent.src = 'assets/redPresent.png';
let greenPresent = new Image(56, 56);
greenPresent.src = 'assets/greenPresent.png';
let yellowPresent = new Image(56, 56);
yellowPresent.src = 'assets/yellowPresent.png';
let numbers = new Image(440, 86);
numbers.src = 'assets/numbers.png';
let sound = document.getElementById("sound");
sound.loop = true;
sound.play();
let keys = [];
let frameCount = 0;
let boxOffset = [8,248,488,728];
let presentImgs = [bluePresent,redPresent,greenPresent,yellowPresent]
let santaPos = 0;
let pressingRight = false;
let pressingLeft = false;
let presents = [];
let presentSpawnSpd = 60;
let presentsSpd = 2;
let score = 0;
let lose = false;

function update() {
  frameCount++;
  ctx.clearRect(0, 0, 960, 640);
  //moving santa left and right
  if (!lose) {
  if (keys[39] && santaPos < 3 && !pressingRight) {
    santaPos++;
    pressingRight = true;
  }

  if(!keys[39]) {
    pressingRight = false;
  }

  if (keys[37] && santaPos > 0 && !pressingLeft) {
    santaPos--;
    pressingLeft = true;
  }

  if(!keys[37]) {
    pressingLeft = false;
  }
  if(frameCount % presentSpawnSpd === 0) {
    presents.push({
      colorPos : Math.floor(Math.random()*4),
      y : 500
    });
  }
}
  ctx.drawImage(blueBox,boxOffset[0],0);
  ctx.drawImage(redBox,boxOffset[1],0);
  ctx.drawImage(greenBox,boxOffset[2],0);
  ctx.drawImage(yellowBox,boxOffset[3],0);
  ctx.drawImage(santa,boxOffset[santaPos],180);
  ctx.font = '48px serif';
  ctx.fillText(score, 50, 600);
  presents.forEach((present,index) => {
    present.y -= presentsSpd;
    if (present.y <= 140) {
      if (present.colorPos === santaPos) {
        score += 100;
      } else {
        lose = true;
      }
      presents.splice(index,1);
    }
    ctx.drawImage(presentImgs[present.colorPos],boxOffset[santaPos]+84,present.y);
  });

  requestAnimationFrame(update);
}

document.body.addEventListener("keydown", function(e) {
  keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
  keys[e.keyCode] = false;
});

window.addEventListener("load", function() {
  update();
});
