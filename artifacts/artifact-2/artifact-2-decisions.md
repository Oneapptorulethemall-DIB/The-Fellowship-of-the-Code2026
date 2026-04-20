# Artefakt 2 – Anwendungsdesign (Entscheidungen)

> *„All we have to decide is what to do with the time that is given us." – Gandalf*

## Inhaltsverzeichnis

- [Artefakt 2 – Anwendungsdesign (Entscheidungen)](#artefakt-2--anwendungsdesign-entscheidungen)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [1. Ausgewählte Systemfunktion](#1-ausgewählte-systemfunktion)
  - [2. Interaktionsfluss (Flow)](#2-interaktionsfluss-flow)
  - [3. Wireframe](#3-wireframe)
  - [4. Design-Begründung (Rationale)](#4-design-begründung-rationale)

---

## 1. Ausgewählte Systemfunktion

**C2 — Multikriterieller Routenvergleich**

Das System unterstützt die Entscheidung zwischen alternativen Reiserouten, indem es mehrere
Optionen parallel darstellt und anhand standardisierter Kriterien vergleichbar macht:

- geschätzte Dauer
- Ressourcenverbrauch
- physische Belastung (insb. für Hobbits)
- Risiko durch feindliche Präsenz
- Sicherheit und Verlässlichkeit der Informationen

Ziel ist es, konfliktbehaftete Entscheidungen explizit darzustellen, anstatt sie implizit
oder rein erfahrungsbasiert zu treffen.

### Warum diese Funktion?

Die zentrale Herausforderung besteht darin, dass keine Route alle Kriterien gleichzeitig erfüllt:

- sichere Routen sind langsamer
- schnelle Routen sind riskanter
- hobbit-taugliche Wege sind strategisch eingeschränkt

Der Routenvergleich ist daher der zentrale Entscheidungspunkt des Systems.

Andere Funktionen liefern:

- Daten (C1 — Wissensregister)
- Unsicherheiten (Lückenerkennung)
- Alternativen (Fallback-Logik)

C2 integriert diese Informationen und stellt sie in einen konkreten Entscheidungskontext
mit Zielkonflikten.

Ohne diese Funktion:

- bleibt Wissen fragmentiert
- werden Unsicherheiten nicht in Entscheidungen einbezogen
- entstehen reaktive statt fundierte Entscheidungen

C2 bildet damit die Schnittstelle zwischen Information und Handlung.

### Bedeutung in der aktuellen Situation

Die Gefährten müssen zwischen folgenden Routen wählen:

- Caradhras
- Moria
- Pforte von Rohan

Das Wissen ist verteilt:

- Gandalf → Moria
- Gimli → Zwergenreiche
- Aragorn → Wildnis und Feinde

Zusätzlich bestehen Unsicherheiten:

- Zustand Morias unbekannt
- Wetterbedingungen am Pass unklar
- politische Lage in Rohan unsicher

Die Entscheidung ist zeitkritisch: Nach Caradhras ist ein Wechsel nur eingeschränkt möglich.

Ohne strukturierten Vergleich entsteht stressgetriebene Entscheidungsfindung ohne
transparente Abwägung.

---

## 2. Interaktionsfluss (Flow)

Der Flow beschreibt die Nutzung der Vergleichsfunktion als iterativen Entscheidungsprozess,
nicht als lineare Abfolge.

### Ablauf

**1. Einstieg**

Benutzer öffnet „Routenvergleich".

**2. Vorabprüfung**

System prüft verfügbare Routen:

- weniger als 2 Routen → Empty State → Weiterleitung zum Wissensregister
- 2 oder mehr Routen → Vergleich wird geladen

**3. Initiale Systemanalyse**

- System aggregiert Routendaten
- System markiert Informationslücken

**4. Iterative Vergleichsschleife**

Der Benutzer kann jederzeit zwischen folgenden Aktionen wechseln:

- **a) Gewichtung anpassen** — Benutzer verändert Prioritäten, System berechnet Ranking neu
- **b) Routendetails anzeigen** — Benutzer wählt Route, System zeigt vollständige Informationen inkl. Quellen
- **c) Informationslücken prüfen** — Benutzer öffnet Gap-Details, System zeigt Unsicherheiten und Herkunft
- **d) Route auswählen** — Benutzer startet Auswahlprozess, wählt eine Route

Edge Case: Filter oder Gewichtung führen zu keiner sinnvollen Option
→ System fordert zur Anpassung auf (kein Dead-End)

**5. Entscheidungsbestätigung**

System zeigt gewählte Route und aktuelles Ranking. Benutzer entscheidet:

- Nein → zurück zur Vergleichsschleife
- Ja → Entscheidung wird bestätigt

**6. Systemreaktion**

System speichert: Route, Zeitstempel, Entscheider, aktive Gewichtungen und bekannte
Informationslücken.

**7. Fallback-Definition (optional)**

System fragt nach alternativer Route:

- Ja → Auswahl und Trigger-Bedingung
- Nein → Überspringen

**8. Abschluss**

Rückkehr zur Übersicht. Entscheidung ist dokumentiert und nachvollziehbar.

### Charakter des Flows

- Iterativ statt linear
- Explizite Entscheidungspunkte
- System unterstützt, entscheidet aber nicht
- Unsicherheit ist integraler Bestandteil

---

## 3. Wireframe

Der Wireframe zeigt eine mobile Vergleichsansicht, optimiert für schnelle, wiederholte
Entscheidungszyklen im Feld.

Die Struktur folgt direkt dem Flow: Vergleich → Anpassung → Neubewertung → Entscheidung

### Struktur und Begründung

**1. Navigationsleiste (oben)**
Kontext und Rücknavigation.

**2. Routen-Tabs**
Schneller Wechsel zwischen Optionen, Quellen sichtbar.
Häufige Interaktion → oben positioniert.

**3. Gewichtungsleiste**
Direkter Zugriff auf Prioritäten.
Zentraler Entscheidungshebel → ohne Scrollen erreichbar.

**4. Vergleichskarten (Kernbereich)**
Gruppiert nach Kriterien, jede Route direkt vergleichbar.
Unterstützt visuelle Abwägung und reduziert kognitive Last durch Struktur.
Entspricht der zentralen Flow-Schleife.

**5. Ranking und Informationslücken**
Aggregierte Bewertung (#1–#3), kurze Begründungen, Gap-Banner mit Interaktion.
Verdichtet Informationen zur Entscheidung.

Trade-off: Vereinfachung vs. Detailtiefe → durch Detailansicht ausgeglichen.

**6. Fixierte Aktionsleiste**
Primär: „Select route" — Sekundär: Details / Information.
Entscheidung jederzeit möglich, optimiert für Einhandbedienung.
Entspricht Flow-Übergang zur Auswahl.

### Designprinzipien

- Vergleich vor Navigation
- Sichtbarkeit von Unsicherheit
- Iteration statt linearer Nutzung
- Struktur statt Reduktion

### Bewusste Einschränkungen

- Max. drei Routen gleichzeitig
- Keine Kartenansicht
- Keine Datenbearbeitung

Fokus: Entscheidungsphase.

---

## 4. Design-Begründung (Rationale)

### Bezug zu Aufgabe 1

Das Design adressiert zentrale Probleme aus Artefakt 1:

- Fragmentiertes Wissen → Konsolidierung
- Unsicherheit → Transparenz
- Reaktive Entscheidungen → strukturierte Abwägung

### Trade-offs

**Keine Kartenansicht**

- Verlust: räumliches Verständnis
- Gewinn: Fokus und Geschwindigkeit

**Keine automatische Empfehlung**

- Verlust: weniger Unterstützung
- Gewinn: keine Scheinsicherheit

### Scope-Entscheidung

Der Fokus liegt bewusst auf einem klar abgegrenzten Entscheidungsmoment.

Nicht enthalten:

- Datenerfassung
- langfristige Planung
- Navigation

### Annahmen

- Nutzung unter realen Bedingungen
- Einhandbedienung notwendig
- eingeschränkte Aufmerksamkeit
- Offline-Verfügbarkeit erforderlich

---

🔙 [Zurück zum Red Book](https://oneapptorulethemall-dib.github.io/The-Fellowship-of-the-Code2026/)
