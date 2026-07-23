(() => {
  const who = (new URLSearchParams(location.search).get('person') || 'hannah').toLowerCase();
  if (who !== 'joe') return;

  function paintSand() {
    const canvas = document.querySelector('#canvas');
    if (!canvas || canvas.dataset.sandPainted) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    if (!ctx || !rect.width || !rect.height) return;

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#e7c98d');
    gradient.addColorStop(0.5, '#d9b875');
    gradient.addColorStop(1, '#cda864');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    for (let i = 0; i < 240; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const radius = 0.4 + Math.random() * 1.2;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(117,82,36,.22)' : 'rgba(255,244,199,.28)';
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(91,65,31,.78)';
    ctx.font = '600 20px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Wipe the sand to reveal', rect.width / 2, rect.height / 2);
    ctx.restore();

    canvas.dataset.sandPainted = 'true';
  }

  const observer = new MutationObserver(paintSand);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  paintSand();
})();
