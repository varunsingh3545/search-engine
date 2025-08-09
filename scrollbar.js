document.addEventListener('DOMContentLoaded', () => {
  const progress = document.querySelector('.nex-scroll-progress');
  const thumb = document.querySelector('.nex-scroll-thumb');
  if (!progress) return;

  const updateProgress = () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const docHeight = (doc.scrollHeight || 1) - window.innerHeight;
    const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
    const pct = ratio * 100;
    progress.style.height = `${pct}%`;
    if (thumb) thumb.style.bottom = `calc(${pct}% - 5px)`;
  };

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
});