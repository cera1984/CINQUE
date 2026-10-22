# CINQUE · Vocabolario italiano a cinque lettere · v3
Aggiornato: 22 ottobre 2026

## Dimensioni e uso effettivo
- **10.693** forme accettate come tentativi, una volta eliminate duplicazioni e token numerici romani.
- **4.001** parole usate come possibili **soluzioni** (immutate dalla versione v2).
- **6.692** parole in fascia `advanced`: accettate come tentativi, mai estratte come soluzioni nella modalità normale.
- Differenza con v2: **527** nuove forme da Morph-it! e integrazioni colloquiali; **159** sequenze di numeri romani rimosse.
- Parole testate: `gatto/gatta/gatti/gatte`, `merda/merde`, `botta/botte`, `cazzo/cazzi`, `troia/troie`, `email`, `jella`, `yuppi`, `vibes`.
- Tutte le forme sono di esattamente 5 lettere `a-z` (accenti traslitterati: `città` diventa `citta`). Le grafie da gioco **non sostituiscono** le forme ortograficamente corrette.

## Fonti linguistiche, provenienza e licenze
1. [Napolux / paroleitaliane](https://github.com/napolux/paroleitaliane) — raccolta MIT, file non coperti da eccezioni di licenza. Parte del lessico già presente in v2. MIT: [credits](../licenses/napolux-MIT.txt).
2. [Par🇮🇹le / wordle-it](https://github.com/pietroppeter/wordle-it) — fonte usata in v2 per confronto e curatela, provenienze riportate nel progetto di origine.
3. **[Morph-it! v0.4.8](https://docs.sslmit.unibo.it/doku.php?id=resources:morph-it)**, Marco Baroni e Eros Zanchetta (Università di Bologna): lessico di forme flesse, con lemmi e tratti morfologici. Elaborazione supplementare basata sulla lista derivata e normalizzata da [FredrikBorgstrom/dict-it-it](https://github.com/FredrikBorgstrom/dict-it-it). Morph-it! è disponibile con doppia licenza **CC BY-SA 2.0 / LGPL**. Per questa versione è usato il ramo CC BY-SA 2.0: la **lista lessicale adattata**, separata dal codice applicativo, viene redistribuita in CC BY-SA 2.0, con attribuzioni in [Morph-it-CREDITS.md](../licenses/Morph-it-CREDITS.md).
4. Piccola curatela aggiuntiva di forme slang/colloquiali, tra cui `vibes` e `gnoma`. Le parolacce italiane comuni erano già ampiamente presenti in v2.
5. [Treccani](https://www.treccani.it/) e Zanichelli sono fonti lessicografiche consultabili per singole verifiche; **non** abbiamo estratto né riprodotto i loro database protetti.

## Criteri di qualità
- Nell'elenco **risposte** non sono state inserite indiscriminatamente le nuove forme: restano le 4.001 risposte della v2.
- Nelle **parole accettate**, invece, sono ammesse anche varianti rare, storiche, apocopate, gergali, parole in prestito e forme con rarità linguistica alta per minimizzare i falsi rifiuti; **non si garantisce** una revisione individuale su Treccani/Zanichelli di ogni voce.
- I numeri romani in grafia canonica lunga cinque caratteri sono eliminati, perché sequenze come `xxiii` non sono parole italiane.
- Esclusi nomi propri importati indiscriminatamente da liste di città e persone.
- Nessuna lista aperta può garantire **tutte** le parole italiane possibili: dialetti, neologismi e flessioni evolvono costantemente.
- Il materiale Morph-it! include forme di frequenza bassa: queste sono riservate al set di **tentativi**, non alle soluzioni normali. Chi segnala falsi positivi può contribuire a una successiva revisione lessicografica.

## Compatibilità tecnica
- Il dizionario è contenuto in [lexicon-v3.js](./lexicon-v3.js) e viene letto da `index.html` prima dell'avvio del motore di gioco.
- Identificatore del dataset: `2026-10-22-v3-morphit`.
- La chiave di `localStorage` resta `cinque-infinite-v1`: statistiche e preferenze conservate. Gli indici delle partite future vengono ricreati in caso di nuovo dataset, mentre le partite compatibili sono preservate.
- Eseguire `node --test tests/lexicon.test.cjs` dalla radice del progetto.

## Stato delle verifiche
- Controlli automatici: formato, deduplicazione, inclusione di plurali/flessioni/slang, preservazione statistiche e rimozione token romani.
- Non è stato effettuato un controllo lessicografico umano individuale di tutte le voci. I potenziali falsi positivi richiedono ancora una revisione editoriale.
