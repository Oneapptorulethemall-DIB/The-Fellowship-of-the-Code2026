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

Auf einer langen und gefährlichen Reise sind die Vorräte überlebenswichtig. Wer den
Überblick verliert, riskiert, ohne Wasser oder Nahrung dazustehen. Die Vorratsverwaltung
macht den aktuellen Bestand jederzeit sichtbar und warnt früh, bevor etwas knapp wird.

**Bedeutung für die Fellowship**

Die Gemeinschaft muss ihre begrenzten Mittel sorgfältig einteilen. Diese Fähigkeit gibt
ihr ein einfaches Werkzeug an die Hand, um Engpässe rechtzeitig zu erkennen und
vorausschauend zu handeln.

---

## 2. Systemablauf (Flow)

**Flowchart:** [flowchart-system-mermaid.mmd](src/flowchart-system-mermaid.mmd)

Der Ablauf zeigt, wie die Vorratsverwaltung Schritt für Schritt funktioniert:

- Der Nutzer öffnet den Supplies Tracker.
- Er wählt einen Posten und erhöht oder verringert dessen Menge.
- Der neue Bestand wird im State gespeichert.
- Liegt der Bestand unter dem Minimum, wird eine Warnung angezeigt.
- Das Diagramm wird aktualisiert und zeigt die Mengen je Einheit.

---

## 3. System-Wireframe

**Wireframe:** [wireframe-system.png](src/wireframe-system.jpeg)

Der Wireframe zeigt den Aufbau der Vorratsverwaltung:

- **Kopfzeile** mit Titel und Zurück-Button
- **Vorratsliste** mit je einem +/- Button pro Posten
- **Warnhinweis**, der bei niedrigem Bestand erscheint
- **Diagramm-Bereich**, der die Mengen visuell darstellt

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
- Sie **verbindet sich mit einer bestehenden Fähigkeit**: Das Diagramm zeigt die
  Versorgungslage, die für den Routenvergleich relevant ist. (Aber noch nicht verküpft ist)
- Bei jeder Änderung des State wird das Diagramm über `updateChart()` automatisch aktualisiert.

---

## 6. Design-Begründung (Rationale)

**Bezug zur ursprünglichen Absicht (Phase 1):**

Der Fellowship Companion sollte Entscheidungen unter Unsicherheit unterstützen. Die
Vorratsverwaltung erweitert genau das: Sie macht die Versorgungslage transparent und
verbindet sie mit der Wegentscheidung.

**Warum die Erweiterung Sinn ergibt:**

Chart.js verwandelt reine Zahlen in ein sofort verständliches Bild — passend zum
Grundprinzip aller bisherigen Phasen: Struktur und Sichtbarkeit vor Komplexität.

**Was bewusst nicht gebaut wurde:**

- Keine automatische Verknüpfung, die das Ranking direkt ändert (die Verbindung bleibt konzeptionell).
- Keine Mehrbenutzer-Synchronisation.
- Kein Verlauf oder Verbrauchsprognose.

Der Fokus liegt auf einer **klaren, erklärbaren Integration**, nicht auf Umfang.

---

## 7. Reflexion über die Systementwicklung

Seit Phase 1 hat sich unser Verständnis deutlich verändert.

- **Am Anfang** dachten wir in einzelnen Funktionen. Heute achten wir stärker darauf, dass
  jede Funktion klar und nachvollziehbar bleibt.
- **Der Umfang** wurde bewusst kleiner und klarer. Wir haben gelernt, dass weglassen oft
  wertvoller ist als hinzufügen - vor allem beim Code!
- **Die Entscheidungen** wurden bewusster: Jede Funktion muss sich begründen lassen.
- **Die Erweiterung** hat gezeigt, dass eine durchdachte externe Bibliothek einer Funktion
  echten Mehrwert geben kann, ohne sie zu verkomplizieren.

Aus einer Sammlung von Ideen ist so ein klar umgesetztes, verständliches Werkzeug geworden.
Wünschenswert wäre eine komplette Integration und das Zusammenspiel der beiden Funktionen in einer App. 

---

🔙 [Zurück zum Red Book](https://oneapptorulethemall-dib.github.io/The-Fellowship-of-the-Code2026/)
