const hoverSound = document.querySelector('[data-sound]');
const buttonsWithSound = document.querySelectorAll('.sound');
const volumeToggle = document.querySelector('[data-volume-toggle]');
let isMuted = true;
const inititalModal = document.querySelector('[data-modal]');
const overlay = document.querySelector('[data-overlay]');
const playGameBtn = document.querySelectorAll('[data-play-btn]');
const resetBtn = document.querySelector('[data-reset-btn]');
const openRulesModalBtn = document.querySelectorAll('[data-rules-btn]');
const checkScoresBtn = document.querySelector('[data-scores-btn]');
const scoresModal = document.querySelector('[data-scores-modal]');
const selectionIcons = document.querySelectorAll('[data-selection]');
const lastColumn = document.querySelector('[data-last-column]');
const playerScore = document.querySelector('[data-player-score]');
const computerScore = document.querySelector('[data-computer-score]');
const win = document.querySelector('[data-player-wins]');
const lose = document.querySelector('[data-computer-wins]');
let gameActive = true;
let tabVisible = true;
let userInteracted = false;
const endGameMessage = document.querySelector('[data-end-game-message]');
const rules = [
    {
        name: 'rock',
        symbol: '✊',
        beats: ['scissors', 'lizard']
    },
    {
        name: 'paper',
        symbol: '🖐',
        beats: ['rock', 'spock']
    },
    {
        name: 'scissors',
        symbol: '✌️',
        beats: ['paper', 'lizard']
    },
    {
        name: 'lizard',
        symbol: '🤏',
        beats: ['spock', 'paper']
    },
    {
        name: 'spock',
        symbol: '🖖',
        beats: ['scissors', 'rock']
    }
];

// Check if user has interacted

function handleUserInteraction() {
    userInteracted = true;
}

window.addEventListener('click', handleUserInteraction);
window.addEventListener('keydown', handleUserInteraction);

function hasUserInteracted() {
    return userInteracted;
}

// Pause game while tabbed out

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState !== "visible") {
        tabVisible = false;
        isMuted = true;
        volumeToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    } else {
        tabVisible = true;
    }
});

// Opening and closing the modals

playGameBtn.forEach(btn => btn.addEventListener('click', closeModal));
checkScoresBtn.addEventListener('click', openScoresModal);
overlay.addEventListener('click', closeModal);

openRulesModalBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        overlay.classList.add('open');
        inititalModal.classList.add('open');
    });
});

function closeModal() {
    inititalModal.classList.remove('open');
    scoresModal.classList.remove('open');
    overlay.classList.remove('open');
    endGameMessage.innerText = '';
    if (gameActive === false) {
        resetUI(playerScore, computerScore);
    }
}

function openScoresModal() {
    scoresModal.classList.add('open');
    overlay.classList.add('open');
}

// Reset game scores

resetBtn.addEventListener('click', e => {
    localStorage.setItem('playerWins', 0);
    localStorage.setItem('computerWins', 0);
    win.innerText = 0;
    lose.innerText = 0;

    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    let ripples = document.createElement('span');
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';
    resetBtn.appendChild(ripples);

    setTimeout(() => {
        ripples.remove();
    }, 500);
});

// Sound effect for buttons

buttonsWithSound.forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (!isMuted && tabVisible && hasUserInteracted()) {
            hoverSound.play();
        } else return;
    });
});

// Mute sound

volumeToggle.addEventListener('click', e => {
    e.stopPropagation();
    if (!isMuted) {
        isMuted = true;
        volumeToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        hoverSound.pause();
    } else {
        isMuted = false;
        volumeToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        if (tabVisible) {
            hoverSound.play();
        }
    }
});

// Game functionality

function computerPlay() {
    const randomIndex = Math.floor(Math.random() * rules.length);
    return rules[randomIndex];
}

selectionIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const computerChoice = computerPlay();
        const selectedIcon = icon.dataset.selection;
        const playerChoice = rules.find(rule => rule.name === selectedIcon);
        const roundResult = playRound(playerChoice, computerChoice);
        incrementScore(roundResult);
    });
});

function playRound(playerChoice, computerChoice) {
    const playerWin = determineWinner(playerChoice.beats, computerChoice.name);
    const computerWin = determineWinner(computerChoice.beats, playerChoice.name);
    updateUI(computerChoice, computerWin);
    updateUI(playerChoice, playerWin);
    if (playerWin) {
        return 'WIN';
    } else if (computerWin) {
        return 'LOSE';
    } else {
        return 'DRAW';
    }
}

function determineWinner(selection, opponentSelection) {
    return selection.includes(opponentSelection);
}

function updateUI(selection, winner) {
    const element = document.createElement('div');
    element.innerText = selection.symbol;
    element.classList.add('result');
    if (winner) {
        element.classList.add('winner');
    }
    lastColumn.after(element);

    adjustOverlayHeight();
}

function adjustOverlayHeight() {
    const bodyHeight = document.body.scrollHeight;
    overlay.style.height = `${bodyHeight}px`;
}

function incrementScore(result) {
    if (result === 'DRAW') return;
    result === 'WIN' ? playerScore.innerText++ : computerScore.innerText++;

    if (gameOver()) {
        gameActive = false;
        openScoresModal();
        addText();
    }
}

function gameOver() {
    return parseInt(playerScore.innerText) === 5 || parseInt(computerScore.innerText) === 5;
}

function addText() {
    let winMessage;
    if (parseInt(playerScore.innerText) === 5) {
        endGameMessage.innerText = 'You won this game!';
        winMessage = true;
    } else {
        endGameMessage.innerText = 'You lost this game';
        winMessage = false;
    }
         
    incrementGameScore(winMessage);
    endGameMessage.style.fontSize = '30px';
}

function incrementGameScore(message) {
    if (message === true) {
        win.innerText++;
        localStorage.setItem('playerWins', win.innerText);
    } else {
        lose.innerText++;
        localStorage.setItem('computerWins', lose.innerText);
    }
}

function resetUI(playerScore, computerScore) {
    playerScore.innerText = 0;
    computerScore.innerText = 0;
    const addedElements = document.querySelectorAll('.result');
    addedElements.forEach(element => {
        element.remove();
    });

    resetOverlayHeight();
}

function resetOverlayHeight() {
    overlay.style.height = '';
}

window.onload = function() {
    const playerWins = localStorage.getItem('playerWins');
    const computerWins = localStorage.getItem('computerWins');

    win.innerText = playerWins || 0;
    lose.innerText = computerWins || 0;
};

window.addEventListener('resize', adjustOverlayHeight);