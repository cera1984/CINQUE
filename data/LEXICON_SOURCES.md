# CINQUE · Vocabolario italiano a cinque lettere · v2
Aggiornato: 22 ottobre 2026

## Dati effettivamente pubblicati
- **10.325** forme di cinque lettere deduplicate e giocabili come tentativi.
- **4.001** soluzioni per le partite normali: 1.817 in `tiers.easy`, 2.184 in `tiers.medium`.
- **6.324** forme `tiers.advanced`: già accettate come tentativi, tenute da parte per un futuro selettore di difficoltà.
- Esempi: `gatto, gatta, gatti, gatte`, `merda, merde`, `cazzo, cazzi`, `crepa, crepe`.
- Nessun nome proprio (persona/città) importato come categoria indiscriminata. I “nomi” richiesti comprendono i nomi comuni e le loro forme maschili/femminili, singolari/plurali.
- Tutte le voci sono scritte in lettere `a-z`, per compatibilità con la tastiera del gioco. Le vocali accentate delle fonti sono normalizzate: es. `città` → `citta`, `caffè` → `caffe`; sono forme di gioco, non grafie da considerare ortograficamente equivalenti fuori dal gioco.

## Fonti e licenze
1. [napolux/paroleitaliane](https://github.com/napolux/paroleitaliane) (raccolta MIT, Francesco Napoletano), file `60000_parole_italiane.txt`, `280000_parole_italiane.txt`, `660000_parole_italiane.txt`, `lista_badwords.txt`, `1000_parole_italiane_comuni.txt`, più il file con 95k voci, usato SOLO come riscontro e non importato indiscriminatamente (contiene nomi propri). Testo originale della licenza in [`licenses/napolux-MIT.txt`](../licenses/napolux-MIT.txt). **Eccezione**: `coniugazione_verbi.txt` è CC BY-SA 3.0 e NON è stato utilizzato per generare questa versione.
2. [pietroppeter/wordle-it](https://github.com/pietroppeter/wordle-it), file `dict/big5.txt` e `dict/curated.txt`, usati per confrontare/integrare le voci del gioco: nel README sono indicati come fonti napolux/paroleitaliane e sigmasaur/AnagramSolver. Sono accreditati qui separatamente perché la curatela delle liste non equivale automaticamente a una licenza MIT per ogni contributo.
3. [Treccani](https://www.treccani.it/), esclusivamente riferimento di verifica lessicografica manuale. **Non** è stato scaricato, copiato o redistribuito il database Treccani; i relativi termini d'uso non lo permettono senza autorizzazione.
4. Il piccolo vocabolario originale del progetto è stato usato come base, eliminando voci senza riscontro in alcuno dei repertori come `impar` e `rocia`.

## Regole di inclusione
- Cinque lettere alfabetiche esatte dopo normalizzazione degli accenti; niente numeri, trattini, spazi o apostrofi.
- Unione deduplicata di varie fonti. Forme verbali, flessioni, varianti colloquiali e linguaggio volgare sono **ammessi**.
- `easy`: soluzioni curate + soluzioni originali con riscontro; `medium`: parole del repertorio 60k, alcune forme derivate grammaticalmente **solo quando già registrate in una fonte**, e termini colloquiali espliciti.
- `advanced`: tutto il restante dizionario, **non eliminato** e pronto per una modalità più complessa. Alcune forme in questo gruppo potrebbero richiedere verifica manuale.

## Limiti e qualità
Non esiste un elenco finito e universalmente condiviso di **tutte** le forme italiane. Nessuna delle fonti è completa o esente da errori; alcuni lemmi, regionalismi, neologismi, prestiti e flessioni potrebbero ancora mancare e alcune forme rare richiedono verifica. Non affermiamo che ogni voce sia stata controllata singolarmente su Treccani.

## Compatibilità
Il file `index.html` carica il dizionario versionato da `data/lexicon-v2.js`. Il motore, la grafica e la chiave di salvataggio `cinque-infinite-v1` restano invariati. Al primo avvio dopo l'aggiornamento viene ricreato soltanto il mazzo di indici casuali, preservando statistiche e partite compatibili in corso.

## Evoluzioni pianificate
- Difficoltà: utilizzo dei tre livelli `easy/medium/advanced` con soglie basate anche sulla frequenza d'uso reale, dopo revisione linguistica.
- Reverse: ricerca su grafo delle parole e percorsi tra parole note. Criterio di adiacenza da definire (una lettera sostituita, somiglianza tipo Wordle, o altro).
- Flusso di segnalazione parole mancanti/inesatte, con controllo di provenienza e revisioni prima dell'inserimento come soluzione.
