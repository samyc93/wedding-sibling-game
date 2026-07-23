(() => {
  const who = (new URLSearchParams(location.search).get('person') || 'hannah').toLowerCase();
  document.body.classList.add(who === 'joe' ? 'theme-joe' : 'theme-hannah');

  const finales = {
    hannah: {
      icons: ['🎉','✨','❤️','⭐','🎊','🐧','❄️'],
      heroLine: '🎉 🐧 ❤️ 🐧 🎉',
      title: 'Groomswoman unlocked!',
      thankYou: 'Thank you, Hannah.',
      relationship: 'You have always been an amazing sister.',
      memoryOne: 'From family holidays and old photos...',
      memoryTwo: 'to all the memories still to come...',
      weddingLine: 'I honestly could not imagine our wedding day without you.',
      achievements: ['Animal Spotter','Memory Master','Penguin Guide','Fish Collector'],
      unlocked: 'Groomswoman Unlocked'
    },
    joe: {
      icons: ['🎉','✨','❤️','⭐','🎊','🐢','🌴','🐚'],
      heroLine: '🎉 🐢 ❤️ 🐢 🎉',
      title: 'Best Man unlocked!',
      thankYou: 'Thank you, Joe.',
      relationship: 'You have always been an amazing brother.',
      memoryOne: 'From family holidays and old photos...',
      memoryTwo: 'to all the memories still to come...',
      weddingLine: 'I honestly could not imagine our wedding day without you.',
      achievements: ['Beach Spotter','Memory Master','Turtle Navigator','Beachcomber'],
      unlocked: 'Best Man Unlocked'
    }
  };
  const finale = finales[who] || finales.hannah;

  const photoFiles = [
    'image1-portugal.jpg',
    'image2-france.jpg',
    'image3-beach2008.jpg'
  ];

  const cache = new Map();
  photoFiles.forEach(src => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
    cache.set(src, img);
  });

  function preparePhoto(frame) {
    if (!frame || frame.dataset.polished) return;
    frame.dataset.polished = 'true';

    const img = frame.querySelector('img');
    if (!img) return;

    frame.classList.add('memory-loading');
    const loader = document.createElement('div');
    loader.className = 'memory-loader';
    loader.innerHTML = '<div class="memory-loader-icon">📷</div><strong>Loading memory...</strong>';
    frame.appendChild(loader);

    img.classList.add('memory-photo');

    const reveal = () => {
      frame.classList.remove('memory-loading');
      frame.classList.add('memory-ready');
      requestAnimationFrame(() => img.classList.add('loaded'));
      setTimeout(() => loader.remove(), 550);
    };

    if (img.complete && img.naturalWidth) reveal();
    else {
      img.addEventListener('load', reveal, { once: true });
      img.addEventListener('error', () => {
        loader.innerHTML = '<div class="memory-loader-icon">📷</div><strong>Tap to retry</strong>';
        loader.onclick = () => {
          loader.innerHTML = '<div class="memory-loader-icon">📷</div><strong>Loading memory...</strong>';
          img.src = `${img.getAttribute('src').split('?')[0]}?retry=${Date.now()}`;
        };
      }, { once: true });
    }
  }

  function burstConfetti() {
    const layer = document.createElement('div');
    layer.className = 'party-layer';
    document.body.appendChild(layer);

    for (let i = 0; i < 52; i++) {
      const piece = document.createElement('span');
      piece.className = 'party-piece';
      piece.textContent = finale.icons[Math.floor(Math.random() * finale.icons.length)];
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.setProperty('--drift', `${(Math.random() - .5) * 180}px`);
      piece.style.setProperty('--spin', `${Math.random() * 720 - 360}deg`);
      piece.style.animationDelay = `${Math.random() * .45}s`;
      piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;
      layer.appendChild(piece);
    }

    setTimeout(() => layer.remove(), 5200);
  }

  function showFinale() {
    const thanks = document.querySelector('#thanks');
    if (!thanks || thanks.dataset.finalised) return;
    thanks.dataset.finalised = 'true';

    if (navigator.vibrate) navigator.vibrate([80, 55, 110, 55, 180]);
    burstConfetti();

    thanks.innerHTML = `
      <div class="finale">
        <div class="finale-badge">ADVENTURE COMPLETE</div>
        <div class="finale-icons">${finale.heroLine}</div>
        <h2>${finale.title}</h2>
        <div class="finale-copy">
          <p style="--delay:.2s">${finale.thankYou}</p>
          <p style="--delay:.65s">${finale.relationship}</p>
          <p style="--delay:1.1s">${finale.memoryOne}</p>
          <p style="--delay:1.55s">${finale.memoryTwo}</p>
          <p style="--delay:2s">${finale.weddingLine}</p>
        </div>
        <div class="next-memory" style="--delay:2.45s">
          <span>Our next memory...</span>
          <strong>25 July 2027</strong>
          <span>❤️ Our Wedding ❤️</span>
        </div>
        <div class="achievement-card" style="--delay:2.9s">
          <h3>Mission results</h3>
          ${finale.achievements.map(item => `<div>✅ ${item}</div>`).join('')}
          <div class="gold-achievement">🏆 ${finale.unlocked}</div>
        </div>
        <p class="signed" style="--delay:3.35s">Love, Sam ❤️</p>
        <button class="secondary play-again" style="--delay:3.7s">↻ Play again</button>
      </div>`;

    thanks.querySelector('.play-again').onclick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => location.reload(), 250);
    };
  }

  const observer = new MutationObserver(() => {
    document.querySelectorAll('.photo-frame').forEach(preparePhoto);

    const yes = document.querySelector('#yes');
    if (yes && !yes.dataset.polishBound) {
      yes.dataset.polishBound = 'true';
      yes.addEventListener('click', () => setTimeout(showFinale, 40));
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.querySelectorAll('.photo-frame').forEach(preparePhoto);
})();
