(() => {
  const who = (new URLSearchParams(location.search).get('person') || 'hannah').toLowerCase();
  if (who !== 'joe') return;

  function replaceDuplicateShellPair() {
    const grid = document.querySelector('.match-grid');
    if (!grid || grid.dataset.joePairsFixed) return;

    const shellCards = [...grid.querySelectorAll('.memory-card[data-v="🐚"]')];
    if (shellCards.length !== 4) return;

    shellCards.slice(2).forEach(card => {
      card.dataset.v = '🌴';
      const face = card.querySelector('.face');
      if (face) face.textContent = '🌴';
    });

    grid.dataset.joePairsFixed = 'true';
  }

  const observer = new MutationObserver(replaceDuplicateShellPair);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  replaceDuplicateShellPair();
})();
