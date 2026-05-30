# Kapitel 4: Wenn "Dinge" reagieren

> *„Even the smallest person can change the course of the future." – Galadriel*

## Inhaltsverzeichnis

- [Kapitel 4: When Things React](#kapitel-4-when-things-react)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [Zusammenfassung](#zusammenfassung)
  - [Artefakt](#artefakt)
  - [KI-Unterstützung](#ki-unterstützung)
  - [Gelernte Lektionen](#gelernte-lektionen)

---

## Zusammenfassung

In diesem Kapitel bekam der Fellowship Companion zum ersten Mal eine **eigene Logik** und
einen **Zustand (State)**. Die Oberfläche zeigt nicht mehr nur feste Daten an, sondern
reagiert auf Eingaben und berechnet ihre Inhalte neu.

Der Kern dieser Phase ist der **State**: Das System merkt sich, welche Prioritäten der
Nutzer gesetzt hat. Ändert sich ein Zustand,
ändert sich auch das, was die App anzeigt.

Daraus ergeben sich zwei zentrale Funktionen:

- **Ranking-Anzeige** — Nach Auswahl eines Weges zeigt das System das Ranking der Routen an und macht die Reihenfolge nachvollziehbar.
- **Dynamische Gap-Analyse** — Informationslücken werden sichtbar gemacht und je nach Auswahl angezeigt.

Damit wird der Entscheidungsprozess nicht nur dargestellt, sondern aktiv berechnet.

---

## Artefakt

**Datei Artefakt 4:** [Artefakt 4 – TFC: Logic & State](../artifacts/artifact-4/artifact-4-logic-state.md)

**Bauweise:**

Das Artefakt erweitert das Interface um Logik und einen veränderbaren Zustand. Es umfasst:

- **State-Verwaltung** — Das System speichert die aktuelle Position und Zoomstufe der Karte.
- **Zustands-Persistenz** — Wechselt der Nutzer die Route (z. B. von Caradhras auf Moria), wird der jeweilige Kartenstatus gespeichert. Kehrt er zur alten Route zurück, wird der zuletzt angezeigte Ausschnitt wiederhergestellt.
- **Dynamische Gap-Analyse** — Die Anzeige der Informationslücken reagiert auf den aktuellen Zustand und zeigt, wo Unsicherheiten die Entscheidung beeinflussen.
- **JavaScript-Logik**, die diese Zustände verwaltet und steuert.

**Fokus:**

Aus einer statischen Darstellung ein System machen, das **denkt und reagiert** — der
Companion soll Entscheidungen aktiv unterstützen, nicht nur abbilden.

---

## KI-Unterstützung

- **Erwartung** — Wir dachten, die Logik ist schnell geschrieben.
- **Realität** — Den Zustand sauber zu verwalten und die Neuberechnung korrekt auszulösen,
  war nicht einfach. Kleine Fehler führten oft zu falschen Ergebnissen.
- **Hilfe** — Die KI half beim Aufbau der State-Logik, beim Erklären und bei der Fehlersuche im JavaScript.
- **Grenzen** — Manche Vorschläge waren zu komplex (z. B. überladene State-Konzepte).
  Wir mussten die Logik bewusst einfach halten.
- **Eigene Entscheidungen** — Wir haben festgelegt, wie die Prioritäten das Ranking
  beeinflussen und welche Gaps in welchem Zustand relevant sind.

---

## Gelernte Lektionen

- Ein State ist das Herz einer reaktiven App — er entscheidet, was angezeigt wird.
- Wenn sich der Zustand ändert, muss die Oberfläche zuverlässig reagieren (Neuberechnung/Speicherung).
- Die dynamische Gap-Analyse zeigt: Unsicherheit ist nicht statisch, sondern hängt von der Entscheidung ab.
- Einfache, klare Logik ist besser als komplizierte Berechnungen, die niemand mehr versteht.

---

🔙 [Zurück zum Red Book](https://oneapptorulethemall-dib.github.io/The-Fellowship-of-the-Code2026/)
