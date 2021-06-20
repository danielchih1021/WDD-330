document.addEventListener("keydown", playAudio);
document.addEventListener("transitionend", removeTransition);

function playAudio(e) {
  const drum = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const keyPressed = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!drum) return;

  keyPressed.classList.add("playing");
  drum.currentTime = 0;
  drum.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}
