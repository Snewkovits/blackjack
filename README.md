# Blackjack 🃏

Egy egyszerű, böngészőben futó Blackjack (21-es) játék, amely tiszta HTML, CSS és JavaScript használatával készült.

## Funkciók

- Klasszikus Blackjack szabályok (játékos vs. dealer)
- Kártyahúzás (Hit) és megállás (Stand)
- Automatikus dealer logika (17-nél vagy felette megáll)
- Valós idejű pontszám számítás (Ace = 1 vagy 11)
- Nyertes/döntetlen/vesztes kiértékelés
- Letisztult, kártya-stílusú felhasználói felület
- Teljesen kliensoldali – nincs szerver szükséges
- Reszponzív design (mobilról is játszható)

## Tech Stack

- **HTML5**
- **CSS3** (kártya animációkkal)
- **Vanilla JavaScript**

## Használat

1. Klónozd a repository-t:

```bash
git clone https://github.com/Snewkovits/blackjack.git
```

Nyisd meg a index.html fájlt bármely modern böngészőben (Chrome, Firefox, Edge…).

Kész! Nincs telepítés, nincs build lépés – azonnal játszható.
# Projekt szerkezet
```
textblackjack/
├── index.html          # Fő oldal és játék felület
├── style.css           # Stílusok és kártya design
├── script.js           # Játéklogika (vagy scripts/ mappában)
├── assets/             # Képek (kártyák, háttér stb.) – ha van
├── README.md
└── (további fájlok...)
```
# Játékszabályok (rövid emlékeztető)

* Cél: minél közelebb jutni 21-hez anélkül, hogy túllépnéd.
* Lapok: 2–10 = saját érték, J/Q/K = 10, Ász = 1 vagy 11.
* Blackjack (21 két lappal) azonnali győzelem.
* Dealer 17-nél vagy felette megáll.

# Fejlesztés
A projekt teljesen önállóan fut a böngészőben.
Szeretnél új funkciókat? (pl. tét rendszer, split, insurance, hangok, statisztikák) – szívesen fogadom a Pull Request-eket!
# 🤝 Hozzájárulás

Forkold a repository-t
Hozz létre egy feature branch-et (git checkout -b feature/új-funkció)
Commitold a változásokat
Nyiss egy Pull Request-et

Készítette: Snewkovits
Jó szórakozást a játékhoz!
