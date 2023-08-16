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
]

// Opening and closing the modals

playGameBtn.forEach(btn => btn.addEventListener('click', closeModal));
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
}

checkScoresBtn.addEventListener('click', () => {
    scoresModal.classList.add('open');
    overlay.classList.add('open');
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
        const gameResult = playRound(playerChoice, computerChoice);
        // game(gameResult);
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
    if (winner) {
        element.classList.add('winner');
    }
    lastColumn.after(element);
}