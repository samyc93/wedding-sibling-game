function fishGame(){
  const target=12;
  let x=50,score=0,running=false,started=false,items=[],dragging=false,holdTimer=null;
  screen.innerHTML=`
    <div class="kicker">Puzzle 4</div>
    <h2>Fish collector</h2>
    <p>Press Play, then hold and drag the penguin left and right. Catch ${target} fish. Every crab takes one fish away!</p>
    <div class="fish-game fish-game-v2" id="fishGame">
      <div class="fish-score" id="fishScore">🐟 0 / ${target}</div>
      <div class="fish-hint" id="fishHint">Hold and drag ${p.hero}</div>
      <div class="fish-start" id="fishStart">
        <button class="primary" id="playFish">▶ Play</button>
        <span>