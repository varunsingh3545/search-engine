// CONFIG
const slides = [
  'mount-everest-2560x1440-11019.jpg',
  'marine.jpg',
  'climate.jpg'
];
const slideInterval = 7000;
const kenScale = 1.06;

// Respect reduced motion
const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// PRELOAD
const preload = (urls) => urls.forEach(url => { const img = new Image(); img.decoding = 'async'; img.loading = 'eager'; img.src = url; });
preload(slides);

// DOM READY (defer script guarantees DOM is parsed)
(function initHero(){
  const heroSection = document.querySelector('#hero') || document.querySelector('.hero-section') || document.body;
  const heroContainer = document.querySelector('.hero-container') || heroSection;
  if(!heroSection || !heroContainer) return;

  // Ensure .hero-bg exists without reordering other nodes
  let heroBg = heroContainer.querySelector('.hero-bg');
  if(!heroBg){
    heroBg = document.createElement('div');
    heroBg.className = 'hero-bg';
    heroContainer.appendChild(heroBg);
  }

  // Create slides
  slides.forEach((src, idx)=>{
    const s = document.createElement('div');
    s.className = 'bg-slide';
    s.style.backgroundImage = `url('${src}')`;
    s.dataset.index = String(idx);
    if(idx===0) s.classList.add('is-active');
    heroBg.appendChild(s);
  });

  // Slider rotation with Ken Burns-like subtle scale
  let current = 0;
  const slideEls = Array.from(heroBg.querySelectorAll('.bg-slide'));
  if(slideEls.length && !prefersReduced){
    setInterval(()=>{
      const prev = current;
      current = (current+1) % slideEls.length;
      slideEls[prev].classList.remove('is-active');
      slideEls[current].classList.add('is-active');
      slideEls[current].style.transform = 'scale(1)';
      slideEls[prev].style.transform = `scale(${kenScale})`;
    }, slideInterval);
  }

  // Focus behavior -> .search-mode on body
    const inputs = [document.getElementById('search-input'), document.getElementById('search-input-hero')].filter(Boolean);
  const primaryInput = inputs[0] || null;
  if(inputs.length){
    const onFocus = ()=> document.body.classList.add('search-mode');
    const onBlur = ()=> document.body.classList.remove('search-mode');
    inputs.forEach(input=>{
      input.addEventListener('focus', onFocus);
      input.addEventListener('blur', onBlur);
      if(!input.getAttribute('aria-label')){
        input.setAttribute('aria-label','Search');
      }
    });
  }
  
  // Trending pills -> fill and submit if present
  const pills = document.querySelectorAll('.trending-row .pill');
  const form = document.getElementById('hero-search') || primaryInput?.form || null;
  if(pills && primaryInput){
    pills.forEach(p=>{
      p.addEventListener('click', ()=>{
        const text = p.textContent?.replace(/^\s*[^\w]*\s*/,'').trim() || '';
        primaryInput.value = text;
        if(form){
          const submitted = form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
          if(!submitted && typeof form.submit === 'function') form.submit();
        }
      });
    });
  }

  // Reduced motion: hide snow canvas if present (paint/perf)
  if(prefersReduced){
    const snow = document.getElementById('snow-canvas');
    if(snow) snow.style.display = 'none';
  }
})();