(() => {
  const who = (new URLSearchParams(location.search).get('person') || 'hannah').toLowerCase();
  if (who !== 'hannah' && who !== 'joe') return;

  function paintScratchTheme() {
    const canvas = document.querySelector('#canvas');
    if (!canvas || canvas.dataset.themePainted) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    if (!ctx || !rect.width || !rect.height) return;

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);

    if (who === 'joe') {
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
        ctx.fillStyle = Math.random() > 0.5
          ? 'rgba(117,82,36,.22)'
          : 'rgba(255,244,199,.28)';
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(91,65,31,.78)';
      ctx.fillText('Wipe the sand to reveal', rect.width / 2, rect.height / 2);
    } else {
      gradient.addColorStop(0, '#b9ddea');
      gradient.addColorStop(0.48, '#eaf7fb');
      gradient.addColorStop(1, '#cce8f2');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      for (let i = 0; i < 150; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const radius = 0.8 + Math.random() * 2.4;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = Math.random() > 0.45
          ? 'rgba(255,255,255,.62)'
          : 'rgba(89,151,181,.18)';
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(49,95,122,.8)';
      ctx.fillText('Wipe the frost to reveal', rect.width / 2, rect.height / 2);
    }

    ctx.restore();
    canvas.dataset.themePainted = 'true';
  }

  function prepareText() {
    const canvas = document.querySelector('#canvas');
    if (!canvas || canvas.dataset.textPrepared) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.font = '600 20px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    canvas.dataset.textPrepared = 'true';
    paintScratchTheme();
  }

  const observer = new MutationObserver(prepareText);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  prepareText();
})();