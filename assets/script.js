// Theme toggle with persistence
(function(){
  const key = 'pg-theme';
  const saved = localStorage.getItem(key);
  if(saved){
    document.documentElement.setAttribute('data-theme', saved);
  }
  const btn = document.getElementById('themeToggle');
  const apply = (mode)=>{
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem(key, mode);
    btn.textContent = mode === 'light' ? '🌞' : '🌙';
  }
  btn?.addEventListener('click', ()=>{
    const current = document.documentElement.getAttribute('data-theme');
    apply(current === 'light' ? 'dark' : 'light');
  });
  // set initial icon
  const initial = document.documentElement.getAttribute('data-theme') || 'dark';
  apply(initial);
})();

// Intersection Observer: reveal on scroll
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    els.forEach(e=>e.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    })
  }, {threshold: .15});
  els.forEach(e=>io.observe(e));
})();

// Set year in footer
(function(){
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();
