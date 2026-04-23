// ===== MOBILE MENU TOGGLE =====
const toggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if(toggle) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ===== SCROLL ANIMATIONS =====
const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .zoom-in, .slide-up');
const aboutLogoBg = document.querySelector('.about-logo-bg');
const aboutSection = document.getElementById('about-section');

function isInView(el){
  const rect = el.getBoundingClientRect();
  return rect.top < (window.innerHeight - 100);
}

function runAnimations(){
  animatedElements.forEach(el => {
    if(isInView(el) && !el.classList.contains('visible')) {
      el.classList.add('visible');
    }
  });
  
  // Handle logo dimming and content fade-in based on scroll position
  if(aboutLogoBg && aboutSection) {
    const rect = aboutSection.getBoundingClientRect();
    const sectionHeight = aboutSection.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // Calculate progress: 0 = section top at bottom of viewport, 1 = section top at top of viewport
    const sectionTop = rect.top;
    const triggerPoint = windowHeight * 0.3; // Trigger when section is 30% down the viewport
    
    // Logo appears at full opacity when section enters, dims as you scroll down
    const progress = Math.max(0, Math.min(1, (triggerPoint - sectionTop) / (windowHeight * 0.4)));
    
    if(progress > 0) {
      // Section is in view - show and dim the logo
      aboutLogoBg.style.display = 'flex';
      if(progress > 0.5) {
        // Past halfway - dim the logo and show content
        aboutLogoBg.classList.add('dimmed');
      } else {
        // Still showing logo bright
        aboutLogoBg.classList.remove('dimmed');
      }
    } else {
      // Section not yet in view - hide logo and reset
      aboutLogoBg.style.display = 'none';
      aboutLogoBg.classList.remove('dimmed');
    }
  }
}

window.addEventListener('scroll', runAnimations, { passive: true });
window.addEventListener('load', runAnimations);

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
