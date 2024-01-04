let jogo_livreBtn = document.querySelector("#jogo_livre");
let jogo_tempoBtn = document.querySelector("#jogo_tempo");
let modal_element = document.querySelector(".modal");

let time = 120;

const emojis = [
    "☢️",
    "☢️",
    "🌎",
    "🌎",
    "🍉",
    "🍉",
    "🍔",
    "🍔",
    "🤑",
    "🤑",
    "☠️",
    "☠️",
    "🧙‍♂️",
    "🧙‍♂️",
    "💣",
    "💣"
];

let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

/*
for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}
*/

function playSound(audioName, typeAudio, volume, loopChoice) {
    let audio = new Audio(`./src/audios/${audioName}.${typeAudio}`);
    audio.volume = volume;
    audio.loop = loopChoice;
    audio.play();
}

function onLastCardPlaced() {
    document.querySelectorAll(".item").forEach((card) => {
        card.classList.add("boxOpen");
    });

    setTimeout(() => {
        document.querySelectorAll(".item").forEach((card) => {
            card.classList.remove("boxOpen");
            card.onclick = handleClick;
        });
    }, 6000);
}

function createCard(emoji, i) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    document.querySelector(".game").appendChild(box);
}

function placeCardsWithDelay() {
    let delay = 60;

    emojis.forEach((emoji, index) => {
        setTimeout(() => {
            createCard(emoji, index);
            playSound("treki", "wav", 0.5, false);

            if (index === emojis.length - 1) {
                onLastCardPlaced();
            }
        }, index * delay);
    });
}

function handleClick() {
    if(openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
        playSound("card_flip", "mp3", 0.5, false);
    }

    if(openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }

    console.log(openCards);
}

function checkMatch() {
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    }
    else{
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        playSound("book_close", "mp3", 0.5, false);
    }

    openCards = [];

    if(document.querySelectorAll(".boxMatch").length == emojis.length){
        alert("voce venceu");
    }
}

function countDownTimer() {
    setInterval(countTime, 1000);
}

function countTime() {
    time--;

    if(time <= 15 && time > 0) {
        playSound("tick", "mp3", 0.5, false);
    }

    if(time == 0){
        alert("fodac");
    }
}

jogo_livreBtn.addEventListener("click", () => {
    modal_element.classList.add("modal-hide");
    placeCardsWithDelay();
});

jogo_tempoBtn.addEventListener("click", () => {
    modal_element.classList.add("modal-hide");
    placeCardsWithDelay();
    setTimeout(() => {
        countDownTimer();
    }, 6000);
});
