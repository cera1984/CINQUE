const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {create}=require('../ladder-engine.js');
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(require.resolve('../data/lexicon-v3.js'),'utf8'),sandbox);
const vocab=sandbox.window.CINQUE_WORDS,engine=create(vocab.allowed),common=create(vocab.tiers.easy);
test('reject invalid length, unknown words, no change, multiple changes and rearrangements',()=>{
  for(const word of ['GATT','ZZZZZ','GATTO','PESCE','TAGTO'])assert.ok(engine.validate('GATTO',word),word);
  assert.equal(engine.validate('GATTO','GATTA'),null);
});
test('BFS finds shortest route and handles disconnected or unknown endpoints',()=>{
  const e=create(['carta','corta','porta','porte','monte']);
  assert.deepEqual(e.path('CARTA','PORTE'),['CARTA','CORTA','PORTA','PORTE']);
  assert.equal(e.path('CARTA','MONTE'),null);assert.equal(e.path('CARTA','XXXXX'),null);
  assert.deepEqual(e.path('CARTA','CARTA'),['CARTA']);
});
test('every shipped puzzle has a common-word solution in both directions',()=>{
  for(const [a,b] of [['GATTO','PESCE'],['CARTA','MONTE'],['PORTA','VENTO'],['PASTA','COSTO'],['NOTTE','ROSSO'],['CANTO','MENTE']]){
    const route=common.path(a,b);assert.ok(route&&route.length>2);
    for(let i=1;i<route.length;i++)assert.equal(engine.validate(route[i-1],route[i]),null);
    assert.equal(common.path(b,a).length,route.length);
  }
});
test('hint from a detour remains solvable and decreases shortest distance',()=>{
  for(const next of engine.neighbors('GATTO')){
    const route=engine.path(next,'PESCE');assert.ok(route);assert.equal(engine.validate(next,route[1]),null);
    assert.equal(engine.path(route[1],'PESCE').length,route.length-1);
  }
});
test('restore preserves completion and hints, rejects corrupt or post-win paths',()=>{
  const chain=engine.path('GATTO','PESCE');
  assert.deepEqual(engine.restore({chain,target:'PESCE',hints:2}),{chain,target:'PESCE',hints:2});
  for(const value of [null,{}, {chain:['GATTO','PESCE'],target:'PESCE'}, {chain:[...chain,'PESCO'],target:'PESCE'}, {chain:['GATTO'],target:'XXXXX'}])assert.equal(engine.restore(value),null);
});
