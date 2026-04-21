# Kapitel 2: Die Wegentscheidung

> *„All we have to decide is what to do with the time that is given us." – Gandalf*

## Inhaltsverzeichnis

- [Kapitel 2: Die Wegentscheidung](#kapitel-2-die-wegentscheidung)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [Zusammenfassung](#zusammenfassung)
  - [Artefakt](#artefakt)
  - [KI-Unterstützung](#ki-unterstützung)
  - [Gelernte Lektionen](#gelernte-lektionen)

---

## Zusammenfassung

In diesem Kapitel wurde die Systemfähigkeit **C2 — Kriterienbasierter Routenvergleich** als konkretes Interaktionsdesign ausgearbeitet.

Die Entscheidung zwischen Caradhras, Moria und Rohan ist nicht durch fehlende Optionen schwierig, sondern durch verteiltes und teilweise veraltetes Wissen.

Das Design adressiert genau dieses Problem:

Es zwingt alle Routen in ein gemeinsames Vergleichsformat (vier Kriterien mit Quellen und Datenalter) und macht Unsicherheit sichtbar.
Es erlaubt dem Nutzer, die Entscheidung aktiv umzustrukturieren (durch Priorisierung eines Kriteriums).

Statt eine Empfehlung zu geben, zeigt das System warum eine Route vorne liegt — und macht damit die Entscheidungslogik überprüfbar.
---

## Artefakt

**Datei Artefakt 2:** [Artefakt 2 – Anwendungsdesign (Entscheidungen)](../artifacts/artifact-2/artifact-2-decisions.md)

**Bauweise:**
Wir haben eine Systemfunktion (C2 — Kriterienbasierter Routenvergleich) ausgewählt und deren Ablauf als iterativen Flow beschrieben. 
Anschließend wurde ein Wireframe für eine mobile Ansicht erstellt sowie die Design-Entscheidungen begründet.

**Fokus:**
Das Ziel war es, die Lücke zwischen Intention und Interface zu schließen — also zu zeigen, wie eine Funktion konkret für den Nutzer aussieht und funktioniert.

---

## KI-Unterstützung

- **Erwartung** — Wir dachten, der Flow und das Wireframe lassen sich schnell generieren.
- **Realität** — Die KI lieferte schlechte Strukturvorschläge für den Flowchart (Überladen, verwirrende Prozesswege, und die inhaltlichen Entscheidungen (welche Kriterien, welche Trade-offs) mussten wir selbst treffen.
- **Hilfe** — Besonders nützlich war die KI beim Formulieren der Design-Begründung.
- **Entscheidung** — Wir haben bewusst auf eine automatische Empfehlung verzichtet — das System soll unterstützen, nicht entscheiden. Die KI hatte das anders vorgeschlagen.
- **Limitierungen** — Der Mermaid-Code musste mehrfach angepasst werden, da die Darstellung nicht dem gewünschten Flow entsprach.

---

## Gelernte Lektionen

- Unser Flowchart bildet aktuell vor allem den Idealfall ab. Wiederholte Interaktionen (z. B. mehrfaches Repriorisieren) sind zwar möglich, aber im Diagramm nicht klar dargestellt.
- Der Wechsel von abstrakter Idee zu Wireframe hat gezeigt, dass „Vergleich“ auf mobilen Geräten schwer umzusetzen ist — insbesondere bei mehreren Kriterien gleichzeitig.
- Bewusste Einschränkungen (z. B. max. 3 Routen) sind keine Schwäche, sondern Designentscheidungen.
- KI kann Struktur einigermaßen definieren, aber Prioritäten und Trade-offs mussten wir selbst setzen.

---

🔙 [Zurück zum Red Book](https://oneapptorulethemall-dib.github.io/The-Fellowship-of-the-Code2026/)
