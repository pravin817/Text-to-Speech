const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speechBtn = document.querySelector("button");

let synth = speechSynthesis,
  isSpeaking = true;

voices();

function voices() {
  for (let voice of synth.getVoices()) {

    // Selecting the Google US English as default voice
    let selected = voice.name === "Google US English" ? "selected" : "";
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {

    // If the available device voice name is equal to the user selected voice name then set the speech voice to the user selected voice
    if (voice.name === voiceList.value) {
      utterance.voice = voice;
    }
  }

  // Speak the speech
  synth.speak(utterance);
}

speechBtn.addEventListener("click", (e) => {

  // Prevent the form submitting.
  e.preventDefault();
  if (textarea.value !== "") {
    if (!synth.speaking) {
      textToSpeech(textarea.value);
    }
    if (textarea.value.length > 80) {
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechBtn.innerText = "Convert To Speech";
        } else {
        }
      }, 500);
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechBtn.innerText = "Pause Speech";
      } else {
        synth.pause();
        isSpeaking = true;
        speechBtn.innerText = "Resume Speech";
      }
    } else {
      speechBtn.innerText = "Convert To Speech";
    }
  }
});
