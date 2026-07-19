function mazeGame(){
  const route=new Set([
    '0,0','0,1','1,1','2,1','2,2','2,3','1,3','0,3','0,4','0,5',
    '1,5','2,5','3,5','3,4','3,3','4,3','5,3','5,4','5,5','6,5','6,6'
  ]);
  const walls=new Set(
    Array.from({length:49},(_,i)=>`${Math.floor(i/7)},${i%7}`).filter(cell=>!route.has(cell))
  );
  let r=0,c=0,startX=0,startY=0;

  screen.innerHTML=`
    <div class="kicker">Puzzle 3</div>
    <h2>Guide ${p.hero} to ${p.goal}</h2>
    <p>Use the arrows, or swipe across the maze.</p>
    <div class="real-maze" id="maze">
      <div class="maze-board">
        ${Array.from({length:49},(_,i)=>{
          const rr=Math.floor(i/7),cc=i%7;
          return `<div class="maze-cell ${walls.has(`${rr},${cc}`)?'wall':''}"></div>`;
        }).join('')}
      </div>
      <div class="maze-sprite" id="sprite">${p.hero}</div>
      <div class="maze-goal">${p.goal}</div>
    </div>
    <div class="controls">
      <button class="secondary move" data-dr="-1" data-dc="0">↑</button>
      <button class="secondary move" data-dr="0" data-dc="-1">←</button>
      <button class="secondary move" data-dr="1" data-dc="0">↓</button>
      <button class="secondary move" data-dr="0" data-dc="1">→</button>
    </div>
    <p class="small" id="mazeText">Move one square at a time to reach the fish.</p>`;

  const maze=document.querySelector('#maze');
  const sprite=document.querySelector('#sprite');
  const cellSize=100/7;

  function draw(){
    sprite.style.left=`${c*cellSize}%`;
    sprite.style.top=`${r*cellSize}%`;
  }

  function move(dr,dc){
    const nr=r+dr,nc=c+dc;
    if(nr<0||nr>6||nc<0||nc>6||walls.has(`${nr},${nc}`)){
      buzz(12);
      showToast('🧱 That way is blocked');
      return;
    }
    r=nr;
    c=nc;
    draw();
    buzz(16);
    if(r===6&&c===6){
      document.querySelectorAll('.move').forEach(button=>button.disabled=true);
      setTimeout(()=>win('Looking through the photo album...','Penguin Guide'),400);
    }
  }

  draw();
  document.querySelectorAll('.move').forEach(button=>{
    button.onclick=()=>move(Number(button.dataset.dr),Number(button.dataset.dc));
  });

  maze.addEventListener('pointerdown',event=>{
    startX=event.clientX;
    startY=event.clientY;
    maze.setPointerCapture?.(event.pointerId);
  });

  maze.addEventListener('pointerup',event=>{
    const dx=event.clientX-startX;
    const dy=event.clientY-startY;
    if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;
    if(Math.abs(dx)>Math.abs(dy))move(0,dx>0?1:-1);
    else move(dy>0?1:-1,0);
  });
}

stages[2]=mazeGame;
