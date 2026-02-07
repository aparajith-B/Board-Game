let p1Score = 0;
let p2Score = 0;

let winScore = 10;
let spawnTime = 1200;

const p1Target = document.getElementById("p1Target");
const p2Target = document.getElementById("p2Target");

function spawnTargets(){
    p1Target.style.display = "block";
    p2Target.style.display = "block";

    setTimeout(() => {
        p1Target.style.display = "none";
        p2Target.style.display = "none";
    }, spawnTime);
}

// start loop
setInterval(spawnTargets, 2000);

document.addEventListener("keydown", function(e){

    if(e.key === "f" || e.key === "F"){
        if(p1Target.style.display === "block"){
            p1Score++;
            document.getElementById("p1Score").innerText = p1Score;
            p1Target.style.display = "none";
        }
    }

    if(e.key === "l" || e.key === "L"){
        if(p2Target.style.display === "block"){
            p2Score++;
            document.getElementById("p2Score").innerText = p2Score;
            p2Target.style.display = "none";
        }
    }

});
