# Kapitel 5: The Tale Continues

> *„The Road goes ever on and on." – Bilbo Baggins*

## Inhaltsverzeichnis

- [Kapitel 5: The Tale Continues](#kapitel-5-the-tale-continues)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [Zusammenfassung](#zusammenfassung)
  - [Artefakt](#artefakt)
  - [KI-Unterstützung](#ki-unterstützung)
  - [Gelernte Lektionen](#gelernte-lektionen)

---

## Zusammenfassung

In diesem letzten Kapitel wurde der Fellowship Companion um eine neue Fähigkeit erweitert:
die **Vorratsverwaltung (Supplies Tracker)**.

Die Gemeinschaft kann ihre wichtigsten Vorräte — Lembas, Kartoffeln, Wasser und Pfeifenkraut
— verwalten, erhöhen, verringern und bei niedrigem Bestand frühzeitig gewarnt werden. Als
Erweiterung wurde die externe Bibliothek **Chart.js** eingebunden, die den Bestand als
Balkendiagramm sichtbar macht.

Damit ist die erste Iteration des Projekts abgeschlossen: aus ersten Ideen ist ein klar
umgesetztes, verständliches Werkzeug geworden — und die Reise könnte an dieser Stelle
weitergehen.

---

## Artefakt

**Datei Artefakt 5:** [Artefakt 5 – Integration & Erweiterung](../artifacts/artifact-5/artifact-5-integration-extension.md)

**Bauweise:**

Das Artefakt setzt die Vorratsverwaltung im bekannten Muster um. Es umfasst:

- Eine **Vorratsliste** mit +/- Buttons für jeden Posten
- Ein **State-Objekt**, das Anzahl, Minimum und Einheit speichert
- Eine **Low-Stock-Warnung**, die bei zu geringem Bestand erscheint
- Ein **Chart.js-Balkendiagramm**, das sich bei jeder Änderung automatisch aktualisiert

**Fokus:**

Eine neue, in sich klare Fähigkeit umsetzen und sie durch eine sinnvolle externe Bibliothek
erweitern — ohne unnötige Komplexität.

---

## KI-Unterstützung

- **Erwartung** — Wir dachten, eine neue Funktion plus Diagramm ist schnell erledigt.
- **Realität** — Vor allem die saubere State-Logik und die Einbindung von Chart.js
  brauchten mehrere Anläufe und Tests.
- **Hilfe** — Die KI half beim Aufbau des State-Objekts, bei der Chart.js-Integration und
  beim Aufspüren von Fehlern im JavaScript.
- **Grenzen** — Manche Vorschläge waren zu komplex oder griffen Funktionen vor, die wir
  bewusst weglassen wollten.
- **Eigene Entscheidungen** — Wir haben den Umfang klein gehalten und nur das umgesetzt,
  was die Fähigkeit wirklich braucht.

---

## Gelernte Lektionen

- Eine externe Bibliothek kann einer Funktion echten Mehrwert geben, wenn sie zum Zweck passt.
- Ein sauberer State ist die Grundlage dafür, dass Anzeige und Daten zusammenpassen.
- Sichtbarkeit (z. B. ein Diagramm) macht Informationen sofort verständlicher als reine Zahlen.
- Rückblickend zählt nicht der Umfang, sondern Klarheit, Konsistenz und nachvollziehbare Entscheidungen.
- Ein Projekt ist nie wirklich „fertig" — aber eine erste runde Iteration ist ein guter Meilenstein.

---

🔙 [Zurück zum Red Book](https://oneapptorulethemall-dib.github.io/The-Fellowship-of-the-Code2026/)
