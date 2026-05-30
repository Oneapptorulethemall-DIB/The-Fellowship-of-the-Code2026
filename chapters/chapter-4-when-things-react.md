# Kapitel 4: When Things React

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

In diesem Kapitel wurde aus der bisher **statischen Oberfläche** eine **interaktive** gemacht.
Mit JavaScript reagiert das Interface jetzt auf die Eingaben der Nutzer.

Ziel war es, dass der Fellowship Companion nicht nur Informationen anzeigt, sondern auf
Aktionen reagiert. Routen lassen sich auswählen, Details ein- und ausblenden und
Informationen werden dynamisch sichtbar gemacht.

Damit wird der Entscheidungsprozess nicht mehr nur dargestellt, sondern aktiv erlebbar:

- Routen reagieren auf Klicks
- Details lassen sich öffnen und schließen
- Die Oberfläche gibt Rückmeldung auf jede Aktion

---

## Artefakt

**Datei Artefakt 4:** [Artefakt 4 – TFC: Reaction](../artifacts/artifact-4/artifact-4-reaction.md)

**Bauweise:**

Das Artefakt erweitert das bestehende Interface um Interaktivität. Es umfasst:

- **Klickbare Routen**, die auf die Auswahl der Nutzer reagieren
- **Ein- und ausblendbare Details** (z. B. die Gap-Analyse)
- **Visuelles Feedback**, das zeigt, welche Aktion gerade ausgeführt wurde
- **JavaScript-Logik**, die das Verhalten steuert

**Fokus:**

Den Entscheidungsprozess erlebbar machen — das System soll auf den Nutzer reagieren,
ohne dabei die Klarheit aus den vorherigen Phasen zu verlieren.

---

## KI-Unterstützung

- **Erwartung** — Wir dachten, das Hinzufügen von JavaScript ist schnell erledigt.
- **Realität** — Funktionen mussten getestet und oft angepasst werden, bis sie zuverlässig
  funktionierten. Kleine Fehler (falsche IDs) kosteten viel Zeit, auch trotz AI.
- **Hilfe** — Die KI half beim Schreiben und Erklären der JavaScript-Funktionen sowie
  bei der Fehlersuche.
- **Grenzen** — Manche Vorschläge waren zu komplex oder griffen auf Funktionen zurück,
  die wir nicht brauchten. Wir mussten den Code auf das Wesentliche reduzieren.
- **Eigene Entscheidungen** — Wir haben bewusst entschieden, welche Interaktionen sinnvoll
  sind und welche nur Komplexität hinzufügen.

---

## Gelernte Lektionen

- Interaktivität macht ein Interface lebendig, sollte aber nie vom Wesentlichen ablenken.
- Schon kleine Reaktionen (Klick, Ein-/Ausblenden) verbessern das Nutzererlebnis stark.
- JavaScript-Fehler sind oft kleine Tippfehler — sauberes Arbeiten spart viel Zeit.
- Gutes Feedback an den Nutzer ist genauso wichtig wie die Funktion selbst.
- Weniger ist mehr: Nur die Interaktionen umsetzen, die wirklich helfen.

---

🔙 [Zurück zum Red Book](https://oneapptorulethemall-dib.github.io/The-Fellowship-of-the-Code2026/)
