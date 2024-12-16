document.addEventListener('DOMContentLoaded', () => {
    const messageContainer = document.querySelector('.message-container');
    const messageScroll = document.querySelector('.message-scroll');
    const messageText = document.querySelector('.message-text');
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
      lineArt.style.animation = 'revealLineArt 3s linear forwards';
    }
  
    setTimeout(animateLineArt, 500); // Start after a short delay
  
    // --- Message Reveal ---
  
    function revealMessage() {
      messageContainer.style.opacity = '1';
    
      // Split the message into words
      const words = messageText.textContent.split(' ');
      messageText.innerHTML = ''; // Clear the original text
    
      // Add each word with a delay
      words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word + ' '; // Add a space after each word
        wordSpan.style.opacity = '0';
        wordSpan.style.animation = `revealMessageText 0.1s ease forwards ${index * 0.15}s`;
        messageText.appendChild(wordSpan);
      });
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
      candle.style.animation = 'none'; // Stop the flickering
      candle.style.transform = 'scaleY(0.1)'; // Make the candle melt
      candle.style.transition = 'transform 1s ease'; // Add a transition for the melting effect
      candle.style.opacity = '0';
    });
  
    lightCandleButton.addEventListener('click', () => {
      finalMessage.style.opacity = '0';
      candle.style.transform = 'scaleY(1)'; // Reset the candle size
      candle.style.transition = 'transform 1s ease'; // Add a transition for the resetting effect
      candle.style.opacity = '1';
      candle.style.animation = 'flicker 0.5s ease-in-out infinite alternate'; // Restart the flickering
    });
  
    // --- Closing Animation ---
  
    function triggerClosingAnimation() {
      closingAnimation.style.opacity = '1';
      closingAnimation.style.pointerEvents = 'auto';
  
      // Make the line art glow brighter and then fade out
      lineArt.style.filter = 'drop-shadow(0 0 20px #007bff) brightness(1.5)';
      lineArt.style.transition = 'filter 2s ease, opacity 3s ease';
  
      setTimeout(() => {
        lineArt.style.opacity = '0';
      }, 2000);
  
      // Trigger farewell message
      farewellMessage.style.opacity = '1';
  
      // Disable candle interaction
      candle.style.pointerEvents = 'none';
      lightCandleButton.style.pointerEvents = 'none';
    }
  
    restartButton.addEventListener('click', () => {
      closingAnimation.style.opacity = '0';
      closingAnimation.style.pointerEvents = 'none';
  
      // Reset elements to their initial state
      lineArt.style.filter = 'drop-shadow(0 0 10px #007bff) brightness(1.2)';
      lineArt.style.opacity = '0';
      lineArt.style.animation = 'none'; // Reset animation
      farewellMessage.style.opacity = '0';
  
      // Re-enable candle interaction
      candle.style.pointerEvents = 'auto';
      lightCandleButton.style.pointerEvents = 'auto';
  
      // Restart animations
      animateLineArt();
      setTimeout(revealMessage, 3500); // Start after line art animation
      setTimeout(animateTributeText, 5500); // Start after message reveal
  
      // Reset candle
      finalMessage.style.opacity = '0';
      candle.style.transform = 'scaleY(1)';
      candle.style.transition = 'none';
      candle.style.opacity = '1';
      candle.style.animation = 'flicker 0.5s ease-in-out infinite alternate';
  
      // You might need to reset other animations here
    });
  
    // --- Background Animations ---
  
    // Math Symbols
    const mathSymbolsContainer = document.querySelector('.math-symbols');
    const mathSymbols = ['∫', '∑', 'π', '∞', '√', '≠', '≈', '⊂', '∈', '∀', '∃', '∇', '∂'];
  
    function createMathSymbol() {
      const symbol = document.createElement('div');
      symbol.classList.add('math-symbol');
      symbol.textContent = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
      symbol.style.left = `${randomInRange(0, 100)}%`;
      symbol.style.top = `${randomInRange(0, 100)}%`;
      symbol.style.fontSize = `${randomInRange(1, 3)}em`;
      symbol.style.animationDuration = `${randomInRange(20, 40)}s`;
  
      mathSymbolsContainer.appendChild(symbol);
  
      symbol.addEventListener('animationend', () => {
        symbol.remove();
      });
    }
  
    for (let i = 0; i < 20; i++) {
      createMathSymbol();
    }
  
    setInterval(createMathSymbol, 3000);
  
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
  
    // --- Gears Animation ---
  
    const gear1 = document.getElementById('gear1');
    const gear2 = document.getElementById('gear2');
  
    function animateGears() {
      let rotation = 0;
      setInterval(() => {
        rotation += 0.5; // Adjust for faster rotation
        gear1.style.transform = `rotate(${rotation}deg)`;
        gear2.style.transform = `rotate(${-rotation}deg)`;
      }, 16); // ~60 frames per second
    }
  
    animateGears();
  
    // --- Trigger Closing Animation ---
  
    // For demonstration purposes, let's trigger the closing animation after a certain time
    setTimeout(() => {
      //triggerClosingAnimation();
    }, 60000); // Adjust the time (in milliseconds) as needed
  });