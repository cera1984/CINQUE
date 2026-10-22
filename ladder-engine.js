(function(root) {
  'use strict';
  function create(words) {
    const allowed = new Set(words.map(w => w.toUpperCase()).filter(w => /^[A-Z]{5}$/.test(w)));
    const buckets = new Map();
    for (const word of allowed) for (let i=0;i<5;i++) {
      const key=word.slice(0,i)+'*'+word.slice(i+1);
      if (!buckets.has(key)) buckets.set(key,[]);
      buckets.get(key).push(word);
    }
    function neighbors(word) {
      const found=new Set();
      for(let i=0;i<5;i++) for(const next of buckets.get(word.slice(0,i)+'*'+word.slice(i+1)) || []) if(next!==word) found.add(next);
      return [...found];
    }
    function path(start,end) {
      if(!allowed.has(start)||!allowed.has(end)) return null;
      const parents=new Map([[start,null]]),queue=[start];
      for(let j=0;j<queue.length;j++) {
        const word=queue[j];
        if(word===end) { const route=[]; for(let w=end;w!==null;w=parents.get(w)) route.push(w); return route.reverse(); }
        for(const next of neighbors(word)) if(!parents.has(next)){parents.set(next,word);queue.push(next);}
      }
      return null;
    }
    function validate(previous,word) {
      if(!/^[A-Z]{5}$/.test(word)) return 'Scrivi una parola di cinque lettere.';
      if(!allowed.has(word)) return 'Parola non presente nel dizionario.';
      if([...word].filter((c,i)=>c!==previous[i]).length!==1) return 'Cambia esattamente una lettera, nella stessa posizione.';
      return null;
    }
    function restore(value) {
      if(!value || !Array.isArray(value.chain) || !value.chain.length || value.chain.length>10000 || !allowed.has(value.target) || !allowed.has(value.chain[0]) || value.chain[0]===value.target) return null;
      if(!path(value.chain[0],value.target)) return null;
      for(let i=1;i<value.chain.length;i++) if(value.chain[i-1]===value.target || validate(value.chain[i-1],value.chain[i])) return null;
      return {target:value.target,chain:value.chain.slice(),hints:Number.isSafeInteger(value.hints)&&value.hints>=0?value.hints:0};
    }
    return {neighbors,path,validate,restore};
  }
  const api={create};
  if(typeof module!=='undefined') module.exports=api;
  root.CinqueLadder=api;
})(typeof window!=='undefined'?window:globalThis);
