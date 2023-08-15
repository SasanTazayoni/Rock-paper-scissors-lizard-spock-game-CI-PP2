const inititalModal = document.querySelector('[data-modal]');
const overlay = document.querySelector('[data-overlay]');
const playGameBtn = document.querySelectorAll('[data-play-btn]');

playGameBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        overlay.classList.toggle('open');
        inititalModal.classList.toggle('open');
    });
});
