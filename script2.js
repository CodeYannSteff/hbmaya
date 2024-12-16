document.addEventListener('DOMContentLoaded', () => {
    const messageContainer = document.querySelector('.message-container');
    const messageScroll = document.querySelector('.message-scroll');
    const candle = document.querySelector('.candle');
    const finalMessage = document.querySelector('.final-message');
    const lightCandleButton = document.querySelector('.light-candle-button');
    const closingAnimation = document.querySelector('.closing-animation');
    const restartButton = document.querySelector('.restart-button');
    const lineArt = document.querySelector('.line-art');
    const bgMusic = document.getElementById('bg-music');
    const tributeText = document.querySelector('.tribute-text');
    const headerText = document.querySelector('.header-text');

    // --- Helper Function for Random Range ---

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // --- Music ---

    bgMusic.volume = 0.3; // Adjust volume as needed

    // --- Header Text Animation ---

    function animateHeaderText() {
        headerText.style.animation = 'type 4s steps(40, end) forwards, blink-caret .75s step-end infinite';
    }

    animateHeaderText();
    
    // --- Line Art Animation ---
    
    function animateLineArt() {
        lineArt.style.opacity = '1';
        lineArt.style.animation = 'drawLineArt 3s linear forwards';
    }
    
    setTimeout(animateLineArt, 500); // Start after a short delay
    
    // --- Message Reveal ---
    
    function revealMessage() {
        const messageContainer = document.querySelector('.message-container');
        messageContainer.style.opacity = '1';
        messageContainer.style.animation = 'revealMessage 2s ease forwards';
    }
    
    setTimeout(revealMessage, 3500); // Start after line art animation
    
    // --- Tribute Text Animation ---
    
    function animateTributeText() {
        tributeText.classList.add('animate');
    }
    
    setTimeout(animateTributeText, 5500); // Start after message reveal
    
    // --- Candle Functionality ---
    
    candle.addEventListener('click', () => {
        finalMessage.style.opacity = '1';
        candle.style.animation = 'none';
        candle.style.transform = 'scaleY(0.1)';
        candle.style.transition = 'transform 1s ease';
        candle.style.opacity = '0';
    });
    
    lightCandleButton.addEventListener('click', () => {
        finalMessage.style.opacity = '0';
        candle.style.transform = 'scaleY(1)';
        candle.style.transition = 'transform 1s ease';
        candle.style.opacity = '1';
        candle.style.animation = 'flicker 0.5s ease-in-out infinite alternate';
    });

    // --- Closing Animation ---

    function triggerClosingAnimation() {
        closingAnimation.style.opacity = '1';
        closingAnimation.style.pointerEvents = 'auto';

        // Make the line art glow brighter and then fade out
        lineArt.style.filter = 'drop-shadow(0 0 20px #007bff)';
        lineArt.style.transition = 'filter 2s ease, opacity 3s ease';

        setTimeout(() => {
            lineArt.style.opacity = '0';
        }, 2000);

        // Trigger farewell message
        farewellMessage.style.opacity = '1';
    }

    restartButton.addEventListener('click', () => {
        closingAnimation.style.opacity = '0';
        closingAnimation.style.pointerEvents = 'none';

        // Reset elements to their initial state
        lineArt.style.filter = 'drop-shadow(0 0 10px #007bff)';
        lineArt.style.opacity = '1';
        farewellMessage.style.opacity = '0';

        // Restart animations as needed
        animateLineArt();
    });

    // --- Background Animations ---

    // Shooting Stars
    const shootingStarsContainer = document.querySelector('.shooting-stars');

    function createShootingStar() {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        star.style.top = `${randomInRange(0, 100)}%`;
        star.style.left = `${randomInRange(0, 100)}%`;
        star.style.animationDuration = `${randomInRange(3, 6)}s`;
        shootingStarsContainer.appendChild(star);

        star.addEventListener('animationend', () => {
            star.remove();
        });
    }

    for (let i = 0; i < 3; i++) {
        createShootingStar();
    }

    setInterval(createShootingStar, 4000);

    // Twinkling Stars
    const starsContainer = document.querySelector('.background');

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${randomInRange(0, 100)}%`;
        star.style.left = `${randomInRange(0, 100)}%`;
        star.style.width = `${randomInRange(1, 3)}px`;
        star.style.height = star.style.width;
        star.style.animationDuration = `${randomInRange(1, 3)}s`;
        starsContainer.appendChild(star);
    }

    for (let i = 0; i < 100; i++) {
        createStar();
    }

    // --- Trigger Closing Animation ---

    // For demonstration purposes, let's trigger the closing animation after a certain time
    setTimeout(() => {
        //triggerClosingAnimation();
    }, 60000); // Adjust the time (in milliseconds) as needed
});