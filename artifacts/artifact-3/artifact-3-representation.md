# Artefakt 3 – TFC: Representation

> *„Even the smallest person can change the course of the future." – Galadriel*

## Inhaltsverzeichnis

- [Artefakt 3 – TFC: Representation](#artefakt-3--tfc-representation)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [1. System Capability](#1-system-capability)
  - [2. Statische Interface-Implementierung](#2-statische-interface-implementierung)
  - [3. Design Rationale](#3-design-rationale)

---

## 1. System Capability

**Gewählte Fähigkeit:** Routenvergleich und Entscheidungsunterstützung

Diese Fähigkeit ermöglicht es der Gemeinschaft, verschiedene Routenoptionen anhand einiger
Kriterien zu vergleichen: Sicherheit, Dauer, Versorgung, Hobbit-Tauglichkeit und Verlässlichkeit.
Zusätzlich werden die Routen priorisiert (Ranking) und Unsicherheiten durch eine Gap-Analyse
sichtbar gemacht.

### Relevanz für die Fellowship

In dieser Phase der Reise (Aufbruch von Bruchtal) steht die Gemeinschaft vor einer
entscheidenden Wegwahl. Jede Route bringt unterschiedliche Risiken, Dauer und Anforderungen mit sich.

Diese Fähigkeit ist entscheidend, weil sie:

- ein gemeinsames Verständnis aller Optionen schafft
- Trade-offs sichtbar macht (z. B. schnell vs. sicher)
- Entscheidungen strukturiert statt intuitiv unterstützt
- Unsicherheiten offenlegt

Ohne diese Struktur würde die Fellowship Entscheidungen auf Basis von Vermutungen treffen.

---

## 2. Statische Interface-Implementierung

**Interface:** [interface.html](src/interface.html)

Das Interface stellt eine Routenvergleichsansicht innerhalb des Fellowship Companion dar.
Es bildet den Entscheidungsprozess in einer klar strukturierten Form ab.

### Struktur

Die Oberfläche ist in vier zentrale Bereiche gegliedert:

**1. Kontext und Navigation**

Titel, Back-Button sowie Anzeige von Ort und Wetter (Bruchtal).

Zweck: Orientierung und situationsbedingter Kontext.

**2. Routenoptionen**

Übersicht aller verfügbaren Routen mit Namen und vorschlagender Person (z. B. Gandalf, Aragorn).

Zweck: Alle Entscheidungsoptionen sichtbar machen.

**3. Bewertungskriterien**

Die Routen werden anhand folgender Dimensionen bewertet:

- Sicherheit
- Dauer
- Versorgung
- Hobbit-Tauglichkeit
- Verlässlichkeit (Confidence)

Jedes Kriterium wird durch konsistente Kartenstrukturen dargestellt und ermöglicht
einen direkten Vergleich aller Routen.

Zweck: Komplexe Entscheidungen in verständliche Teile zerlegen.

**4. Entscheidungsausgabe**

- Routen-Ranking: Ordnet die Routen nach ihrer Eignung mit kurzer Begründung
- Gap-Analyse: Hebt fehlende oder unsichere Informationen hervor

Zweck: Unterstützung der finalen Entscheidung und Sichtbarmachung von Risiken.

### Designmerkmale

- Klare Trennung der Bereiche
- Konsistente wiederkehrende Komponenten 
- Logische Informationshierarchie
- Fokus auf Lesbarkeit und Verständlichkeit

Das Interface ermöglicht es, sofort zu erkennen:

- Welche Optionen existieren
- Wie sie sich unterscheiden
- Wo Informationslücken bestehen

---

## 3. Design Rationale

### Bezug zu Artefakt 1 (Intent und Value)

Das Interface erfüllt die zentralen Ziele des Fellowship Companion:

- **Entscheidungsunterstützung** — Mehrere Kriterien werden strukturiert und vergleichbar dargestellt
- **Gemeinsames Verständnis** — Alle relevanten Informationen sind zentral sichtbar
- **Transparenz** — Trade-offs zwischen Routen werden klar erkennbar
- **Umgang mit Unsicherheit** — Fehlende Informationen werden durch die Gap-Analyse sichtbar gemacht

### Bezug zu Artefakt 2 (Wireframe)

Die Umsetzung folgt dem Wireframe konsequent:

- Gleiche Abschnittslogik (Routen → Kriterien → Ranking → Gaps)
- Gleiche Gruppierungsstruktur (pro Route und Kriterium)
- Gleiche Hierarchie und Anordnung

Der Wireframe wurde direkt in eine visuelle Struktur übersetzt, ohne die
zugrunde liegende Logik zu verändern.

### Bewusst nicht umgesetzt

Im Sinne der Aufgabenstellung wurden folgende Aspekte bewusst ausgelassen:

- Dynamische Logik (z. B. automatische Ranking-Berechnung)
- Interaktive Funktionen (z. B. Filter, Gewichtung, Umsortierung)
- Datenanbindung (z. B. APIs, Live-Daten)
- Ausgereiftes visuelles Design oder Designsystem

Der Fokus liegt bewusst auf **Struktur und Repräsentation**, nicht auf Funktionalität.

### Annahmen und Einschränkungen

**Annahmen:**

- Nutzer müssen mehrere Routen gleichzeitig vergleichen können
- Entscheidungen basieren auf klar definierten Kriterien
- Alle Beteiligten greifen auf dieselben Informationen zu

**Einschränkungen:**

- Statische Umsetzung (HTML und CSS)
- Keine Echtzeitdaten
- Keine komplexe Interaktion
- Begrenzter Umfang zugunsten von Klarheit

### Designfokus

Das Design folgt bewusst diesen Prinzipien:

- Klarheit vor Vollständigkeit
- Struktur vor visueller Komplexität
- Verständlichkeit vor Interaktivität

---

🔙 [Zurück zum Red Book](https://oneapptorulethemall-dib.github.io/The-Fellowship-of-the-Code2026/)
