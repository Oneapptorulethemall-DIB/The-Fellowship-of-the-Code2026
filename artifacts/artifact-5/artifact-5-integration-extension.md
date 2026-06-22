# Artefakt 5 – Integration & Erweiterung

> *„It's the job that's never started as takes longest to finish." – Sam Gamgee*

## Inhaltsverzeichnis

- [Artefakt 5 – Integration & Erweiterung](#artefakt-5--integration--erweiterung)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [1. Ausgewählte Systemfähigkeit](#1-ausgewählte-systemfähigkeit)
  - [2. Systemablauf (Flow)](#2-systemablauf-flow)
  - [3. System-Wireframe](#3-system-wireframe)
  - [4. Implementierungs-Snapshot](#4-implementierungs-snapshot)
  - [5. Sinnvolle Erweiterung](#5-sinnvolle-erweiterung)
  - [6. Design-Begründung (Rationale)](#6-design-begründung-rationale)
  - [7. Reflexion über die Systementwicklung](#7-reflexion-über-die-systementwicklung)

---

## 1. Ausgewählte Systemfähigkeit

**Vorratsverwaltung (Supplies Tracking)**

Diese Fähigkeit erlaubt es der Gemeinschaft, ihre Vorräte zu verwalten und im Blick zu
behalten: Lembas, Kartoffeln, Wasser und Pfeifenkraut. Jeder Posten kann erhöht oder
verringert werden, und bei zu geringem Bestand erscheint eine Warnung.

**Warum diese Fähigkeit?**

Die Vorratsverwaltung schließt direkt an den Routenvergleich aus den vorherigen Phasen an.
Dort war **Versorgung (Supply)** bereits eines der zentralen Bewertungskriterien. Bisher
war dieser Wert aber nur eine feste Angabe — jetzt liefert die Vorratsverwaltung die echten,
aktuellen Bestandsdaten dazu.

**Bedeutung für die Fellowship**

Eine Route ist nur dann sinnvoll, wenn die Vorräte für die Reisedauer reichen. Eine Strecke
über 10 Tage nützt nichts, wenn das Wasser für 3 Tage reicht. Die Vorratsverwaltung macht
diesen Zusammenhang sichtbar und verbindet so Versorgung und Wegentscheidung.

---

## 2. Systemablauf (Flow)

**Flowchart:** [flowchart-system-mermaid.mmd](.src/flowchart-system-mermaid.mmd)

Der Systemablauf zeigt, wie die Vorratsverwaltung mit dem bestehenden System zusammenhängt
— nicht den detaillierten Klick-Ablauf, sondern die Verbindungen auf Systemebene.

**Einstiegspunkt:**

Vom Hauptmenü des Fellowship Companion gelangt der Nutzer entweder zum **Routenvergleich**
(bestehend) oder zur **Vorratsverwaltung** (neu).

**Übergänge und Abhängigkeiten:**

- Die Vorratsverwaltung verwaltet den aktuellen Bestand aller Posten.
- Sinkt ein Bestand unter das Minimum, wird eine Warnung ausgelöst.
- Diese Bestandsdaten fließen in das **Supply-Kriterium** des Routenvergleichs ein.
- So beeinflusst der Vorrat indirekt, welche Route realistisch machbar ist.

Die neue Fähigkeit ist damit kein isoliertes Werkzeug, sondern eine Datenquelle für eine
bereits bestehende Funktion.

---

## 3. System-Wireframe

**Wireframe:** [wireframe-system.png](./artifacts/artifact-5/src/wireframe-system.png)

Der System-Wireframe zeigt, wo die Vorratsverwaltung im Gesamtsystem angesiedelt ist und
wie sich ein Nutzer zwischen den Teilen bewegt:

- **Hauptmenü** als zentraler Ausgangspunkt
- **Routenvergleich** als bestehende Fähigkeit
- **Vorratsverwaltung** als neue Fähigkeit, erreichbar über das Menü
- Eine sichtbare Verbindung zwischen Vorräten und dem Supply-Kriterium der Routen

---

## 4. Implementierungs-Snapshot

Die Umsetzung folgt demselben Muster wie in den vorherigen Phasen: HTML-Struktur,
CSS im bekannten Design (dunkles Schiefergrau mit Goldakzenten) und minimale JS-Logik.

**Dateien:**

- **Struktur:** [supplies-tracker.html](src/supplies-tracker.html)
- **Styling:** [supplies-tracker.css](src/supplies-tracker.css)
- **Logik:** [supplies-tracker.js](src/supplies-tracker.js)

**Kernfunktionen:**

- Ein **State-Objekt** speichert für jeden Posten Anzahl, Minimum, Einheit und Farbe.
- Über **+/- Buttons** wird der Bestand verändert (`incrementSupply`).
- Ein **Event-Listener** liegt auf der gesamten Liste statt auf einzelnen Buttons —
  das spart Ressourcen und ist leichter zu warten (Event Delegation).
- Bei zu geringem Bestand erscheint eine **Low-Stock-Warnung**.

Vollständigkeit war nicht das Ziel — es geht um die Wiederholung des bekannten Musters,
nicht um Feinschliff.

---

## 5. Sinnvolle Erweiterung

**Erweiterung: Chart.js (externe Bibliothek)**

Als Erweiterung wurde die Bibliothek **Chart.js** eingebunden. Sie stellt den aktuellen
Lagerbestand als **Balkendiagramm** dar.

**Warum diese Erweiterung sinnvoll ist:**

- Sie beeinflusst **Bedeutung und Verhalten**, nicht nur das Aussehen: Der Bestand wird
  sofort visuell erfassbar, und Engpässe fallen direkt ins Auge.
- Sie **verbindet sich mit einer bestehenden Fähigkeit**: Das Diagramm zeigt genau die
  Versorgungslage, die für den Routenvergleich relevant ist.
- Bei jeder Änderung des State wird das Diagramm über `updateChart()` automatisch aktualisiert.

Damit berührt das System zum ersten Mal etwas außerhalb seiner selbst (eine externe
Bibliothek) — und gewinnt dadurch echten Mehrwert.

---

## 6. Design-Begründung (Rationale)

**Bezug zur ursprünglichen Absicht (Phase 1):**

Der Fellowship Companion sollte Entscheidungen unter Unsicherheit unterstützen. Die
Vorratsverwaltung erweitert genau das: Sie macht die Versorgungslage transparent und
verbindet sie mit der Wegentscheidung.

**Wie die Teile zusammenpassen:**

- Routenvergleich = welche Wege gibt es und wie unterscheiden sie sich?
- Vorratsverwaltung = reichen unsere Mittel für diese Wege?
- Beide teilen das Kriterium **Versorgung** und greifen so ineinander.

**Warum die Erweiterung Sinn ergibt:**

Chart.js verwandelt reine Zahlen in ein sofort verständliches Bild — passend zum
Grundprinzip aller bisherigen Phasen: Struktur und Sichtbarkeit vor Komplexität.

**Was bewusst nicht gebaut wurde:**

- Keine Datenbank — Vorräte werden nicht dauerhaft gespeichert (Reset beim Neuladen).
- Keine automatische Verknüpfung, die das Ranking direkt ändert (die Verbindung bleibt konzeptionell).
- Keine Mehrbenutzer-Synchronisation.
- Kein Verlauf oder Verbrauchsprognose.

Der Fokus liegt auf einer **klaren, erklärbaren Integration**, nicht auf Umfang.

---

## 7. Reflexion über die Systementwicklung

Seit Phase 1 hat sich unser Verständnis deutlich verändert.

- **Am Anfang** dachten wir in einzelnen Funktionen. Heute sehen wir das System als
  Zusammenspiel von Teilen, die sich gegenseitig beeinflussen.
- **Der Umfang** wurde bewusst kleiner und klarer. Wir haben gelernt, dass weglassen oft
  wertvoller ist als hinzufügen.
- **Die Entscheidungen** wurden bewusster: Jede Funktion muss sich begründen lassen und
  zum Rest passen.
- **Die Erweiterung** hat gezeigt, dass ein System durch eine durchdachte Verbindung nach
  außen mehr gewinnt als durch viele neue Einzelfunktionen.

Aus einer Sammlung von Ideen ist so ein zusammenhängendes, nachvollziehbares System
geworden.

---

🔙 [Zurück zum Red Book](https://oneapptorulethemall-dib.github.io/The-Fellowship-of-the-Code2026/)
