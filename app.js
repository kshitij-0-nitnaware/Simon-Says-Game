let gameSeq = [];
let userSeq = [];
let btnColors = ["red", "purple", "green", "yellow"];
let highestScore = 0;
let startBtn = document.querySelector("#startBtn");
let restartBtn = document.querySelector("#restartBtn");

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

startBtn.addEventListener("click", function () {
  if (!started) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * 4);
  let randomCol = btnColors[randomIdx];
  gameSeq.push(randomCol);
  console.log(gameSeq);
  let ranButton = document.querySelector(`.${randomCol}`);
  btnFlash(ranButton);
}

function checkAns(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over! your score was: <b>${
      level - 1
    }</b> <br> Press <u>Restart</u> key to restart.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    restartBtn.addEventListener("click", function() {
      restart();
    });
  }
}

function buttonPress() {
  let btn = this;
  userFlash(btn);

  let usercolor = btn.getAttribute("id");
  userSeq.push(usercolor);

  checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
  btn.addEventListener("click", buttonPress);
}

function restart() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;

  h2.innerHTML = "Press <u>Start</u> key to start the game";
}
