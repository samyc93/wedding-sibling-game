(() => {
  const who = (new URLSearchParams(location.search).get('person') || 'hannah').toLowerCase();
  document.body.classList.add(who === 'joe' ? 'theme-joe' : 'theme-hannah');

  const finales = {
    hannah: {
      icons: ['🎉','✨','❤️','⭐','🎊','🐧','❄️'],
      heroLine: '🎉 🐧 ❤️ 🐧 🎉',
      title: 'Groomswoman unlocked!',
      thankYou: 'Thank you, Hannah.',
      relationship: 'You have