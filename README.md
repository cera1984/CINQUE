# CINQUE

Wordle italiano infinito e minigioco **CINQUE?**, accessibile dal menu o da `inversa.html`.

## CINQUE?

Trasforma la parola iniziale nella finale cambiando esattamente una lettera nella stessa posizione. Ogni parola deve appartenere al dizionario italiano di cinque lettere già distribuito con CINQUE (`data/lexicon-v3.js`, con fonti e licenze in `data/LEXICON_SOURCES.md`). Non si possono aggiungere, togliere o riordinare lettere. Non c'è limite di mosse.

Il riferimento più probabile del format descritto è Weaver: https://weavergame.org/how-to-play e https://weavergame.org/5-letter. Senza il video TikTok specifico questa identificazione rimane un'interpretazione.

Sei coppie iniziali sono verificate sul livello facile; tutte hanno un percorso di parole comuni. La ricerca in ampiezza trova percorsi minimi. I suggerimenti preferiscono parole comuni, con ripiego sul dizionario completo dopo deviazioni avanzate. Il minimo iniziale mostrato usa il dizionario completo e può essere più breve del percorso suggerito. Gli aiuti sono dichiarati nel risultato. Indietro annulla l'ultima mossa; dopo la vittoria il percorso è bloccato. Nuova richiede conferma per abbandonare un percorso iniziato.

Salvataggio separato `cinque-ladder-v1`, con validazione integrale del percorso al ripristino; nessuna modifica alle statistiche della modalità classica. Il tema del minigioco è conservato separatamente. Le sei sfide si ripetono, evitando la ripetizione immediata.

## Verifica

Serve Node.js 24: `node --test tests/*.test.cjs`. Nessun processo di compilazione o dipendenza aggiuntiva. Aprire il progetto tramite un normale server statico per giocare.
