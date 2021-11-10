let playgroundwidth = 0
let playgroundheight = 0

let simpran = null; //gahannone ekaa
let bombs = null; // gahuwoth kela wena ekaa
let sadManiya = null;// gahuwama time hambena ekaa

let score = 0;
let time = 10;

let objectCreator = setInterval(() => {

}, 100);


displayObject =
{
    "createObject": function (sleepTime, type, imgName) {
        this.positionX = Math.floor(Math.random() * ((playgroundwidth - 70) - 3)) + 3;
        this.positionY = Math.floor(Math.random() * ((playgroundheight - 70) - 3)) + 3;

        let randomID = Math.floor(Math.random() * (1000 - 1)) + 1
        this.element = document.createElement("img")
        this.element.src = imgName
        this.element.className = type
        this.element.id = "ID" + randomID
        this.element.style.left = this.positionX + "px"
        this.element.style.top = this.positionY + "px";
        playground.insertAdjacentElement("afterbegin", this.element);

        this.element.addEventListener('click', () => {
            if (type == "bomb") {
                this.audio = new Audio("bomb.mp3")
                this.audio.volume = 0.40
                this.audio.play()
                clearInterval(objectCreator)
                playground.innerHTML = ""
                let endElem = document.createElement("h2")
                endElem.className = "bomb"
                endElem.textContent = `ගේම් එක ඉවරයි. ළකුණු ${score}යි.ආපහු ගහනවනම් ප්ලේ බටං එක ඔබන්ඩ `
                playground.insertAdjacentElement("afterbegin", endElem)
                clearInterval(countDowner)
                setTimeout(() => {
                    postScore()
                }, 2000);
            }
            if (type == "sadmanitha") {
                time = time + 10;
                this.audio = new Audio("heal.mp3")
                this.audio.volume = 0.40;
                this.audio.play()
                clearTimeout(this.timeoutCounter)
                playground.removeChild(this.element)
                return;
            }
            if (type == "simpran") {
                score += 1;
                document.getElementById("scoreBoard").innerText = `Score ${score}`
                this.audio = new Audio("punch.mp3")
                this.audio.volume = 0.40
                this.audio.play()
                clearTimeout(this.timeoutCounter)
                this.element.remove()
            }
        });

        this.timeoutCounter = setTimeout(() => {
            console.log(this.element.id)
            playground.removeChild(this.element)
        }, sleepTime);
        return;
    }
}

function play() {
    time = 20;
    score = 0;
    let playground = document.getElementById("playground");
    playground.innerHTML = ""
    playgroundwidth = playground.clientWidth
    playgroundheight = playground.clientHeight

    const username = document.getElementById("playername").value;
    if(username.trim() ==""){
        alert(`බල්ලො නමක් දාපං හරි විදියට`);
        return;
    }

    objectCreator = setInterval(() => {
        let playground = document.getElementById("playground");
        playground.innerHTML = ""

        let sleepTime = Math.floor(Math.random() * (1500 - 700) + 700)

        let randClass = Math.floor(Math.random() * (4 - 1) + 1)

        if (randClass == 1) {
            displayObject.createObject(sleepTime, "simpran", 'simpran.jpg')
        }
        if (randClass == 2) {
            displayObject.createObject(sleepTime, "bomb", 'tiktok.png')
        }
        if (randClass == 3) {
            displayObject.createObject(sleepTime, "sadmanitha", 'sadManitha.png')
        }
        if (randClass == 4) {
            displayObject.createObject(sleepTime, "bomb", 'nangiya.jpg')
        }
    }, 2500);

    countdown()
}

let countDowner;
function countdown() {
    let timeCounter = document.getElementById("timeleft")
    countDowner = setInterval(() => {
        timeCounter.innerText = `Time left ${time}`
        if (time == 0) {
            let playground = document.getElementById("playground");
            clearInterval(objectCreator)
            playground.innerHTML = ""
            let endElem = document.createElement("h2")
            endElem.className = "bomb"
            endElem.textContent = `ගේම් එක ඉවරයි. ළකුණු ${score}යි.ආපහු ගහනවනම් ප්ලේ බටං එක ඔබන්ඩ `
            playground.insertAdjacentElement("afterbegin", endElem)
            clearInterval(countDowner)
            setTimeout(() => {
                postScore()
            }, 1000);
        } else {
            time -= 1
        }
    }, 1000);
}

function postScore() {
    const xhttp = new XMLHttpRequest();
    const username = document.getElementById("playername").value;
    xhttp.open("GET", "score.php?score=" + score + "&name=" + username);
    xhttp.send();
}

function htp(){
    let playground = document.getElementById("playground");
    playground.innerHTML = ""
    playground.innerHTML = `<p><strong>ලතා අක්කා</strong> විවාහපත් කරගෙන <strong>පස්වෙනි</strong> වතාවටත් කසාද බඳින <strong>සිම්ප් සර් (මිස්&zwj;ටර් කොන් ලොස්ට්)</strong> කරන මේ අසාධාරනය හේතුවෙන් අගතියට පත් ලතා අක්කාට සිතින් විතරක් ප්&zwj;රේම කරාපු <strong>නවෝජිත්</strong>, <strong>කයිබර්</strong> ඇතුලු සියලු දෙනාත් සදා තනිකඩ සංගමයේ සියලු සාමාජිකයන්ගේත් ඉල්ලීම පරිදි සිම්ප් සර් ගෙන් පලිගැනීම සඳහා මේ මල රහක් නැති රෙද්දේ ක්&zwj;රීඩාව බිහිවූ වගයි&hellip;</p>
    <p><br></p>
    <p>මේ ක්&zwj;රීඩාවේ නාමය <strong>හිට්රාන්&nbsp;</strong>වේ. මහ රෙද්දක් කරන්ඩ නෑ බං. ඉස්සෙල්ලම නම උඩ තියෙන කොටුවේ ටයිප් කොරාලා ස්ටාර්ට් එක එබුවට පස්සෙ එක එක පින්තූර පේන්න ගනී. අපේ පරම සතුරා, පරම එනිමි වන සිම්ප් මහතාගෙ ෆොටෝ එක පෙනුන ගමන් ඒක ඔබන්ඩ තමා තියෙන්නෙ. එබුවම ලකුනු හම්බෙනව. එතකොට අපේ මෝඩ මනිගර් සර් ගේ ෆොටෝ එක උඩ එබුවම ටයිම් එක වැඩි වෙනවා. එතකොට අපේ අතිජාත ටික්ටොක් නංගියා උඩ එබුවොත් සොරි ඩොට් කොම්. අතිශයින්ම පීසී එකේ ප්ලේ කිරීම සඳහා පමනයි.</p>
    <p><br></p>
    <p>සෝ ඔච්චරයි ගේම් එක. <strong>මෙවැනි කැත, රහක් නැති, මෙලෝ නැති, ඉදිමුනු උන්ඩුකපුච්චයක් වැනි වූ තවත් සෙල්ලමකිං හමුවෙමු.</strong></p>
    <p><br></p>`;
}

function leaderboard(){
    let playground = document.getElementById("playground");
    playground.innerHTML = ""
    playground.innerHTML = `<p>හිටපං ලෝඩ් වෙනවා</p><p><br></p>`

}