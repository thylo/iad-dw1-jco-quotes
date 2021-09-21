const buttonElement = document.querySelector("#js-btn");
const container = document.querySelector("#js-container");
const insultContainer = document.querySelector("#js-insult-container");
const synth = window.speechSynthesis;

if (!synth) {
  container.textContent =
    "Your navigator is not compatible with web speechSynthesis. Please try with Firefox or Chrome";
}

let voices = [];

function populateVoiceList() {
  voices = synth.getVoices();
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

async function onButtonClick(event) {
  event.preventDefault();

  const voice = voices.find((voice) => voice.lang === "nl-BE");
  const quoteRaw = await fetch("/api");
  const { value } = await quoteRaw.json();

  const utterThis = new SpeechSynthesisUtterance(value);
  utterThis.voice = voice;
  utterThis.pitch = 0.3;
  utterThis.rate = 1;

  synth.speak(utterThis);

  insultContainer.classList.add('visible');
  insultContainer.textContent = value;
}

buttonElement.addEventListener("click", onButtonClick);
