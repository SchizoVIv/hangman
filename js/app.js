const body = document.querySelector(".body");

let word;
let correctLetter = 0;
let lives = 0;
let rundomN = 0;

const section = document.createElement("section");
section.classList = "section";
body.append(section);
console.log(body);

const divHangman = document.createElement("div");
const divHangmanImg = document.createElement("img");
const divHangmanTitle = document.createElement("h1");
const divResult = document.createElement("div");
const divResConteiner = document.createElement("div");
const divResImg = document.createElement("img");
const divResText = document.createElement("p");
const divResAns = document.createElement("p");
const divResButton = document.createElement("button");
const div = document.createElement("div");
const divGame = document.createElement("div");
const divGameUl = document.createElement("ul");
const divGameTitle = document.createElement("h2");
const divGameSubtitle = document.createElement("h3");
const divGameRiddle = document.createElement("p");
const divGameTrying = document.createElement("p");
const divKeyboard = document.createElement("div");

divHangman.classList = "hangman";
divHangmanImg.classList = "hangman__image";
divHangmanImg.src = "./images/hangman-0.svg";
divHangmanImg.alt = "gallows";
divHangmanTitle.classList = "hangman__title";
divHangmanTitle.textContent = "Hangman Game";
divResult.classList = "result result_overfloy_hidden";
divResConteiner.classList = "result__conteiner";
divResImg.classList = "result__img";
divResImg.src = "./images/289975941006211.png";
divResImg.alt = "Game over";
divResText.classList = "result__text";
divResText.textContent = "Game over";
divResAns.classList = "result__ans";
divResButton.classList = "result__button";
divResButton.textContent = "Play again";
divGame.classList = "game";
divGameUl.classList = "game__word";
divGameTitle.classList = "game__title";
divGameTitle.textContent = "Hint:";
divGameRiddle.classList = "game__riddle";
divGameSubtitle.classList = "game__subtitle";
divGameSubtitle.textContent = "Incorrect guesses";
divGameTrying.classList = "game__trying";
divGameTrying.textContent = `${lives} / 6`;
divKeyboard.classList = "keyboard";

section.append(divHangman, divResult, div);
divHangman.append(divHangmanImg, divHangmanTitle);
divResult.append(divResConteiner);
div.append(divGame, divKeyboard);

divResConteiner.append(divResImg, divResText);
divResConteiner.append(divResImg, divResText, divResAns, divResButton);

const clickBord = (e, b) => {
    comparison(e, b)
}



for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.classList = "kb kb_hover";
    button.textContent = String.fromCharCode(i);
    divKeyboard.appendChild(button);

    

    button.addEventListener("click", (e) => clickBord(e.target, String.fromCharCode(i)));
    //button.addEventListener("click", () => clickBord(i));
}

const btnKeyboard = document.querySelectorAll(".kb");
const modalImage = document.querySelector(".result__img");
const modalWindoy = document.querySelector(".result");
const modalText = document.querySelector(".result__text");
const imgHangman = document.querySelector(".hangman__image");

// function shuffle(array) {
//     let i = array.length,
//         j = 0,
//         temp;

//     while (i--) {

//         j = Math.floor(Math.random() * (i+1));

//         // swap randomly chosen element with current element
//         temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;

//     }

//     return array;
// }

// var ranNums = shuffle([1,2,3,4,5,6,7,8,9,10]);


const getRandomWord = () => {
    // let divResA = document.querySelector(".result__ans")
    let randomNumb = Math.floor(Math.random() * wordArr.length);
    // let newArr = shuffle(wordArr); 

    if (rundomN !== randomNumb) {
        rundomN = randomNumb;
    } else {
        if (randomNumb >= wordArr.length) {
            randomNumb -= 1;

        } else {
            randomNumb += 1;
        }
    }
    
    const { answer, riddle } = wordArr[randomNumb];

    const addLetter = document.createElement('li');
    addLetter.className = "game__letter";

    word = answer;
    // divResA.textContent = word;
    
    divGameRiddle.textContent = riddle;

    divGameUl.innerHTML = answer
        .split("")
        .map(() => `<li class="game__letter"></li>`)
        .join("");

    div.append(divGame, divKeyboard);
    divGame.append(divGameUl, divGameTitle, divGameRiddle, divGameSubtitle, divGameTrying);


    console.log(answer);
    
}

const startGame = () => {
    modalWindoy.classList.add("result_overfloy_hidden");
    lives = 0;
    correctLetter = 0;
    imgHangman.src = `./images/hangman-${lives}.svg`;
    document.querySelector(".game__trying").textContent = `${lives} / 6`;
    btnKeyboard.forEach((e) => {
        e.removeAttribute("disabled");
    })

    getRandomWord();
}

// const liveText = document.querySelector(".game__trying");

const comparison = (button, letter) => {
    let divResA = document.querySelector(".result__ans");
    divResA.textContent = word;

    let compLetterList = document.querySelectorAll(".game__letter");
    if (word.toLowerCase().includes(letter) && lives < 6) {
        word.toLowerCase().split("").forEach((i, index) => {
            if (i === letter) {
                compLetterList[index].textContent = letter;
                compLetterList[index].classList.add("game__letter_border_none");
                button.setAttribute("disabled", "disabled");
                button.classList.remove("kb_hover");
                correctLetter = correctLetter + 1;
            }
        })

        if (correctLetter === compLetterList.length && lives < 6) {
            setTimeout(() => {
                console.log("1")
                modalImage.src = "./images/image-424.png";
                // modalImage.src = imgCat2;
                modalWindoy.classList.remove("result_overfloy_hidden");
                modalText.textContent = "You win!";
            }, 300)
        }

    } else {
        if (correctLetter !== compLetterList.length) {
            lives = lives + 1;
            imgHangman.src = `./images/hangman-${lives}.svg`;
            button.setAttribute("disabled", "disabled");
            button.classList.remove("kb_hover");
            document.querySelector(".game__trying").textContent = `${lives} / 6`;
        }
        if (lives >= 6) {
            setTimeout(() => {
                modalText.textContent = "Game over!";
                modalImage.src = "./images/289975941006211.png";
                // modalImage.src = imgCat1;
                modalWindoy.classList.remove("result_overfloy_hidden");
            }, 300)
        }
    }
}

// const compKey = (letter) => {
//     let buttnArr = document.querySelectorAll(".kb");
//     console.log(buttnArr);
// }

const compKey = (letter) => {
    let divResA = document.querySelector(".result__ans");
    divResA.textContent = word;

    let compLetterList = document.querySelectorAll(".game__letter");
    let buttnArr = document.querySelectorAll(".kb");

    // buttnArr.forEach((el) => {
    //     if (el.textContent === letter && lives < 6) {
    //         el.setAttribute("disabled", "disabled");
    //         el.classList.remove("kb_hover");
    //     }
    // })

    if (word.toLowerCase().includes(letter) && correctLetter !== compLetterList.length) { 
        console.log(letter)
        word.toLowerCase().split("").forEach((i, index) => {
            if (i === letter) {
                compLetterList[index].textContent = letter;
                compLetterList[index].classList.add("game__letter_border_none");
                correctLetter = correctLetter + 1;
            }
        })
        if (correctLetter === compLetterList.length) {
            setTimeout(() => {
                console.log("2")
                modalImage.src = "./images/image-424.png";
                // modalImage.src = imgCat2;
                modalWindoy.classList.remove("result_overfloy_hidden");
                modalText.textContent = "You win!";
            }, 300)
        }
    } else {
        buttnArr.forEach((el) => {
            if (!el.hasAttribute("disabled") && el.textContent === letter && lives < 6) {
                if (correctLetter !== compLetterList.length){
                    lives = lives + 1;
                    console.log(lives);
                    imgHangman.src = `./images/hangman-${lives}.svg`;
                    document.querySelector(".game__trying").textContent = `${lives} / 6`;
                }
                if (lives >= 6) {
                    setTimeout(() => {
                        modalText.textContent = "Game over!";
                        modalImage.src = "./images/289975941006211.png";
                        // modalImage.src = imgCat1;
                        modalWindoy.classList.remove("result_overfloy_hidden");
                    }, 300)
                }
            }
        })
    }

        
        // if (correctLetter !== compLetterList.length){
        //         lives = lives + 1;
        //         console.log(lives);
        //         imgHangman.src = `./images/hangman-${lives}.svg`;
        //         document.querySelector(".game__trying").textContent = `${lives} / 6`;
        //     }
        //     if (lives >= 6) {
        //             setTimeout(() => {
        //                     modalText.textContent = "Game over!";
        //                     modalImage.src = "../images/289975941006211.png";
        //                     modalWindoy.classList.remove("result_overfloy_hidden");
        //                 }, 300)
        //             }
        //         }
        buttnArr.forEach((el) => {
            if (el.textContent === letter && lives < 6) {
                el.setAttribute("disabled", "disabled");
                el.classList.remove("kb_hover");
            }
        })

    
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode
        >= 65 && event.keyCode
        <= 90) {
        compKey(event.key)
    }
});

const modalButtonStart = document.querySelector(".result__button");
modalButtonStart.addEventListener("click", function () {
    startGame()
} )

getRandomWord();
