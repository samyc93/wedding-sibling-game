const qs=new URLSearchParams(location.search);
const who=(qs.get('person')||'hannah').toLowerCase();
const people={
  hannah:{name:'Hannah',hero:'🐧',friend:'🦫',odd:'🦫',decoy:'🐧',goal:'🐟',role:'Groomswoman',photos:[
    {file:'image1-portugal.jpg',prompt:'🌍 Where was this photo taken?',answers:['🇫🇷 South of France','🇹🇷 Turkey','🇵🇹 Portugal'],correct:2,success:'🐧 Nice! Portugal is correct!'},
    {file:'image2-france.jpg',prompt:'🌍 Where was this photo taken?',answers:['🇪🇬 Egypt','🇫🇷 South of France','🇵🇹 Portugal'],correct:1,success:'☀️ Exactly! South of France.'},
    {file:'image3-beach2008.jpg',prompt:'📅 What year was this photo taken?',answers:['2007','2008','2009'],correct:1,success:'❤️ That’s