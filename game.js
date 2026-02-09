let p1Combo = 1;
let p2Combo = 1;
let p1Wins = 0;
let p2Wins = 0;
let timeLeft = 90;
let timerInterval;
let p1Score = 0;
let p2Score = 0;
let selectedLevel = 1;
let spawnInterval;
let vanishSpeed;
let gameLoop;

const p1Target = document.getElementById("p1Target");
const p2Target = document.getElementById("p2Target");

let p1TargetActive = false;
let p2TargetActive = false;

function showLevels(){
    document.getElementById("levelBox").style.display = "block";
    document.querySelector(".start-btn").style.display = "none";
}

function setLevel(lvl, btn){
    selectedLevel = lvl;
    document.querySelectorAll(".level-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
}

function startGame(){
    document.getElementById("p1Score").innerText = "0";
    document.getElementById("p2Score").innerText = "0";
    document.getElementById("levelNum").innerText = selectedLevel;
    vanishSpeed = 1300 - (selectedLevel * 80);
    spawnInterval = 2200 - (selectedLevel * 120);
    if(vanishSpeed < 300) vanishSpeed = 300;
    if(spawnInterval < 600) spawnInterval = 600;
    document.getElementById("menu").style.display = "none";
    document.getElementById("gameArea").style.display = "flex";
    document.getElementById("gameTitle").style.display = "block";
    document.getElementById("leaveBtn").style.display = "block";
    startTimer();
    startLoop();
}

function startLoop(){
    clearInterval(gameLoop);
    gameLoop = setInterval(spawnTargets, spawnInterval);
}

function spawnTargets(){
    p1Target.style.display = "block";
    p2Target.style.display = "block";
    p1TargetActive = true;
    p2TargetActive = true;
    setTimeout(()=>{
        if(p1TargetActive) p1Combo = 1;
        if(p2TargetActive) p2Combo = 1;
        p1Target.style.display = "none";
        p2Target.style.display = "none";
        p1TargetActive = false;
        p2TargetActive = false;
    }, vanishSpeed);
}

document.addEventListener("keydown", function(e){
    if(e.key.toLowerCase() === "f" || e.key.toLowerCase() === "l"){
        if(p1TargetActive || p2TargetActive){
            if(e.key.toLowerCase() === "f" && p1TargetActive){
                p1Score += 1;
                p1Combo++;
                document.getElementById("p1Score").innerText = p1Score;
            }
            if(e.key.toLowerCase() === "l" && p2TargetActive){
                p2Score += 1;
                p2Combo++;
                document.getElementById("p2Score").innerText = p2Score;
            }
            p1Target.style.display = "none";
            p2Target.style.display = "none";
            p1TargetActive = false;
            p2TargetActive = false;
        } else {
            if(e.key.toLowerCase() === "f") p1Combo = 1;
            if(e.key.toLowerCase() === "l") p2Combo = 1;
        }
    }
});

function leaveGame(){
    clearInterval(gameLoop);
    clearInterval(timerInterval);
    document.getElementById("menu").style.display = "flex";
    document.getElementById("gameArea").style.display = "none";
    document.getElementById("gameTitle").style.display = "none";
    document.getElementById("leaveBtn").style.display = "none";
    document.querySelector(".start-btn").style.display = "inline-block";
}

function startTimer(){
    clearInterval(timerInterval);
    timeLeft = 90;
    updateTimer();
    document.getElementById("timer").style.display = "block";
    timerInterval = setInterval(()=>{
        timeLeft--;
        updateTimer();
        if(timeLeft <= 0) endRound();
    }, 1000);
}

function updateTimer(){
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    if(seconds < 10) seconds = "0"+seconds;
    document.getElementById("timer").innerText = "0"+minutes+":"+seconds;
}

function endRound(){
    clearInterval(gameLoop);
    clearInterval(timerInterval);
    let winner = "";
    if(p1Score > p2Score){
        winner = "PLAYER 1 WINS!";
        p1Wins++;
    } else if(p2Score > p1Score){
        winner = "PLAYER 2 WINS!";
        p2Wins++;
    } else winner = "IT'S A TIE!";
    document.getElementById("p1Wins").innerText = p1Wins;
    document.getElementById("p2Wins").innerText = p2Wins;
    alert(winner+"\n\nP1: "+p1Score+"\nP2: "+p2Score);
    leaveGame();
}

function openGitHub(){
    window.open("https://github.com/aparajith-B/Board-Game.git","_blank");
}

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle{
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = Math.random()*2 + 1;
        this.speedX = Math.random()*0.5 - 0.25;
        this.speedY = Math.random()*0.5 - 0.25;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw(){
        ctx.fillStyle = "cyan";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

function init(){
    for(let i=0;i<120;i++){
        particlesArray.push(new Particle());
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particlesArray.forEach(p=>{
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
