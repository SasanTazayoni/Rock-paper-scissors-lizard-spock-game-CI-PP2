const inititalModal = document.querySelector('[data-modal]');
const overlay = document.querySelector('[data-overlay]');
const playGameBtn = document.querySelectorAll('[data-play-btn]');
const openRulesModalBtn = document.querySelectorAll('[data-rules-btn]');
const checkScoresBtn = document.querySelector('[data-scores-btn]');
const scoresModal = document.querySelector('[data-scores-modal]');
const selectionIcons = document.querySelectorAll('[data-selection]');
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
    return rules[Math.floor(Math.random() * rules.length - 1)][0];
}

selectionIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const computerResult = computerPlay();
        const selectedIcon = icon.dataset.selection;
        const playerResult = rules.find(rule => rule.name === selectedIcon);
        const gameResult = playRound(playerResult, computerResult);
        game(gameResult);
    });
});

function playRound(playerChoice, computerChoice) {
    const playerWin = determineWinner(playerChoice, computerChoice);
    const computerWin = determineWinner(computerChoice, playerChoice);
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
    return selection.beats.includes(opponentSelection.name);
}