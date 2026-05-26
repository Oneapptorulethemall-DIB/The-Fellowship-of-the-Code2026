# Artefakt 4 – TFC: Logic & State

> *„The world is not in your books and maps. It’s out there.“ – Gandalf*

---

## Inhaltsverzeichnis

- [Artefakt 4 – TFC: Logic \& State](#artefakt-4--tfc-logic--state)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [1. System Capability](#1-system-capability)
    - [Welche Fähigkeit wird implementiert?](#welche-fähigkeit-wird-implementiert)
    - [Welcher Zustand wird gehalten und verändert?](#welcher-zustand-wird-gehalten-und-verändert)
    - [Warum ist das in dieser Phase der Reise wichtig?](#warum-ist-das-in-dieser-phase-der-reise-wichtig)
  - [2. Logic \& State Implementation](#2-logic--state-implementation)
    - [Dateien](#dateien)
    - [State-Modell](#state-modell)
    - [Logik – Was reagiert worauf?](#logik--was-reagiert-worauf)
      - [a) Routenauswahl (bestehend, dokumentiert)](#a-routenauswahl-bestehend-dokumentiert)
      - [b) Wetter, Versorgung, Priorisierung (neu)](#b-wetter-versorgung-priorisierung-neu)
      - [c) Ranking-Berechnung (neu)](#c-ranking-berechnung-neu)
      - [d) Gap Analysis (neu, ersetzt statisches Markup)](#d-gap-analysis-neu-ersetzt-statisches-markup)
  - [3. Dynamic Behavior](#3-dynamic-behavior)
    - [Reaktionsketten](#reaktionsketten)
    - [Was die Dynamik bewusst *nicht* leistet](#was-die-dynamik-bewusst-nicht-leistet)
  - [4. Design Rationale](#4-design-rationale)
    - [Bezug zu Assignment 1 (Intent \& Value)](#bezug-zu-assignment-1-intent--value)
    - [Bezug zu Assignment 2 (Flow \& Wireframe)](#bezug-zu-assignment-2-flow--wireframe)
    - [Constraints und Annahmen, die die Logik geformt haben](#constraints-und-annahmen-die-die-logik-geformt-haben)
    - [Was bewusst (noch) nicht implementiert wurde](#was-bewusst-noch-nicht-implementiert-wurde)
  - [5. Gelernte Lektionen](#5-gelernte-lektionen)

---

## 1. System Capability

### Welche Fähigkeit wird implementiert?

Die in Assignment 2 ausgewählte und in Assignment 3 statisch repräsentierte Fähigkeit:

**C2 — Kriterienbasierter Routenvergleich.**

Diese Capability wurde **nicht** erweitert oder umbenannt. Sie wird in Assignment 4 lediglich
funktional: Was bisher als statische Darstellung vorlag (vier Routen, vier Kriterien, ein Ranking,
eine Gap-Analyse), reagiert nun auf Eingaben und macht die Entscheidungslogik überprüfbar — genau
wie es das in Assignment 2 formulierte Designziel verlangt.

Wichtig im Sinne von Assignment 2: Das System gibt **keine automatische Empfehlung** ab. Es zeigt,
*warum* eine Route vorne liegt, und überlässt die Entscheidung der Fellowship.

### Welcher Zustand wird gehalten und verändert?

Die Fähigkeit hängt von einem expliziten, klar benennbaren Zustand ab:

| State                | Typ                              | Beschreibung                                                                       |
| -------------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| `selectedRoute`      | `string`                         | Aktuell ausgewählte Route (`caradhras`, `moria`, `rohan`, `south`).                |
| `weatherCondition`   | `"clear" \| "storm" \| "snow"`   | Beeinflusst Sicherheits- und Dauer-Score der Pass-/Außenrouten.                    |
| `supplyLevel`        | `"low" \| "ok" \| "high"`        | Beeinflusst, welche Routen tragbar sind (z. B. Moria mit niedrigem Supply riskant).|
| `safetyPriority`     | `0..1` (Slider/Toggle)           | Gewicht für Sicherheit im Ranking.                                                 |
| `durationPriority`   | `0..1`                           | Gewicht für Dauer.                                                                 |
| `supplyPriority`     | `0..1`                           | Gewicht für Versorgung.                                                            |
| `currentRanking`     | `Array<RouteScore>` (abgeleitet) | Wird aus den oberen Werten berechnet, nicht direkt gesetzt.                        |
| `gaps`               | `Array<Gap>` (abgeleitet)        | Fehlende/unsichere Informationen, abhängig von Wetter, Supply und Route.           |

`currentRanking` und `gaps` sind **abgeleitete** Zustände — sie werden bei jeder Änderung der
„primären“ States neu berechnet. Damit gibt es im System genau eine Quelle der Wahrheit
(`state`-Objekt), und die UI ist eine Funktion davon.

### Warum ist das in dieser Phase der Reise wichtig?

Die Fellowship hat Rivendell verlassen. Ab hier ändern sich Wetter, Versorgung und Risiko
laufend — und Gandalf, Aragorn, Gimli und Frodo schlagen unterschiedliche Routen vor, *weil sie
unterschiedliche Dinge gewichten*. Genau das fängt das System nun ein: Eine Veränderung der
Bedingungen (z. B. Wintereinbruch am Caradhras) verändert sofort sichtbar das Ranking und die
Gap-Analyse. Die Gefährten können dadurch:

- **gemeinsam** sehen, welche Annahme welche Route bevorzugt,
- **nachvollziehen**, warum sich eine Empfehlung verschiebt, und
- **bewusst** entscheiden, statt eine Black-Box-Empfehlung zu akzeptieren.

---

## 2. Logic & State Implementation

### Dateien

| Datei                                     | Status                       | Rolle                                                                  |
| ----------------------------------------- | ---------------------------- | ---------------------------------------------------------------------- |
| `TheFellowshipCompanionKartendesign.html` | leicht erweitert             | Kontrollen für Wetter/Supply/Priorisierung eingebaut, sonst unverändert.|
| `lotrdesign.css`                          | im Wesentlichen unverändert  | Nur kleine Klassen für aktive Zustände (`.is-active`, `.is-warning`).  |
| `routenauswahl.js`                        | bestehend, behält seine Rolle| Kartendarstellung: Routenwechsel, Zoom, Pan, Pinch (bereits vorhanden).|
| `state.js` *(neu)*                        | neu                          | State-Container und Reducer für Wetter, Supply, Prioritäten, Ranking.   |

Das bestehende `routenauswahl.js` wird **nicht** umgebaut. Es hört auf Klicks der Route-Buttons
und behandelt die Karte — diese Verantwortung bleibt bei ihm. `state.js` hängt sich an dieselben
Buttons (und an die neuen Kontrollen) und kümmert sich ausschließlich um den Anwendungs-Zustand.
Trennung der Verantwortlichkeiten – das war eine bewusste Entscheidung (siehe Rationale).

### State-Modell

Der gesamte Zustand liegt in einem einzigen Objekt:

```js
const state = {
  selectedRoute: "caradhras",
  weatherCondition: "clear",
  supplyLevel: "ok",
  priorities: { safety: 0.5, duration: 0.3, supply: 0.2 },
};
```

Alle Veränderungen laufen über genau eine Funktion:

```js
function setState(patch) {
  Object.assign(state, patch);
  render();
}
```

`render()` berechnet das Ranking und die Gaps neu und aktualisiert die UI. Damit ist garantiert:
**Jede sichtbare Änderung ist Folge einer Zustandsänderung — nichts wird „nebenher“ manipuliert.**

### Logik – Was reagiert worauf?

#### a) Routenauswahl (bestehend, dokumentiert)

Klick auf einen Route-Button → `routenauswahl.js` aktualisiert die Karte; gleichzeitig hört
`state.js` denselben Klick ab und ruft `setState({ selectedRoute: id })` auf.

#### b) Wetter, Versorgung, Priorisierung (neu)

Drei einfache Kontrollen in der Info-Leiste bzw. unter dem Ranking:

- Wetter: drei kleine Buttons (`Clear`, `Storm`, `Snow`) — repräsentieren externe Bedingungen.
- Versorgung: drei Buttons (`Low`, `OK`, `High`) — repräsentieren den Gruppenzustand.
- Priorisierung: drei Slider oder Buttons für Sicherheit / Dauer / Versorgung.

Jede Eingabe ruft `setState(...)` auf — kein direkter DOM-Zugriff aus dem Event-Handler heraus.

#### c) Ranking-Berechnung (neu)

Für jede Route gibt es einen Basis-Score je Kriterium (statisches Datenobjekt, übernommen aus
Assignment 3):

```js
const routeScores = {
  caradhras: { safety: 0.4, duration: 0.9, supply: 0.7 },
  moria:     { safety: 0.3, duration: 0.8, supply: 0.4 },
  rohan:     { safety: 0.8, duration: 0.4, supply: 0.7 },
  south:     { safety: 0.7, duration: 0.2, supply: 0.5 },
};
```

Diese Basiswerte werden durch den aktuellen `weatherCondition` und `supplyLevel` modifiziert
(z. B. `snow` zieht den Safety-Score des Caradhras massiv nach unten; `low` Supply senkt den
Supply-Score von Moria). Daraus wird je Route ein gewichteter Score berechnet:

```js
score = priorities.safety   * adjustedSafety
      + priorities.duration * adjustedDuration
      + priorities.supply   * adjustedSupply;
```

`currentRanking` ist einfach das `Object.entries(routeScores).map(...).sort(...)`. Das Ergebnis
wird in die bestehenden Rank-Karten geschrieben — Position 1, 2, 3.

#### d) Gap Analysis (neu, ersetzt statisches Markup)

Die Liste der Gaps wird **nicht mehr statisch** im HTML gepflegt, sondern aus Regeln abgeleitet:

```js
function computeGaps(state) {
  const gaps = [];
  if (state.weatherCondition === "snow" && state.selectedRoute === "caradhras")
    gaps.push({ tag: "Weather", text: "Extreme blizzards on Caradhras – pass likely blocked." });
  if (state.supplyLevel === "low" && state.selectedRoute === "moria")
    gaps.push({ tag: "Supplies", text: "Insufficient provisions for 10 days underground." });
  // … weitere Regeln
  return gaps;
}
```

So entsteht ein direkter, *erklärbarer* Zusammenhang zwischen Bedingungen und sichtbaren Lücken:
Wenn ein Nutzer fragt „warum erscheint diese Warnung?“, lässt sich das aus einer einzigen
Funktion beantworten.

---

## 3. Dynamic Behavior

### Reaktionsketten

Drei beispielhafte Interaktionen — sie zeigen den Übergang von *Repräsentation* zu *Verhalten*:

1. **Wetter → Caradhras-Fall**
   `setState({ weatherCondition: "snow" })`
   → Safety-Score Caradhras sinkt → Rohan rückt im Ranking vor → neue Gap-Karte erscheint:
   *„Pass likely blocked“*. Die UI ändert sich an drei Stellen gleichzeitig, aber alles geht auf
   eine einzige State-Änderung zurück.

2. **Versorgung → Moria-Fall**
   `setState({ supplyLevel: "low" })`
   → Supply-Score Moria sinkt → Position 2 wird ggf. zu Position 3 → Gap *„Insufficient
   provisions“* erscheint.

3. **Priorisierung verschieben**
   Slider „Sicherheit“ hochziehen → Gewicht von 0.5 auf 0.8 → Rohan steigt auf, Caradhras fällt.
   Der Nutzer sieht, *welche Annahme welche Empfehlung trägt*.

### Was die Dynamik bewusst *nicht* leistet

- Sie **trifft keine Entscheidung**. Die Reihenfolge im Ranking ist eine Funktion der Eingaben —
  das System bleibt ein Werkzeug, keine Autorität.
- Sie **erfindet keine Daten**. Was nicht im State steht, erscheint als Gap, nicht als Schätzung.
- Sie **animiert nicht aus Effekt**. Übergänge sind funktional (Ranking-Wechsel), nicht
  dekorativ.

---

## 4. Design Rationale

### Bezug zu Assignment 1 (Intent & Value)

Assignment 1 hat formuliert: Das System soll *„Informationen verständlich darstellen,
Unsicherheiten sichtbar machen, sichere Entscheidungen ermöglichen“*. Die Logik unterstützt
exakt das:

- Verständlichkeit → eine einzige Quelle der Wahrheit (`state`); jede Ansicht ist erklärbar.
- Unsicherheit sichtbar → Gaps werden aus Regeln *abgeleitet* statt hardcoded angezeigt; sie
  reagieren auf die Welt.
- Sichere Entscheidungen → Priorisierung ist *transparent* (Gewichte sind sichtbar), und das
  Ranking ist dadurch hinterfragbar.

### Bezug zu Assignment 2 (Flow & Wireframe)

Der Flow in Assignment 2 sah vor: Nutzer wählt Route → vergleicht Kriterien → priorisiert
optional → entscheidet bewusst. Genau dieser Pfad ist jetzt ausführbar:

- „Routen auswählen“ wirkt auf Karte **und** State (zwei Module hören auf dieselbe Aktion).
- „Kriterien vergleichen“ ist die jetzt **berechnete** Ranking-Liste.
- „Priorisieren“ existiert als reale Eingabe und verändert das Ranking sofort.
- Eine **automatische Empfehlung** wurde — wie in Assignment 2 begründet — weiterhin nicht
  eingebaut.

### Constraints und Annahmen, die die Logik geformt haben

- **Keine externen Libraries / kein Backend / keine Persistenz** (lt. Brief). Daher: kein
  Framework, kein `localStorage`, keine API-Aufrufe.
- **Kein Redesign**. Die UI von Assignment 3 bleibt strukturell unverändert; die neuen Kontrollen
  passen sich farblich und typografisch in das bestehende `lotrdesign.css` ein.
- **Trennung der Verantwortlichkeiten**: `routenauswahl.js` bleibt für die Karte zuständig
  (Zoom/Pan/Pinch). `state.js` ist für *Anwendungs*-Zustand zuständig. Beide hängen an
  denselben Buttons, treten sich aber nicht in die Quere.
- **Single Source of Truth**: jeder Render geht durch eine `render()`-Funktion, die aus dem
  Zustand die DOM-Updates ableitet. Kein paralleles DOM-Stricken in Event-Handlern.
- **Annahme:** Die Basis-Scores (Safety/Duration/Supply pro Route) sind nicht „echt“, sondern
  spiegeln die in Assignment 3 dargestellten Bewertungen wider. Das ist legitim, weil die
  Aufgabe Verhalten zeigen soll, nicht echte Geodaten verarbeiten.

### Was bewusst (noch) nicht implementiert wurde

- **Persistenz**: Zustand verschwindet beim Reload. Würde durch `localStorage` einfach möglich
  sein, ist aber laut Brief untersagt.
- **Mehrere gleichzeitige Nutzer / „Stimmen“ der Fellowship**: in Assignment 1 erwähnt, gehört
  aber nicht zu C2 und wäre ein neues Feature.
- **Animationen / Visualisierung von Ranking-Wechseln**: bewusst weggelassen, weil die Aufgabe
  *„behavior, state, and constraints — not new visuals“* fordert.
- **Validierung extremer Eingaben** (z. B. alle Prioritäten = 0): sinnvoll, aber für die
  Demonstration der Capability nicht zwingend.
- **Begründung der Gaps mit Datenalter / Quelle**: in Assignment 2 als Designziel angerissen,
  hier nur als statischer Tag (`Weather`, `Supplies`) implementiert.

---

## 5. Gelernte Lektionen

- *State first, UI second*: Sobald der Zustand sauber modelliert ist, wird die UI fast trivial.
  Andersherum entsteht Chaos.
- *Abgeleiteter Zustand* (Ranking, Gaps) gehört **nicht** ins State-Objekt. Wer das doppelt
  pflegt, baut sich Bugs.
- *Trennung der Verantwortlichkeiten* zwischen `routenauswahl.js` (Karte) und `state.js`
  (Anwendungslogik) macht beide Dateien lesbarer als ein gemeinsamer „Mega-Controller“.
- *Constraints helfen*: Das Verbot von Frameworks und Persistenz hat dazu gezwungen, die
  Logik ehrlich klein zu halten — was ihr gut tut.
- *Verhalten ≠ Empfehlung*. Das System ist jetzt dynamisch, ohne der Fellowship die Entscheidung
  abzunehmen. Genau das war das Designziel seit Assignment 2.

---

🔙 [Zurück zum Red Book](https://oneapptorulethemall-dib.github.io/The-Fellowship-of-the-Code2026/)

