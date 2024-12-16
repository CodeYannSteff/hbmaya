const flame = document.querySelector('.flame');
const flameContainer = document.querySelector('.flame-container');
const message = document.querySelector('.message');
const info = document.querySelector('.info');
let isBlownOut = false;
let blowStart;

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function detectBlow() {
            analyser.getByteFrequencyData(dataArray);
            let sum = dataArray.reduce((a, b) => a + b, 0);
            let average = sum / bufferLength;

            // Wiggle the flame based on microphone input
            if (average > 50) { // Adjust sensitivity for wiggling
                const blowIntensity = Math.min(average / 150, 1); // Normalize to 0-1 range
                const wiggleX = (Math.random() - 0.5) * 40 * blowIntensity; // Adjust for max wiggle amount
                const wiggleY = (Math.random() - 0.5) * 25 * blowIntensity;
                const scale = 1 - blowIntensity * 0.2; // Reduce size slightly when blowing

                flame.style.transform = `translateX(calc(-50% + ${wiggleX}px)) translateY(${wiggleY}px) scale(${scale})`;
                flame.style.filter = `blur(${blowIntensity * 2}px)`; // Add blur effect
            } else {
                flame.style.transform = `translateX(-50%) scale(1)`; // Reset to original position
                flame.style.filter = `blur(0)`;
            }

            // Detect strong, sustained blow for extinguishing
            if (average > 80 && !isBlownOut) {
                if (!blowStart) {
                    blowStart = Date.now();
                } else if (Date.now() - blowStart > 500) {
                    isBlownOut = true;
                    blowOutCandle();
                }
            } else {
                blowStart = null;
            }

            requestAnimationFrame(detectBlow);
        }

        detectBlow();
    })
    .catch(err => {
        console.error('Error accessing microphone:', err);
        info.textContent = "Microphone access denied. Please try again.";
        info.style.color = "red";
    });

function blowOutCandle() {
    flame.style.animation = 'blowOut 1.5s ease-out forwards';
    flameContainer.style.animation = 'fadeOut 1.5s ease-out forwards';
    message.style.animation = 'fadeOut 1.5s ease-out forwards';
    info.style.animation = 'fadeOut 1.5s ease-out forwards';

    setTimeout(() => {
        window.location.href = 'next-page.html';
    }, 2000);
}