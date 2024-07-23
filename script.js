document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
document.getElementById('sendMummyMessageBtn').addEventListener('click', sendMummyMessage);

function sendMessage() {
    const userMessage = document.getElementById('userMessage').value.trim().toLowerCase();
    if (userMessage !== "") {
        displayMessage(userMessage, 'meOneSide', 'chatMessages');
        document.getElementById('userMessage').value = "";

        // Define the special responses
        const specialMessages = ['hlo', 'hello', 'amma', 'mummy', 'em chasunav maa', 'Tinava maa'];
        let autoResponse = " ";
        
        if (userMessage === 'em chasunav maa') {
            autoResponse = "Yami Ledu chinnu you";
        } else if (specialMessages.includes(userMessage)) {
            autoResponse = "ha chinnu";
        } else if(userMessage === 'Tinava maa'){
            autoResponse = "Haa Chinnu you"
        }

        setTimeout(() => {
            displayMessage(autoResponse, 'motherOneSide', 'responseMessages');
            speakMessage(autoResponse);
        }, 1000);
    }
}

function sendMummyMessage() {
    const mummyMessage = document.getElementById('mummyMessage').value.trim();
    if (mummyMessage !== "") {
        displayMessage(mummyMessage, 'motherOneSide', 'responseMessages');
        document.getElementById('mummyMessage').value = "";
        speakMessage(mummyMessage);
    }
}

function displayMessage(message, senderClass, containerId) {
    const chatMessages = document.getElementById(containerId);
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', senderClass);
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    
    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function speakMessage(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    const voices = speechSynthesis.getVoices();
    
    // Filter female voices based on common voice names
    const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Woman') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Google UK English Female')
    );

    if (femaleVoice) {
        utterance.voice = femaleVoice;
    }

    speechSynthesis.speak(utterance);
}

// Load voices and set the default voice when they become available
speechSynthesis.onvoiceschanged = () => {
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Woman') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Google UK English Female')
    );

    if (femaleVoice) {
        // Preload the female voice
        const utterance = new SpeechSynthesisUtterance('');
        utterance.voice = femaleVoice;
        speechSynthesis.speak(utterance);
    }
};