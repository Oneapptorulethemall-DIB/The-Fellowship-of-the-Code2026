# Kapitel 3: Mach es sichtbar

> *„The world is not in your books and maps. It's out there." – Gandalf*

## Inhaltsverzeichnis

- [Kapitel 3: Making It Visible](#kapitel-3-making-it-visible)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [Zusammenfassung](#zusammenfassung)
  - [Artefakt](#artefakt)
  - [KI-Unterstützung](#ki-unterstützung)
  - [Gelernte Lektionen](#gelernte-lektionen)

---

## Zusammenfassung

In diesem Kapitel wurde eine **statische Benutzeroberfläche** für den Fellowship Companion
umgesetzt, mit Fokus auf den Routenvergleich.

Ziel war es, die Konzepte und Wireframe in eine konkrete
Struktur zu bringen. Das Ergebnis ist ein Interface, das es der Fellowship ermöglicht,
verschiedene Routen anhand verschiedener Kriterien zu vergleichen:

- Sicherheit
- Dauer
- Versorgung
- Unsicherheit (Gap-Analyse)

Die Oberfläche macht die Empfehlung nachvollziehbar, indem sie Informationen in
klar getrennte Bereiche gliedert: Routen, Bewertungskriterien, Ranking und Gap-Analyse.

---

## Artefakt

**Datei Artefakt 3:** [Artefakt 3 – TFC: Representation](../artifacts/artifact-3/artifact-3-representation.md)

**Bauweise:**

Das Artefakt stellt eine statische Umsetzung des Fellowship Companion dar. Es umfasst:

- Eine **Routenübersicht**, die alle verfügbaren Optionen und deren Vorschlagende zeigt
- Eine **kriterienbasierte Bewertung** für einen direkten Vergleich hinsichtlich Sicherheit,
  Dauer, Versorgung, Hobbit-Tauglichkeit und Verlässlichkeit
- Einen **Ranking-Bereich**, der die Ergebnisse zusammenfasst
- Eine **Gap-Analyse**, die fehlende oder unsichere Informationen sichtbar macht

**Fokus:**

Komplexe Entscheidungen verständlich machen, indem relevante Informationen klar strukturiert dargestellt werden.

---

## KI-Unterstützung

- **Erwartung** — Wir dachten, die Umsetzung des Wireframes in HTML/CSS ist straightforward - "wir wollen" und die KI macht hat leider nicht ganz funktioniert.
- **Realität** — Viele kleine Entscheidungen (Abstände, Hierarchie, Struktur) mussten bewusst
  getroffen werden — KI allein reicht dafür nicht immer aus. 
- **Hilfe** — Unterstützung bei der Strukturierung des Interfaces, der Übersetzung des
  Wireframes in eine konsistente Darstellung.
- **Grenzen** — Vorschläge enthielten teilweise unnötige Komplexität (z. B. Interaktionen,
  die für diese Aufgabe nicht erforderlich sind). Ergebnisse mussten geprüft und angepasst werden.
- **Eigene Entscheidungen** — Reduktion auf das Wesentliche, Fokus auf Klarheit,
  Sicherstellung dass alle Entscheidungen nachvollziehbar begründet sind.

---

## Gelernte Lektionen

- Struktur ist wichtiger als visuelle Komplexität.
- Ein Interface sollte die Empfehlung abbilden, nicht nur Daten anzeigen.
- Unsicherheiten sichtbar zu machen ist genauso wichtig wie bekannte Informationen darzustellen.
- Die Umsetzung eines Wireframes erfordert Nachdenken über Hierarchie und Gruppierung.
- Nicht jede Idee muss umgesetzt werden — Einfachheit erhöht die Klarheit.
- Wir haben noch so viele Ideen, das wurde gesammelt um wird im nächsten Schritt umgesetzt. 

---

🔙 [Zurück zum Red Book](https://oneapptorulethemall-dib.github.io/The-Fellowship-of-the-Code2026/)
