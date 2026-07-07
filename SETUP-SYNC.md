# Synchronisatie instellen (± 10 minuten)

Hiermee synchroniseert je voortgang automatisch tussen al je apparaten (telefoon, iPad, laptop). Je zet hiervoor je eigen gratis mini-database op bij **Supabase** — je hoeft niet te programmeren, alleen te klikken en één blokje tekst te plakken.

> **Wat je eigenlijk aan het doen bent:** de app was tot nu toe volledig "statisch" (alles op je eigen apparaat). Met deze stappen maak je jouw eerste stukje *backend*: een database in de cloud waar de app zijn voortgang heen stuurt en ophaalt. Welkom in de softwareontwikkeling. 🙂

## Stap 1 — Maak een Supabase-account en project

1. Ga naar **https://supabase.com** en klik op **Start your project** (inloggen kan met GitHub — dat account heb je al).
2. Klik op **New project**. Kies een naam (bijv. `sina-papiamentu`), verzin een databasewachtwoord (bewaar het ergens, maar je hebt het hierna niet nodig) en kies regio **West EU**. Klik **Create new project** en wacht ± 2 minuten tot het project klaar is.

## Stap 2 — Maak de tabel aan

1. Klik in het menu links op **SQL Editor**.
2. Plak onderstaand blokje in het grote veld en klik op **Run** (rechtsonder). Je zou "Success. No rows returned" moeten zien.

```sql
create table if not exists sina_progress (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table sina_progress enable row level security;

create policy "toegang via geheime synccode"
  on sina_progress for all
  to anon
  using (true)
  with check (true);
```

*Wat dit doet:* het maakt één tabel ("sina_progress") met plek voor je voortgang. De beveiliging werkt via een geheime code die de app zelf genereert — alleen apparaten die jouw synccode kennen, vinden jouw rij.

## Stap 3 — Haal twee gegevens op

1. Klik links op het tandwiel **Project Settings → API** (of "API Keys").
2. Kopieer twee dingen:
   - **Project URL** — ziet eruit als `https://abcdefgh.supabase.co`
   - **anon public** key — een lange tekst die begint met `eyJ…`

## Stap 4 — Zet het aan in de app

1. Open de app en klap onderaan het Home-scherm **"Synchronisatie tussen apparaten & back-up"** open.
2. Plak de **Project URL** en de **anon key** in de twee velden en klik op **Zet aan**.
3. Klik daarna op **"Kopieer synccode voor een nieuw apparaat"** en stuur die code naar jezelf.
4. Open de app op je iPad (of ander apparaat), klap hetzelfde menu open, plak de synccode bij **"Koppel"** — klaar.

Vanaf nu synchroniseert alles vanzelf: na elke oefening wordt je voortgang binnen ± 2 seconden opgeslagen in jouw database, en elk apparaat haalt de nieuwste stand op zodra je de app opent of ernaar terugschakelt (en verder elke minuut). Onder in het menu zie je "Gesynchroniseerd · [tijd]" als bevestiging.

## Goed om te weten

- **Gratis:** het Supabase-free-tier is ruim voldoende (jouw voortgang is een paar kilobytes; de limiet is 500 MB).
- **Privé:** je synccode bevat de sleutels tot jóuw database — deel hem alleen met je eigen apparaten. Er staat overigens niets gevoeligs in: alleen welke Papiamentu-woorden je kent.
- **Offline blijft werken:** geen internet? De app werkt gewoon door en synchroniseert zodra je weer online bent.
- **Werkt niet in de artifact-weergave** (die blokkeert verbindingen naar buiten) — wel in de GitHub Pages-versie en het lokale bestand.
- **Uitzetten** kan altijd, per apparaat, in hetzelfde menu; je voortgang blijft dan lokaal staan.
- **Handmatige back-upcode** (SINA1.…) blijft daarnaast bestaan en werkt onafhankelijk van de synchronisatie.
