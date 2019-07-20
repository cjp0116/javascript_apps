// First select the button and the content
const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

// 
const greetings = [
"I'm good you little piece of shit", 
"Doing good homeboi",
"leave me alone",
"This is what you do, when you could be doing serious work and getting your life together, and create something that's actually useful. But you lose direction of who you are, and what you mean for the world, I hate you."
]

const weather = [
    "Weather is fine",
    "You need a tan",
    "Why do you care? You never leave the house anyways" 
]


// Add the speach recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// We can listen to certain events
recognition.onstart = function() {
    console.log("Voice is activated, you can speak to microphoneeee");
};

recognition.onresult = function(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    readOutLoud(transcript);
};

// add the listener to the button.
btn.addEventListener("click", () => {
    recognition.start();
});

function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = "I don't know what you just said speak more clearly asshole";
    speech.volume = 1;
    if(message.includes("how are you")) {
        const finalText = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
    }
    else if(message.includes("how is the weather like")) {
        const finalText2 = weather[Math.floor(Math.random() * weather.length)];
        speech.text = finalText2;
    }

    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}