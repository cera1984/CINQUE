const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {create}=require('../ladder-engine.js');
function launch(chain){
  const elements=new Map(),storage=new Map([['cinque-ladder-v1',JSON.stringify({chain,target:'MENTE',hints:0})]]);
  const element=()=>({hidden:false,value:'',dataset:{},setAttribute(){},append(){},replaceChildren(){},addEventListener(name,fn){this[name]=fn;},focus(){this.focused=true;}});
  const document={body:element(),getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);},createElement:element};
  const context={document,localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},window:{CinqueLadder:{create},confirm:()=>true}};
  vm.runInNewContext(fs.readFileSync(require.resolve('../data/lexicon-v3.js'),'utf8'),context);
  vm.runInNewContext(fs.readFileSync(require.resolve('../ladder-ui.js'),'utf8'),context);
  return id=>document.getElementById(id);
}
test('winning move shows explicit victory, hides controls and focuses result',()=>{
  const $=launch(['CANTO','CENTO','LENTO','LENTE']);
  assert.equal($('victory').hidden,true);
  $('word').value='mente';$('form').submit({preventDefault(){}});
  assert.equal($('victory').hidden,false);assert.equal($('form').hidden,true);assert.equal($('ladderActions').hidden,true);
  assert.match($('victorySummary').textContent,/MENTE in 4 mosse/);assert.match($('message').textContent,/Hai vinto/);assert.equal($('victoryTitle').focused,true);
  $('playAgain').onclick();
  assert.equal($('victory').hidden,true);assert.equal($('form').hidden,false);assert.equal($('word').disabled,false);assert.equal($('word').focused,true);
});
test('reopening a completed game keeps the victory visible',()=>{
  const $=launch(['CANTO','MANTO','MENTO','MENTE']);
  assert.equal($('victory').hidden,false);assert.equal($('form').hidden,true);assert.match($('victorySummary').textContent,/3 mosse/);
});
