# Úloha: Základy E2E testovania s Cypress (Next.js)

## 🎯 Ciele
- pochopiť rozdiel **unit vs. e2e** (testujem funkciu vs. testujem správanie používateľa v prehliadači),
- spustiť Cypress v tomto projekte a zorientovať sa v štruktúre,
- vedieť používať **stabilné selektory** (data-atribúty), interakcie a tvrdenia,
- doplniť/implementovať **predpripravené scenáre v priečinku `cypress/e2e/`** tak, aby testy prešli.


---

##    Odporúčané video

- https://www.youtube.com/watch?v=BQqzfHQkREo

---

## ⚙️ Ako spustiť projekt (lokálne)
Podľa návodu v repozitári: nainštaluj balíky, urob migrácie a seed, spusti dev server. (DB je SQLite v súbore `db.sqlite`).

```bash
npm install
npm run db:migrate:latest
npm run db:seed:run
npm run dev
# aplikácia beží na http://localhost:3000
```

---

## 🧪 Ako spustiť Cypress
V repozitári je pripravený skript na Cypress. Spusť ho až keď ide dev server.

```bash
npm run test:cypress       # otvorí Cypress Test Runner (GUI)
```

---

## 🗂️ Kde dopĺňať testy
- Všetky predpripravené scenáre nájdete v **`cypress/e2e/`**.
- **Úloha:** dokončiť jednotlivé `it(...)` prípady podľa TODO/komentárov tak, aby prešli v Cypress GUI aj headless behu.

> Ak uvidíš selektory typu `data-cy="..."`, **používaj ich prednostne, doplň si ich do projektu podľa potreby**:

```ts
cy.get('[data-cy="submit-order"]').click();
cy.get('[data-testid="product-card"]').should('be.visible');
```

---

## 🧭 Mini-ťahák k Cypress príkazom
| Typ | Príkaz | Popis |
|------|--------|--------|
| Navigácia | `cy.visit('/')` | otvorí stránku |
| Výber | `cy.get('[data-cy="title"]')` | nájdi element podľa data-atribútu |
| Výber podľa textu | `cy.contains('button', 'Odoslať')` | nájdi element podľa textu |
| Interakcia | `.click()`, `.type('text')`, `.check()`, `.select('Košice')` | akcie používateľa |
| Overenie | `.should('be.visible')`, `.should('contain.text', 'Mini Shop')`, `.should('have.length.at.least', 3)` | tvrdenia |
| Vnorovanie | `.within(() => { ... })` | vyber len vnorené elementy |
| Alias | `.as('items')`, `cy.get('@items')` | pomenovanie výberu |
| Responzivita | `cy.viewport(375, 667)` | simulácia mobilu |
| Sieť (pokročilé) | `cy.intercept('POST', '/api/...').as('req')`, `cy.wait('@req')` | mockovanie požiadaviek |

---

## ✅ Odporúčaný minimálny rozsah
Implementuj **minimálne 6 testov** naprieč existujúcimi scenármi v `cypress/e2e/`:

1. Otvorenie stránky + overenie kľúčového prvku (titulok/hlavička/logo).  
2. Zoznam/grid – viditeľný a má viac ako 0 položiek (ideálne 3+).  
3. Interakcia – klik/písanie/voľba v selecte a následná zmena UI.  


---

## 🧩 Best practices (hodnotenie)
- Čitateľné názvy `it('…')` hovoria, čo používateľ robí a čo očakávame.  
- Stabilné selektory (`data-cy`) namiesto krehkých `.class1 > :nth-child(2)`.  
- Bez `cy.wait(1000)` – Cypress má auto-retry (`.should(...)`).  
- Nezávislé testy – každý si začne `cy.visit('/')`.  
- skúste zapracovat aj AAA (Arrange-Act-Assert) štruktúra – príprava, akcia, očakávanie.

---

## 💡 Najčastejšie problémy
- **„Element not found“** – skontroluj `data-*` selektor alebo použi `cy.contains('text')`.  
- **„Connection refused“** – beží dev server (`npm run dev`)?  
- **Flaky testy** – žiadne pevné čakania; používaj `.should(...)`.  

---

## 🚀 Odovzdanie
- Poslať link na forknutý repozitár s vypracovanými testami na MS Teams. 
---
