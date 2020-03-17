// vendor specific code
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var spells = ['expecto patronum', 'wingardium leviosa.', 'lumos', 'avada kedavra', 'obliviate', 'riddikulus', 'alohomora'];
var grammar = '#JSGF V1.0; grammar spells; public <spells> = ' + spells.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var hints = document.querySelector('.hints');

hints.innerHTML = 'Click the button to input spell like: Alohomora';

function listen() {
  recognition.start();
  console.log('Ready to receive a spell command.');
}

recognition.onresult = function(event) {
  var spell = event.results[0][0].transcript;
  activities(spell)
  diagnostic.textContent = 'Result received: ' + spell + '.';
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that spell.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}

function activities(spell) {
  if (spell.toLocaleLowerCase() == 'lumos'){
    document.body.style.backgroundColor = 'red'
  }
}
