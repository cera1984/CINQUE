(() => {
  'use strict';
  const $=id=>document.getElementById(id), key='cinque-ladder-v1';
  const engine=window.CinqueLadder.create(window.CINQUE_WORDS.allowed);
  const common=window.CinqueLadder.create(window.CINQUE_WORDS.tiers.easy);
  const pairs=[['GATTO','PESCE'],['CARTA','MONTE'],['PORTA','VENTO'],['PASTA','COSTO'],['NOTTE','ROSSO'],['CANTO','MENTE']];
  // Validate against the shipped dictionary, never assume a puzzle remains connected.
  const puzzles=pairs.filter(([a,b])=>common.path(a,b));
  let game;
  try {game=engine.restore(JSON.parse(localStorage.getItem(key)));} catch (_) {}
  function save(){try{localStorage.setItem(key,JSON.stringify(game));}catch(_){}}
  function won(){return game.chain.at(-1)===game.target;}
  function render(message='') {
    $('target').textContent=game.target;
    $('chain').replaceChildren(...game.chain.map((word,row)=>{
      const li=document.createElement('li');li.setAttribute('aria-label',word);
      [...word].forEach((c,i)=>{const cell=document.createElement('span');cell.className='tile'+(row&&c!==game.chain[row-1][i]?' changed':'');cell.textContent=c;cell.setAttribute('aria-hidden','true');li.append(cell);});return li;
    }));
    $('word').disabled=$('submit').disabled=$('hint').disabled=won();
    $('undo').disabled=game.chain.length<2||won();
    $('progress').textContent=`${game.chain.length-1} mosse · ${game.hints} aiuti · minimo iniziale ${engine.path(game.chain[0],game.target).length-1}`;
    $('message').textContent=won()?`Percorso completato! ${game.chain.length-1} mosse e ${game.hints} aiuti. Premi Nuova per rigiocare.`:message||`Parti da ${game.chain.at(-1)}. Cambia una sola lettera.`;
    $('chain').scrollTop=$('chain').scrollHeight;save();
  }
  function fresh(){
    if(!puzzles.length){$('message').textContent='Nessuna sfida disponibile nel dizionario.';return;}
    const choices=puzzles.filter(([a,b])=>!game||a!==game.chain[0]||b!==game.target);
    const [start,target]=(choices.length?choices:puzzles)[Math.floor(Math.random()*(choices.length||puzzles.length))];
    game={target,chain:[start],hints:0};$('word').value='';render();
  }
  $('form').addEventListener('submit',event=>{
    event.preventDefault();if(won())return;
    const word=$('word').value.trim().toUpperCase(),issue=engine.validate(game.chain.at(-1),word);
    if(issue){render(issue);return;}
    game.chain.push(word);$('word').value='';render();if(!won())$('word').focus();
  });
  $('hint').onclick=()=>{
    if(won())return;
    // Prefer common words; fall back to the full lexicon after an advanced move.
    const route=common.path(game.chain.at(-1),game.target)||engine.path(game.chain.at(-1),game.target);
    if(route&&route.length>1){game.hints++;render(`Prova ${route[1]}. Da qui puoi arrivare in ${route.length-1} mosse.`);}
  };
  $('undo').onclick=()=>{if(!won()&&game.chain.length>1){game.chain.pop();$('word').value='';render();$('word').focus();}};
  $('new').onclick=()=>{if(!won()&&game.chain.length>1&&!window.confirm('Lasciare questo percorso e iniziare una nuova sfida?'))return;fresh();};
  try {document.body.dataset.theme=localStorage.getItem('cinque-ladder-theme')==='light'?'light':'dark';}catch(_){}
  $('theme').onclick=()=>{const theme=document.body.dataset.theme==='dark'?'light':'dark';document.body.dataset.theme=theme;try{localStorage.setItem('cinque-ladder-theme',theme);}catch(_){}};
  if(game)render();else fresh();
})();
