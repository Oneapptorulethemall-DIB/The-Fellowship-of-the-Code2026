# Artefakt 4 – TFC: Logic & State

> *„The world is not in your books and maps. It’s out there.“ – Gandalf*

---

## Inhaltsverzeichnis

- [Artefakt 4 – TFC: Logic & State](#artefakt-4--tfc-logic--state)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [1. System Capability](#1-system-capability)
    - [Welche Fähigkeit wird implementiert?](#welche-fähigkeit-wird-implementiert)
    - [Welcher Zustand wird gehalten und verändert?](#welcher-zustand-wird-gehalten-und-verändert)
    - [Warum ist das in dieser Phase der Reise wichtig?](#warum-ist-das-in-dieser-phase-der-reise-wichtig)
  - [2. Logic & State Implementation](#2-logic--state-implementation)
    - [Dateien](#dateien)
    - [State-Variablen im Detail](#state-variablen-im-detail)
    - [Logik – Was reagiert worauf?](#logik--was-reagiert-worauf)
      - [a) Routenauswahl](#a-routenauswahl)
      - [b) Karten-Steuerung (Zoom, Pan, Pinch)](#b-karten-steuerung-zoom-pan-pinch)
      - [c) Gap-Analyse](#c-gap-analyse-toggle)
  - [3. Dynamic Behavior](#3-dynamic-behavior)
    - [Reaktionsketten](#reaktionsketten)
    - [Was die Dynamik bewusst *nicht* leistet](#was-die-dynamik-bewusst-nicht-leistet)
  - [4. Design Rationale](#4-design-rationale)
    - [Bezug zu Assignment 1 (Intent & Value)](#bezug-zu-assignment-1-intent--value)
    - [Bezug zu Assignment 2 (Flow & Wireframe)](#bezug-zu-assignment-2-flow--wireframe)
    - [Constraints und Annahmen, die die Logik geformt haben](#constraints-und-annahmen-die-die-logik-geformt-haben)
    - [Was bewusst (noch) nicht implementiert wurde](#was-bewusst-noch-nicht-implementiert-wurde)
  - [5. Gelernte Lektionen](#5-gelernte-lektionen)

---

## 1. System Capability

### Welche Fähigkeit wird implementiert?

**C2 — Kriterienbasierter Routenvergleich.**

Aus der statischen Darstellung von Assignment 3 (vier Routen-Buttons, eine Karte,
ein Ranking, eine Gap-Analyse) wird ein Interface, das auf Nutzereingaben reagiert. Der Nutzer
kann zwischen Routen wechseln, die zugehörige Karte interaktiv erkunden (zoomen, verschieben)
und sich die Gap-Analyse (unten) aufklappen — alles ohne dass neue Elemente, neue Daten oder neue
Bewertungsfunktionen hinzukommen.

Wichtig: Das System gibt **keine automatische Empfehlung** ab. Es
stellt die Routen vergleichbar nebeneinander, zeigt die Karte zur gewählten Route und macht
fehlende Informationen sichtbar — die Entscheidung bleibt bei der Fellowship.

### Welcher Zustand wird gehalten und verändert?

Der gesamte Zustand existiert innerhalb der abgeschotteten Funktion (IIFE = eine Funktion, die sich selbst sofort aufruft und ihre Variablen privat hällt) in
`routenauswahl.js`.

| State                       | Typ        | Wo                  | Beschreibung                                                 |
| --------------------------- | ---------- | ------------------- | ------------------------------------------------------------ |
| `activeRoute`               | `string`   | Closure-Variable    | Aktuell ausgewählte Route (`caradhras`, `moria`, `rohan`, `south`). |
| `scale`                     | `number`   | Closure-Variable    | Aktueller Zoom-Faktor der Karte.                              |
| `translateX`, `translateY`  | `number`   | Closure-Variablen   | Verschiebung der Karte in Pixeln.                             |
| `savedViews`                | `object`   | Closure-Variable    | Pro Route gemerkte Karten-Ansicht (Zoom + Position).          |
| `isDragging`                | `boolean`  | Closure-Variable    | Ist der Nutzer gerade beim Ziehen der Karte?                  |
| `activePointerId`           | `number`   | Closure-Variable    | Welcher Pointer (Maus/Finger) führt das aktuelle Drag aus?    |
| `pinchStartDistance`        | `number`   | Closure-Variable    | Abstand der Finger beim Beginn einer Pinch-Geste.             |
| `pinchStartScale`           | `number`   | Closure-Variable    | Zoom-Faktor zu Beginn einer Pinch-Geste.                      |
| `display`-Property des Modals | `string` | DOM (`#gap-details-modal`) | Sichtbarkeit der Gap-Detailkarte (`"none"` oder `"block"`). |

Die meisten dieser Werte sind als `let` oder `const` innerhalb der abgeschotteten Funktion aktiv — dadurch sind
sie privat und können nicht versehentlich von außen verändert werden.

### Warum ist das in dieser Phase der Reise wichtig?

Die Fellowship steht in Rivendell und muss entscheiden, welchen Weg sie nimmt. Gandalf,
Aragorn, Gimli und Frodo bringen unterschiedliche Vorschläge mit — also vier mögliche Routen.
Damit die Gefährten diese sinnvoll vergleichen können, brauchen sie:

- **eine vergleichbare Sicht** auf jede Route (Karte ansehen, Ranking-Position),
- **eine Möglichkeit zu wechseln**, ohne die ursprüngliche Sicht zu verlieren (deshalb
  `savedViews`: die zuletzt gewählte Zoom-Position pro Route bleibt erhalten),
- **eine sichtbare Markierung dessen, was nicht bekannt ist** (deshalb die Gap-Analyse als
  ein- und ausklappbares Element).

Genau diese drei Dinge macht die App jetzt — nicht mehr & nicht weniger.

---

## 2. Logic & State Implementation

### Dateien

| Datei                                     | Status           | Rolle                                                                |
| ----------------------------------------- | -----------      | -------------------------------------------------------------------- |
| `TheFellowshipCompanionKartendesign.html` | unverändert      | Statische Struktur aus Assignment 3 plus eine `<script>`-Funktion `toggleDetails()` für das Gap-Modal. |
| `lotrdesign.css`                          | etwas abgeändert | Styling aus Assignment 3; `.is-active`, `.is-dragging` werden von JS gesetzt. |
| `routenauswahl.js`                        | aktiv            | Enthält die gesamte Anwendungslogik in einer IIFE.                    |

Die gesamte JavaScript-Logik ist in **einer einzigen IIFE** gekapselt — das heißt, sie läuft in
einem eigenen Scope, und keine ihrer Variablen ist global sichtbar. Diese Kapselung ist selbst
schon eine bewusste Entscheidung: Sie verhindert Namenskonflikte und macht klar, was
„innen" zur App gehört und was „außen" DOM ist.

### State-Variablen im Detail

Drei Gruppen von Zustand existieren parallel — sie sprechen über unterschiedliche Dinge und
greifen sich nicht in die Quere:

**1. Anwendungs-Zustand**
`activeRoute` beantwortet die Frage „Welche Route schaut der Nutzer gerade an?". Sie ist die
Verbindung zwischen Buttons, Karten-Label und sichtbarem Karten-Bild.

**2. Karten-Zustand**
`scale`, `translateX`, `translateY` beschreiben die aktuelle Darstellung der Karte. `savedViews`
ist ein Objekt, das diese Werte **pro Route** speichert — wenn der Nutzer von Caradhras nach
Moria wechselt und zurück, sieht er Caradhras wieder so, wie er es verlassen hat.

**3. Interaktions-Zustand**
`isDragging`, `activePointerId`, `pinchStartDistance` und `pinchStartScale` sind kurzlebig: Sie
existieren nur während einer aktiven Geste (z.B. Dragging). Sie sind keine „dauerhaften" Daten, sondern halten
Zwischenwerte fest.

Diese Trennung ist im Code sichtbar, weil die Variablen direkt am Anfang der IIFE gruppiert
deklariert sind. Niemand muss raten, was wozu gehört.

### Logik – Was reagiert worauf?

#### a) Routenauswahl

Klick auf einen `.route-btn` löst `setActiveRoute(routeId)` aus. Diese Funktion ist das
Herzstück der Anwendungslogik. Sie:

1. Speichert die aktuelle Karten-Ansicht in `savedViews[activeRoute]` (damit die alte Route
   ihren Zoom-Stand behält),
2. setzt `activeRoute` auf die neue ID,
3. aktualisiert die Buttons: der gewählte bekommt `.is-active` und `aria-pressed="true"`,
   alle anderen verlieren diese Markierungen,
4. blendet die richtige Karte ein und alle anderen aus (über das `hidden`-Attribut),
5. setzt das Label `#map-route-lable` auf den lesbaren Namen,
6. lädt entweder die gespeicherte Ansicht der neuen Route oder skaliert die Karte erstmalig
   so, dass sie ins Viewport passt (`fitImageToViewport`).

Vier UI-Bereiche reagieren also auf einen einzigen Klick: Button-Hervorhebung, Karten-Bild,
Label, Zoom-Position. Das ist die definierende Eigenschaft von zustandsabhängiger UI — eine
Eingabe, mehrere Konsequenzen, alle erklärbar.

#### b) Karten-Steuerung (Zoom, Pan, Pinch)

Drei Kontroll-Buttons reagieren auf Klicks:
- `+` ruft `zoomIn()` → erhöht `scale` um den Faktor `ZOOM_STEP` (1.15), zentriert auf das
  Viewport,
- `-` ruft `zoomOut()` → das Gegenstück,
- `reset` ruft `resetView()` → verwirft die gespeicherte Ansicht der aktuellen Route und passt
  die Karte neu ins Viewport ein.

Mausrad-Scroll im Viewport zoomt ebenfalls — über `wheel`-Event, das `e.deltaY` ausliest und je
nach Richtung `zoomIn` oder `zoomOut` ausführt. Im Unterschied zu den Buttons zoomt das Rad
**an die Mausposition**, nicht zum Zentrum.

Pointer-Events (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`) realisieren das
Ziehen der Karte. Solange `isDragging` true ist und der gleiche `activePointerId` weitermeldet,
werden `translateX` und `translateY` aus der Mausbewegung neu berechnet. Beim Loslassen wird
die finale Position in `savedViews[activeRoute]` festgehalten.

Touch-Events mit zwei Fingern (`touchstart`, `touchmove`) erkennen Pinch-Gesten: der Abstand
zwischen den Fingern verglichen mit `pinchStartDistance` ergibt einen neuen Zoom-Faktor, der
am Zentrum der beiden Finger angewendet wird.

`applyTransform()` ist die zentrale Stelle, an der `scale`, `translateX` und `translateY`
wirklich aufs DOM treffen. Jede Logik, die diese Werte verändert, ruft am Ende
`applyTransform()` — das hält das Bild synchron mit dem State.

#### c) Gap-Analyse (Toggle)

Im HTML steckt eine kurze Funktion:

```js
function toggleDetails() {
  const modal = document.getElementById("gap-details-modal");
  if (modal.style.display === "none" || modal.style.display === "") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}
```

Der „View Gaps"-Button und der Schließen-Button (`×`) rufen beide diese Funktion auf. Der
Zustand ist hier extrem klein — nur „auf" oder „zu" — und lebt direkt als `display`-Property
am DOM-Element. Das ist legitimer State, auch wenn er nicht in einer Variable steht: er bleibt
bestehen, und die UI verhält sich beim nächsten Klick entsprechend.

---

## 3. Dynamic Behavior

### Reaktionsketten

Drei Interaktionen, beobachtbar im laufenden Interface:

1. **Routenwechsel.**
   Klick auf „Mines of Moria" → `setActiveRoute("moria")` →
   - Caradhras-Button verliert `.is-active`, Moria-Button bekommt sie,
   - die Caradhras-Karte wird `hidden`, die Moria-Karte erscheint,
   - das Label wechselt zu „Mines of Moria",
   - der Zoom-Stand von Moria wird wiederhergestellt (oder die Karte wird ins Viewport
     gefittet, falls sie zum ersten Mal gesehen wird).

2. **Karte erkunden.**
   Pinch oder Mausrad → `zoomAt(...)` → `scale` verändert sich, `translateX`/`translateY`
   werden so angepasst, dass der Zoom-Ankerpunkt (Mausposition oder Finger-Zentrum) stehen
   bleibt → `applyTransform()` schreibt die `transform`-CSS-Property der Bühne neu →
   beim Loslassen wird die Ansicht in `savedViews[activeRoute]` festgehalten.

3. **Gap-Details öffnen/schließen.**
   Klick auf „View Gaps" → `toggleDetails()` → `display` wechselt von `"none"` zu `"block"` →
   die Detailkarte fadet ein (`@keyframes fadeIn` in CSS). Erneuter Klick → zurück auf
   `"none"`.

### Was die Dynamik bewusst *nicht* leistet

- **Sie verändert das Ranking nicht.** Die drei Rank-Karten sind in Assignment 3 statisch
  vergeben worden und bleiben so. Eine dynamische Neusortierung wäre ein neues Feature.
- **Sie verarbeitet keine externen Daten.** Wetter („Heiter, 21°C") und Location („Middleearth,
  Rivendell") sind reine Anzeigen, kein State. 
- **Sie speichert nichts.** Beim Reload sind `savedViews` und `activeRoute` zurückgesetzt.
- **Sie trifft keine Entscheidung.** Das System zeigt Routen vergleichbar — die Wahl bleibt
  beim Nutzer.

---

## 4. Design Rationale

### Bezug zu Assignment 1: Intent & Value

Das System soll *„Informationen verständlich darstellen,
Unsicherheiten sichtbar machen, sichere Entscheidungen ermöglichen"*. Die Logik unterstützt das:

- *Verständlichkeit* → eine Eingabe pro Mal (z. B. ein Routenklick), mehrere sichtbare
  Konsequenzen, alle nachvollziehbar an `setActiveRoute` aufgehängt.
- *Unsicherheit sichtbar* → die Gap-Analyse ist immer einen Klick entfernt; sie verschwindet
  nicht, sondern lässt sich gezielt aufklappen.
- *Sichere Entscheidungen* → der Nutzer kann hin- und herwechseln, ohne seine Ansicht zu
  verlieren (`savedViews`). Das senkt die kognitive Hürde, mehrere Optionen wirklich zu
  vergleichen.

### Bezug zu Assignment 2: Flow & Wireframe

Nutzer wählt Route → vergleicht sie mit anderen → entscheidet
bewusst. Genau dieser Pfad ist jetzt ausführbar:

- „Route wählen" → funktionierende Buttons mit sichtbarem Aktivzustand.
- „Vergleichen" → freie Bewegung zwischen den Routen ohne Datenverlust durch `savedViews`;
  Ranking und Gap-Analyse zur Orientierung.
- „Entscheidung treffen" → das System gibt keine Empfehlung, sondern stellt nur dar.

### Constraints und Annahmen, die die Logik geformt haben

- **Keine externen Libraries / kein Backend** (lt. Brief). Daher: kein
  Framework, kein `localStorage`, keine API-Aufrufe.
- **Kein Redesign**. Die einzige
  Erweiterung im HTML ist die `toggleDetails()`-Funktion für das bereits angelegte Modal.
- **Eine JS-Datei**. Die gesamte Logik liegt in `routenauswahl.js`.
  Wir haben darauf verzichtet, in mehrere Dateien aufzuteilen (außer die Karten), weil das eine implizite
  Strukturänderung wäre.
- **Closure als „Gehäuse"**. Die IIFE-Struktur macht alle Variablen privat. Das ist die
  einfachste verfügbare Form von Kapselung in JavaScript — keine Klassen, keine
  Module nötig.
- **Annahme:** Wetter („Heiter, 21°C") und Ranking sind in dieser Stufe statische Anzeigen.
  Eine echte Dynamik dieser Werte wäre ein neues Feature und damit außerhalb des aktuellen Scopes.

### Was bewusst (noch) nicht implementiert wurde

- **Dynamisches Ranking**: das Ranking reagiert nicht auf Routenwechsel oder externe
  Bedingungen — das wäre eine neues Feature.
- **Dynamische Wetterdaten**: der Header zeigt einen festen Text.
- **Persistenz**: `savedViews` und `activeRoute` verschwinden beim Reload. `localStorage`
  würde es einfach machen.
- **Verknüpfung von Gap-Inhalten mit der gewählten Route**: aktuell ist die Detailliste
  statisch. Eine route-abhängige Anzeige wäre theoreitsch möglich.
- **Animation des Ranking-Wechsels**: nicht relevant, weil das Ranking statisch ist.

---

## 5. Gelernte Lektionen

- *State first, UI second*: Erst übergelegen welche Daten die App kennen & nutzen muss, dann erst überlegen, wie sie aussieht.
- *Drei Arten von State sauber trennen*: Anwendungs-Zustand (`activeRoute`), Darstellungs-
  Zustand (`scale`, `translateX`, `savedViews`) und Interaktions-Zustand (`isDragging`,
  `pinchStartDistance`) reden über unterschiedliche Dinge und sollten nicht vermischt werden.
- *Eine zentrale Render-Stelle hilft*: `applyTransform()` ist im Code die einzige Funktion,
  die `scale`/`translateX`/`translateY` ans DOM schreibt. Wer State und DOM-Schreibvorgänge
  überall verstreut, baut sich Bugs.
- *Closures sind ausreichend*: Für ein Projekt dieser Größe braucht es keine Klassen, keine
  Module, keine Frameworks. Eine IIFE und ein paar `let`/`const` genügen, um den State
  privat und konsistent zu halten.
- *Constraints helfen*: Das Verbot von Frameworks, Persistenz und neuen Features hat dazu
  gezwungen, die bestehende Logik *richtig zu verstehen*, statt sie zu überdecken. Das ist
  genau der Übergang von Design zu Development, den der Kurs adressiert.

---

🔙 [Zurück zum Red Book](https://oneapptorulethemall-dib.github.io/The-Fellowship-of-the-Code2026/)
