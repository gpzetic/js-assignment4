// Get references to HTML elements
const student = document.getElementById("student"); // Reference to student element
const playButton = document.getElementById("play"); // Reference to play button
const stability = document.getElementById("stability"); // Reference to stability input
const styles = document.getElementById("style"); // Reference to style input
const words = document.getElementById("words"); // Reference to words input
const audio = new Audio(); // Audio player
var inputText = 'default text'; // Default input text
var voice = '29vD33N1CtxCmqQRPOHJ'; // Default voice ID

// Create loading image element
var img = document.createElement('img');
img.src = 'images/load.svg';
img.style.margin = '-10px -2px';

// Function to play audio from a given URL
function playAudio(url) {
  audio.src = url;
  audio.play();
  console.log("audio is playing");
}

// Link for docs: https://elevenlabs.io/docs/api-reference/text-to-speech
// Get available voices from API and populate options
const voices = document.getElementById("voices"); // Reference to voices dropdown
fetch("https://api.elevenlabs.io/v1/voices")
.then(response => response.json())
.then(json => {
    json.voices.forEach(v => {
        e = document.createElement('option');
        e.value = v.voice_id;
        e.textContent = v.name;
        voices.appendChild(e)
    });
});

// Function to handle play button click event
function playClick() {
    student.textContent = "Grayson Zetic - 1217611"; // Set student info
    voice = voices.selectedOptions[0].value; // Get selected voice ID
    inputText = words.value; // Get input text
    var options = {
        method: 'POST',
        headers: {
            'xi-api-key': 'b479a43ec07e4571de8050a83d37fbef',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: inputText,
            voice_settings: {
            stability: stability.value,
            similarity_boost: 0.5,
            style: styles.value
            }
        })
    };
    
    playButton.innerHTML = ""; // Clear play button content
    playButton.appendChild(img); // Show loading image
    fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/stream`, options)
    .then(response => response.blob())
    .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        playAudio(blobUrl); // Play audio
        playButton.innerHTML = "Play"; // Restore play button text
    })
    .catch(error => {
        console.error('Error fetching audio:', error); // Log error if fetch fails
    });
}

// Event listener for play button click
playButton.addEventListener("click", playClick);
