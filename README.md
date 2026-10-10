# UNDA — Zvanični veb-sajt

## O projektu

Ovaj repozitorijum sadrži izvorni kod zvaničnog veb-sajta kompanije **UNDA MD**, koja pruža usluge projektovanja elektroinstalacija, stručnog nadzora, elektroenergetike, telekomunikacionih i signalnih instalacija, kao i druge inženjerske usluge.

Sajt predstavlja delatnosti kompanije, realizovane projekte, reference i kontakt informacije. Sadržaj je dostupan na srpskom i engleskom jeziku, a prikaz je prilagođen računarima, tabletima i mobilnim uređajima.

## Objavljeni sajt

Zvanični sajt je dostupan na adresi [https://unda.rs/](https://unda.rs/).

## Korišćene tehnologije

Sajt je izrađen kao statički veb-sajt i ne zahteva instaliranje projektnih zavisnosti niti poseban proces izgradnje.

- HTML5 za strukturu i sadržaj stranica
- CSS3 za izgled, responzivni raspored i animacije
- JavaScript bez dodatnih biblioteka za navigaciju, izbor jezika i interaktivne elemente
- Lokalno smešten font Manrope u formatu WOFF2
- SVG, PNG, JPG i WebP grafički formati

## Struktura projekta

```text
UNDA-sajt/
├── public/
│   ├── index.html                 # Početna strana
│   ├── reference.html             # Pregled projekata i referenci
│   ├── robots.txt                 # Pravila za veb-pretraživače
│   ├── sitemap.xml                # Mapa javnih stranica sajta
│   └── assets/
│       ├── css/style.css          # Stilovi i responzivni prikaz
│       ├── js/main.js             # Navigacija, jezici i interakcije
│       ├── fonts/                 # Lokalni fontovi
│       └── images/                # Grafika, zastave i slike projekata
├── source-assets/
│   └── reference-images/          # Izvorne slike za buduću obradu
├── .gitignore                     # Fajlovi koje Git ne prati
└── README.md                      # Dokumentacija projekta
```

Direktorijum `public/` sadrži kompletnu verziju sajta spremnu za lokalni pregled i objavljivanje. Izvorne slike u `source-assets/` treba sačuvati za buduće izmene i ponovnu optimizaciju fotografija.

## Preuzimanje sajta

### Prvi način — preko GitHuba

1. Otvoriti [GitHub repozitorijum](https://github.com/fuuukss/UNDA-sajt).
2. Kliknuti na zeleno dugme `Code`.
3. Izabrati `Download ZIP`.
4. Raspakovati preuzetu ZIP arhivu na računaru.

### Drugi način — preko Git-a

Na računaru na kojem je instaliran Git otvoriti PowerShell ili Command Prompt i pokrenuti:

```powershell
git clone https://github.com/fuuukss/UNDA-sajt.git
cd UNDA-sajt
```

Komanda preuzima kompletnu istoriju projekta i postavlja aktuelnu granu `main` kao radnu granu.

## Lokalno pokretanje sajta

Projekat nema paket-menadžer, spoljne programske zavisnosti ni korak za izgradnju. Za pouzdan lokalni pregled preporučuje se mali lokalni HTTP server.

Ako je na Windows računaru instaliran Python 3, iz korena projekta pokrenuti:

```powershell
cd public
py -m http.server 8000
```

Zatim u pregledaču otvoriti [http://localhost:8000/](http://localhost:8000/). Server se zaustavlja prečicom `Ctrl+C` u terminalu.

Ako komanda `py` nije dostupna, može se koristiti `python -m http.server 8000` ili ekstenzija **Live Server** u programu Visual Studio Code. Python i Live Server služe samo za lokalni pregled i nisu zavisnosti samog sajta.

## Izmene i ažuriranje sajta

Pre početka rada treba proveriti da se izmene prave na najnovijoj verziji grane `main`:

```powershell
git switch main
git pull --ff-only origin main
code .
```

Standardni postupak je sledeći:

1. Otvoriti projekat u Visual Studio Code-u.
2. Izmeniti potrebne fajlove u direktorijumu `public/`. Izvorne materijale u `source-assets/` menjati samo kada je to potrebno.
3. Pokrenuti lokalni server i proveriti obe stranice, oba jezika i mobilni prikaz.
4. Pregledati pripremljene izmene komandom `git status` i, po potrebi, `git diff`.
5. Dodati samo željene fajlove u commit, na primer `git add public/index.html public/assets/css/style.css`.
6. Napraviti jasan commit, na primer `git commit -m "Ažuriraj podatke o projektu"`.
7. Poslati commit na GitHub komandom `git push origin main`.

Ako Git zatraži prijavu, potrebno je prijaviti se na GitHub nalog koji ima pravo upisa u repozitorijum.

## Objavljivanje sajta

Repozitorijum ne sadrži GitHub Actions workflow, GitHub Pages konfiguraciju niti konfiguraciju servisa kao što su Netlify ili Vercel. Postojeća struktura i istorija projekta pokazuju da je sadržaj direktorijuma `public/` namenjen ručnom postavljanju u javni direktorijum hosting naloga, kao što je `public_html` u cPanel-u.

Zbog toga slanje commita u granu `main` čuva novu verziju na GitHubu, ali **ne ažurira automatski** javno dostupan sajt. Za objavljivanje je potrebno preneti sadržaj direktorijuma `public/` na postojeći hosting, prema pristupnim podacima i proceduri provajdera. Pre prenosa treba lokalno proveriti sve izmene i sačuvati rezervnu kopiju trenutno objavljene verzije.

## Vlasništvo

Projekat je namenjen kompaniji **UNDA MD**. Repozitorijum ne sadrži licencu koja odobrava javno korišćenje, izmenu ili distribuciju koda i sadržaja.
