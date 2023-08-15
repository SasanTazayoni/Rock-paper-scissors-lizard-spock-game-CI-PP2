const inititalModal = document.querySelector('[data-modal]');
const overlay = document.querySelector('[data-overlay]');
const playGameBtn = document.querySelectorAll('[data-play-btn]');
const openRulesModalBtn = document.querySelectorAll('[data-rules-btn]');
const checkScoresBtn = document.querySelector('[data-scores-btn]');
const scoresModal = document.querySelector('[data-scores-modal]');

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