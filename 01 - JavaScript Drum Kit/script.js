const volumeSlidr = document.querySelector("#volume");
const volumeValue = document.getElementById("volume-value");
let currentVolume = parseFloat(volumeSlidr.value);
//Update currentVolume when slider is moved
volumeSlidr.addEventListener("input", () => {
  currentVolume = parseFloat(volumeSlidr.value);
  console.log(volumeValue.textContent);
  volumeValue.textContent = Math.round(currentVolume * 100) + "%";
});
function playSound(e) {
  const keyCode = e.keyCode || e.which || e.key;
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return; // stop the function from running all together
  audio.currentTime = 0; //rewind to start
  audio.volume = currentVolume;
  audio.play();

  key.classList.add("playing");
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return; // skip it if it's not a transform
  this.classList.remove("playing");
}
const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

function handlekeyClick(e) {
  const keyElement = e.currentTarget;
  const keycode = parseInt(keyElement.getAttribute("data-key"));
  const event = new KeyboardEvent("keydown", {
    keyCode: keycode,
  });
  playSound(event);
}

keys.forEach((key) => key.addEventListener("click", handlekeyClick));

// keys.forEach((key) => key.addEventListener("click", (e) => {
//     const keyCode = key.getAttribute("data-key");
//     const event = new KeyboardEvent("keydown", { keyCode: parseInt(keyCode) });
//     playSound(event);
//   }));

window.addEventListener("keydown", playSound);
