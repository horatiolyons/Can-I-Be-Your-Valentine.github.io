function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function moveNonButton() {
    const button = document.getElementById('nonButton');
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const maxButtonX = screenWidth - buttonWidth;
    const maxButtonY = screenHeight - buttonHeight;

    const marginTop = 12 * parseFloat(getComputedStyle(document.documentElement).fontSize);

    const maxScreenX = screenWidth - buttonWidth;
    const maxScreenY = screenHeight - buttonHeight - marginTop;

    let newX = getRandomNumber(0, maxScreenX);
    let newY = getRandomNumber(0, maxScreenY);

    newX = Math.min(Math.max(newX, 0), maxButtonX);
    newY = Math.min(Math.max(newY, marginTop), maxButtonY);

    button.style.position = 'fixed';
    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
}

function initialize() {
  const noBtn = document.getElementById('nonButton');

  // keep your existing mouseenter runaway logic
  noBtn.addEventListener('mouseenter', moveNonButton);

  // mobile: intercept taps/clicks BEFORE they "work"
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    flashNoButton();
    showToast("Nope 🙂 try again");
    moveNonButton();
  }, { passive: false });

  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    flashNoButton();
    showToast("Nope 🙂 try again");
    moveNonButton();
  });

  window.addEventListener('resize', moveNonButton);
}

const img = document.querySelector('img');
initialize();
}

let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');
  toast.classList.remove('hide');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hide');
    toast.classList.remove('show');
  }, 1100);
}

function flashNoButton() {
  const btn = document.getElementById('nonButton');
  btn.classList.add('flash');
  setTimeout(() => btn.classList.remove('flash'), 250);
}

