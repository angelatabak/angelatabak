# Siña Papiamentu

Een snelle, op leerwetenschap gebaseerde Papiamentu-leerapp voor Nederlandstaligen — één HTML-bestand, geen installatie, werkt offline, voortgang wordt in je browser bewaard.

**Open gewoon `index.html` in een browser** (of zet het op GitHub Pages) en begin met leren.

## Waarom je hiermee snel leert

- **578 meest gebruikte woorden & zinnen** in 33 themadecks, verdeeld over 4 niveaus (Fundeshi → Konstruí → Amplia → Konversá), geordend op bruikbaarheid — overlevingszinnen eerst.
- **6 praktijkdialogen** (o.a. iemand ontmoeten, de markt, de taxi, een feestje) met tik-om-te-luisteren regels, plus een bijpassend flashcard-deck.
- **Spaced repetition (SM-2)**: herhalingen komen precies vóórdat je zou vergeten. Onderzoek laat ~85% retentie zien versus ~22% bij stampen.
- **Actief ophalen in gemengde vormen**: flashcards, meerkeuze in beide richtingen, en typen met accent-tolerante typefoutcorrectie.
- **Een spoedcursus grammatica in 5 hoofdstukken** — Papiamentu kent geen vervoegingen en geen geslacht; tijd bestaat uit 4 partikels (`ta`, `a`, `lo`, `tabata`). Je leest de hele grammatica in 10 minuten. Als Nederlander heb je bovendien honderden leenwoorden cadeau (*danki*, *hel*, *kamber*, *skol*…).
- **Streaks en voortgang** zodat je elke dag terugkomt (hét echte geheim van snel leren).
- **Benaderde audio** via de Spaanse stem van je browser (er bestaat nog geen Papiamentu-stem) — aan/uit met de audioknop rechtsboven.

Gebruikt de spelling van Curaçao/Bonaire (*Papiamentu*); het grammaticadeel legt de Arubaanse (*Papiamento*) verschillen uit. Licht & donker thema, geschikt voor je telefoon.

## Echte Papiamentu-stem toevoegen (eenmalig, ±20 min, geen technische kennis nodig)

De app gebruikt standaard een Spaanse reservestem. Zo vervang je die door een **echte Papiamentu AI-stem** (Meta's gratis `mms-tts-pap`-model):

1. **Open het notebook in Google Colab** (gratis, werkt in je browser, alleen een Google-account nodig): ga naar [colab.research.google.com](https://colab.research.google.com) → tabblad **GitHub** → plak de URL van dit repository → klik op `generate_audio.ipynb`.
2. Klik bovenin op **Runtime → Alles uitvoeren** en wacht 10–20 minuten. Je hoeft niets aan te passen. Aan het einde hoor je een voorbeeldzin en downloadt je browser automatisch één bestand: **`audio-pap.js`**.
3. **Upload dat bestand hier op GitHub**: open dit repository → klik op **Add file → Upload files** → sleep `audio-pap.js` erin → klik **Commit changes**. (Het vervangt het lege plaatshouder-bestand.)
4. Klaar! De app gebruikt vanaf nu automatisch de echte stem — je ziet het aan de tooltip van de audioknop: *"echte Papiamentu-stem ✓"*. Werkt het ergens niet, dan valt de app vanzelf terug op de reservestem.

## Papia ku Claude — AI-gesprekspartner

In het **Mas**-tabblad staat "Papia ku Claude": kies een scenario (markt, taxi, feestje…) en oefen een echt gesprek in het Papiamentu, met vertaling en foutcorrectie.

- **Zonder instellen**: de knoppen openen een voorbereid gesprek op claude.ai (gratis account is genoeg).
- **In de app chatten**: maak een API-sleutel op [console.anthropic.com](https://console.anthropic.com/) en plak hem in de app (klapmenu onder de scenario's). De sleutel blijft alleen op jouw apparaat; een antwoord kost ± 1 cent. Werkt in de GitHub Pages-versie en lokaal.

## Aanbevolen routine (±15 min/dag)

1. Lees één grammaticahoofdstuk (alleen de eerste vijf dagen).
2. Werk je herhalingen weg (Repasá-tab).
3. Leer 8 nieuwe kaarten uit het volgende deck van je niveau.
4. Sluit af met een snelle quiz.

In dat tempo heb je alle 578 kaarten in ongeveer twaalf weken gestart — genoeg voor echte gesprekken. Combineer het met de bronnen met echte stemmen in het **Mas**-tabblad (Lora, uTalk, YouTube-lessen) om je oor te trainen. *Bon suerte — bo por!*
