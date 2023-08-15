const inititalModal = document.querySelector('[data-modal]');
const overlay = document.querySelector('[data-overlay]');
const playGameBtn = document.querySelectorAll('[data-play-btn]');
const openRulesModalBtn = document.querySelectorAll('[data-rules-btn]');

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
    overlay.classList.remove('open');
}
