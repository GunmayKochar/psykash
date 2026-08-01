/**
 * PSYKASH — Resources Page Scripts
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Accordion Logic (Quick Self Help Toolkit)
  const accordions = document.querySelectorAll('.accordion');
  
  accordions.forEach(acc => {
    const header = acc.querySelector('.accordion__header');
    const content = acc.querySelector('.accordion__content');
    
    header.addEventListener('click', () => {
      // Toggle class
      const isOpen = acc.classList.contains('is-open');
      
      // Close all others (optional, but nice UX)
      accordions.forEach(otherAcc => {
        otherAcc.classList.remove('is-open');
        const otherContent = otherAcc.querySelector('.accordion__content');
        if (otherContent) otherContent.style.maxHeight = null;
      });

      // Open clicked one if it was closed
      if (!isOpen) {
        acc.classList.add('is-open');
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });


  // 2. Flip Cards (Myth vs Fact)
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });


  // 3. Daily Wellness Tip Generator
  const tips = [
    "Drink water before checking your phone.",
    "Go outside for ten minutes and feel the air.",
    "Take three slow, deep breaths.",
    "Stretch your neck and shoulders for five minutes.",
    "Write down one thing you're grateful for today.",
    "Unclench your jaw and drop your shoulders.",
    "Take a 5-minute break away from all screens."
  ];

  const tipElement = document.getElementById('dailyTipText');
  if (tipElement) {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    tipElement.textContent = randomTip;
  }


  // 4. Mood Tracker Form Submission
  const trackerForm = document.getElementById('moodTrackerForm');
  const successMsg = document.getElementById('trackerSuccess');

  if (trackerForm) {
    trackerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate save
      trackerForm.reset();
      successMsg.style.display = 'block';
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 3000);
    });
  }


  // 5. Interactive Self Checks Modal / Alert
  const checkBtns = document.querySelectorAll('.start-reflection-btn');
  checkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // For now, just a gentle alert placeholder
      alert("This reflection tool is coming soon. Remember, these are for personal insight, not medical diagnosis.");
    });
  });

});
