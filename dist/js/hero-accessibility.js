function enhanceA11y(){
  const voiceBtn = document.getElementById('voice-btn');
  const aiBtn = document.getElementById('ai-btn');
  [voiceBtn, aiBtn].forEach(btn=>{
    if(!btn) return;
    if(!btn.getAttribute('aria-label')){
      btn.setAttribute('aria-label', btn.id === 'voice-btn' ? 'Voice search' : 'AI mode');
    }
    btn.setAttribute('aria-expanded','false');
    btn.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); btn.click(); }
    });
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const modal = document.createElement('div');
      modal.role = 'dialog';
      modal.ariaModal = 'true';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:1000;';
      const panel = document.createElement('div');
      panel.style.cssText = 'background:#0b0f14;color:#e6f7ff;padding:18px 20px;border-radius:10px;min-width:260px;border:1px solid rgba(255,255,255,0.1)';
      panel.textContent = btn.id === 'voice-btn' ? 'Voice UI coming soon.' : 'AI mode coming soon.';
      modal.appendChild(panel);
      document.body.appendChild(modal);
      const close = ()=>{ modal.remove(); btn.setAttribute('aria-expanded','false'); };
      modal.addEventListener('click', (e)=>{ if(e.target === modal) close(); });
      window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); }, { once:true });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enhanceA11y);
} else {
  enhanceA11y();
}