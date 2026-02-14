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

/* --- NEW: toast helper --- */
let toastTimer = null;
function showNoToast(message = "Nice try.") {
  const toast = document.getElementById("noToast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 900);
}

function initialize() {
  const noBtn = document.getElementById('nonButton');
  if (!noBtn) return;

  // existing behavior (desktop hover)
  noBtn.addEventListener('mouseenter', moveNonButton);

  // NEW: only when they actually manage to click/tap "No"
  noBtn.addEventListener('click', () => showNoToast("ERROR."));
  noBtn.addEventListener('touchend', () => showNoToast("ERROR."), { passive: true });

  window.addEventListener('resize', moveNonButton);
}

initialize();

