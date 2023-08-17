const inititalModal = document.querySelector('[data-modal]');
const overlay = document.querySelector('[data-overlay]');
const playGameBtn = document.querySelectorAll('[data-play-btn]');
const openRulesModalBtn = document.querySelectorAll('[data-rules-btn]');
const checkScoresBtn = document.querySelector('[data-scores-btn]');
const scoresModal = document.querySelector('[data-scores-modal]');
const selectionIcons = document.querySelectorAll('[data-selection]');
const lastColumn = document.querySelector('[data-last-column]');
let playerScore = document.querySelector('[data-player-score]');
let computerScore = document.querySelector('[data-computer-score]');
let win = document.querySelector('[data-player-wins]');
let lose = document.querySelector('[data-computer-wins]');
let gameActive = true;
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
    parseInt(playerScore.innerText) === 5 ? endGameMessage.innerText = 'You won this game!' : endGameMessage.innerText = 'You lost this game';
    endGameMessage.style.fontSize = '60px';
}

function resetUI(playerScore, computerScore) {
    playerScore.innerText = 0;
    computerScore.innerText = 0;
    const addedElements = document.querySelectorAll('.result');
    addedElements.forEach(element => {
        element.remove();
    });
}

