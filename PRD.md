# PRD — Siña Papiamentu

| | |
|---|---|
| **Product** | Siña Papiamentu — Papiamentu-leerapp voor Nederlandstaligen |
| **Versie** | 1.0 (in ontwikkeling op branch `claude/papiamentu-learning-app-k6uch6`) |
| **Eigenaar** | Angela Tabak |
| **Status** | Feature-compleet voor v1.0, klaar voor productie |
| **Laatst bijgewerkt** | 7 juli 2026 |

---

## 1. Visie & probleemstelling

**Probleem.** Papiamentu wordt door ~330.000 mensen gesproken (Curaçao, Bonaire, Aruba en de grote Antilliaanse gemeenschap in Nederland), maar wordt door geen enkele grote leerapp ondersteund (geen Duolingo, geen Babbel). Het bestaande aanbod is versnipperd: losse woordenlijstjes, YouTube-video's en fysieke cursussen — niets dat wetenschappelijk onderbouwd, dagelijks en gratis is.

**Visie.** De snelste weg naar conversationeel Papiamentu voor een Nederlandstalige: één app die woordenschat (spaced repetition), grammatica (spoedcursus), spreken (hardop-oefeningen, rollenspel) en echte conversatie (AI-gesprekspartner) combineert — offline, gratis en zonder account.

**Waarom dit kan werken.** Papiamentu heeft geen vervoegingen, geen grammaticaal geslacht en een tijdensysteem van vier partikels; de leercurve is vrijwel volledig woordenschat. Bovendien heeft een Nederlandstalige honderden leenwoorden cadeau. Een frequentie-eerst SRS-aanpak is hier dus ongewoon effectief.

## 2. Doelgroep

- **Primair:** Nederlandstaligen met een band met de ABC-eilanden (reizen, familie, partner, verhuizing) die snel spreekvaardig willen worden. Persona: Angela — wil binnen ± 3 maanden eenvoudige gesprekken kunnen voeren.
- **Secundair:** de Antilliaanse diaspora in Nederland (tweede/derde generatie) die de taal wil (her)leren.

## 3. Doelen & succesmetrieken

| Doel | Metriek | Streefwaarde |
|---|---|---|
| Snel naar conversatieniveau | Alle 578 kaarten gestart | ≤ 12 weken bij 15 min/dag |
| Dagelijkse gewoonte | Streak | ≥ 5 dagen/week |
| Retentie van geleerde stof | Kaarten op "Sterk" (interval ≥ 7 d) | ≥ 70% van gestarte kaarten na 8 weken |
| Spreekvaardigheid | Rollenspel/AI-gesprek voltooid | ≥ 3 per week |

*(Metrieken zijn lokaal zichtbaar op het Home-scherm; er is bewust geen tracking/analytics — zie non-goals.)*

## 4. Wat er in v1.0 zit (gerealiseerd)

### 4.1 Cursusinhoud
- **578 woorden & zinnen** in **33 themadecks**, geordend op gebruiksfrequentie, verdeeld over **4 zichtbare niveaus**: Nivel 1 *Fundeshi* (basis) → 2 *Konstruí* (werkwoorden & zinnen) → 3 *Amplia* (de wereld om je heen) → 4 *Konversá* (meepraten & vertellen), met voortgangsbalken, percentages en een "bo ta aki"-marker.
- **6 praktijkdialogen** (ontmoeting, snackbar, markt, weg vragen, taxi, feestje) met tik-om-te-luisteren regels.
- **Grammatica-spoedcursus** in 5 hoofdstukken, inclusief Nederlandse-leenwoorden-voorsprong en uitleg van de twee spellingen (Curaçao/Bonaire vs. Aruba).
- Spelling: Curaçao/Bonaire (fonetisch); alle vertalingen en UI in het Nederlands.

### 4.2 Leermechanieken
- **Spaced repetition (SM-2-variant)**: intervallen groeien met een ease-factor; "Opnieuw" reset naar 1 minuut; herhaal-badge op de Repasá-tab.
- **Kaartniveaus 1–4** met meegroeiende oefenvorm: herkennen (meerkeuze P→NL) → kiezen (NL→P) → typen & hardop zeggen → alleen Papiamentu (geen vertaling zichtbaar). Niveau zichtbaar als tag in oefeningen en als bolletjes (●●○○) in decklijsten.
- **Oefenvormen:** introductiekaart, meerkeuze (beide richtingen), typen met accent-tolerante typefoutcorrectie (Levenshtein ≤ 1), flashcard met zelfbeoordeling, spreekoefening (zeg hardop → toon antwoord → beoordeel jezelf, optioneel microfooncheck via Web Speech API).
- **Rollenspel:** speel rol A of B in elke dialoog; de app spreekt de tegenpartij, jij produceert jouw regels vanuit een Nederlandse cue.
- **Papia ku Claude:** AI-gesprekspartner met 5 scenario's. Zonder configuratie via voorbereide claude.ai-links; met eigen API-sleutel als chat in de app (Claude Opus 4.8, sleutel alleen in localStorage, ± 1 cent per antwoord).
- **Streaks, dagstatistieken en quiz** (10 gemengde vragen uit gestarte kaarten).
- **Automatische synchronisatie (opt-in):** voortgang synchroniseert tussen apparaten via een eigen gratis Supabase-database (installatie in ± 10 min via `SETUP-SYNC.md`). Push binnen ± 2 s na elke wijziging; pull bij openen, bij terugkeren naar de app en elke minuut; koppelen van extra apparaten via één synccode (`SYNC1.…`); conflicten worden per kaart samengevoegd (sterkste versie wint).
- **Handmatige back-up:** voortgang als kopieerbare code (`SINA1.…`), onafhankelijk van de synchronisatie.

### 4.3 Audio
- **Reservestem:** Spaanse browserstem (speechSynthesis) als benadering.
- **Echte Papiamentu-stem (opt-in):** eenmalige Colab-run (`generate_audio.ipynb`, Meta `facebook/mms-tts-pap`) genereert `audio-pap.js` met 624 fragmenten; de app pikt dat bestand automatisch op en toont "echte Papiamentu-stem ✓". *Status: notebook klaar; run + upload is een openstaande productiestap.*

### 4.4 Design
- **Identiteit:** tropische retro-reisposter. Zonsondergang-hero met stralenzon en Willemstad-silhouet boven een golflijn, zongebleekt papier (licht) / schemer-indigo (donker), harde zeefdruk-schaduwen, serif-display-typografie, uppercase posterknoppen, serif-monogrammen i.p.v. emoji, handgetekende SVG-lijniconen.
- **Niveaukleuren:** mango, zeegroen, zonsondergangrood, havenblauw.
- Licht/donker thema (volgt OS, handmatige toggle), mobile-first (max 720px), reduced-motion-ondersteuning, focus-states.

### 4.5 Techniek
- **Eén zelfstandig HTML-bestand** (`index.html`): vanilla JS, geen dependencies, geen build, werkt offline en vanaf `file://`.
- **Opslag:** localStorage (`sina_pap_v1`): SRS-status per kaart, streak, thema, audio-voorkeur, API-sleutel. Geen verplichte backend of account; optionele synchronisatie via een door de gebruiker zelf beheerde Supabase-tabel (`sina_progress`, REST/PostgREST, beveiligd met een 128-bit synccode).
- **Optionele bestanden:** `audio-pap.js` (echte stem; plaatshouder aanwezig), `generate_audio.ipynb` (generator).
- **Externe koppelingen:** Claude API (alleen met eigen sleutel), claude.ai-prefill-links, bronlinks in het Mas-tabblad.
- **Kwaliteitsborging:** Playwright end-to-end smoke-tests (alle oefenvormen, rollenspel, AI-chat met gestubde API, persistentie, beide thema's) — scripts in de ontwikkelsessie, zie §7 verbeterpunt.

## 5. Non-goals (v1.0)
- Geen accounts of wachtwoorden — synchronisatie is opt-in via een eigen Supabase-database met geheime synccode; zonder configuratie blijft alles per apparaat. Geen leaderboards of sociale functies.
- Geen gamification-zwaargewicht (harten, edelstenen, competitie).
- Geen Arubaanse spellingvariant als aparte modus (wel uitgelegd in de grammatica).
- Geen eigen spraakherkenning voor Papiamentu (bestaat nog niet; benadering via Spaanse engine + zelfbeoordeling).
- Geen native apps; web/PWA volstaat.

## 6. Naar productie (v1.0 release-checklist)

Productie = **GitHub Pages** op de standaardbranch. Stappen:

1. **Merge** branch `claude/papiamentu-learning-app-k6uch6` → `master` (via pull request).
2. **GitHub Pages aanzetten:** repo → Settings → Pages → "Deploy from a branch" → `master`, map `/ (root)`. Na ± 1 minuut live op `https://angelatabak.github.io/angelatabak/`.
3. **Echte stem activeren:** `generate_audio.ipynb` in Colab draaien (± 20 min) en `audio-pap.js` uploaden naar `master` (stappen in README).
4. **Smoke-check op productie:** app openen op de Pages-URL; deck leren, herhaling, audio, thema-toggle; op telefoon "Zet op beginscherm".
5. *(Optioneel)* eigen domein koppelen via Settings → Pages → Custom domain.

**Releaseproces daarna:** wijzigingen op een feature-branch → PR → merge naar `master` = automatisch live (Pages herbouwt bij elke push). Geen build-pipeline nodig omdat de app dependency-vrij is.

## 7. Roadmap (na v1.0)

| Prio | Item | Waarom |
|---|---|---|
| Hoog | Colab-audiorun uitvoeren (`audio-pap.js`) | Grootste kwaliteitssprong: echte Papiamentu-uitspraak |
| Hoog | PWA-manifest + service worker | Installeerbaar met eigen icoon; expliciet offline-cachen |
| Middel | Wave 5 woordenschat (richting ~1000 woorden) | Van A2 naar B1-conversatie |
| Middel | Playwright-tests + CI in de repo (GitHub Actions) | Regressiebescherming bij toekomstige wijzigingen |
| Laag | Embedded display-font (bijv. Fraunces, als bestand) | Laatste stap in de posteridentiteit |
| Laag | Arubaanse spellingtoggle | Bredere doelgroep |
| Laag | Luisteroefeningen (audio eerst, dan tekst) | Vierde vaardigheid expliciet trainen |

## 8. Risico's & mitigaties

| Risico | Impact | Mitigatie |
|---|---|---|
| Taalfouten in de inhoud (AI-samengesteld, geen native review) | Verkeerd aanleren | Review door moedertaalspreker/docent (bijv. via SPLIKA); fouten zijn per kaart te corrigeren |
| localStorage gewist (browserdata opschonen) | Voortgang kwijt | Synchronisatie herstelt automatisch vanaf de database; anders back-upcode |
| Gelijktijdig oefenen op twee apparaten | Klein risico dat een net-geleerde kaart terugvalt (last-write-wins-race) | Per-kaart-merge bij conflicten; zelfherstellend via SRS |
| Browser-TTS/SpeechRecognition-verschillen | Audio/microfoon werkt niet overal | Alles degradeert naar stille of zelfbeoordeel-modus; echte-stem-bestand omzeilt TTS volledig |
| API-sleutel op gedeeld apparaat | Kostenmisbruik | Sleutel is opt-in, lokaal, wisbaar; documentatie waarschuwt; optie: bestedingslimiet in Anthropic Console |
| Claude API-wijzigingen | Chat breekt | Foutafhandeling toont duidelijke melding; claude.ai-links als vangnet |

## 9. Beslissingenlog (samenvatting)

1. **Enkel HTML-bestand, geen framework** — offline, deelbaar, geen onderhoudslast.
2. **Curaçao/Bonaire-spelling** — gebruiker schreef "Papiamentu"; Arubaans als uitleg, niet als modus.
3. **Nederlands als brontaal** — doelgroepbeslissing na eerste Engelse versie.
4. **Retro-poster design** — gekozen door gebruiker uit vier voorgestelde richtingen; emoji volledig vervangen door typografie/SVG op verzoek.
5. **Zelfbeoordeling boven automatische beoordeling bij spreken** — geen Papiamentu-ASR beschikbaar; eerlijkheid is onderdeel van de methode (à la Anki).
6. **AI-gesprekspartner met bring-your-own-key** — geen backend en geen gedeelde sleutel in een publieke repo; claude.ai-links als gratis nulconfiguratie-pad.
7. **Model claude-opus-4-8 voor de chat** — beste kwaliteit; kosten per antwoord zijn centen.
