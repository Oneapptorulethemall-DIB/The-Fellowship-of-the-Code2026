# Extending the Fellowship – Side Quest

Diese Side Quest erkundet, was jenseits klassischer Programmierung liegt: 
Software mit sehr wenig oder ganz ohne Code. 
Entstanden sind zwei kleine, von *Der Herr der Ringe* inspirierte Systeme – eine Automatisierung und ein Low-Code-Spiel.

## 1. Automatisierung – Die Gemeinschaft handelt von selbst

- **Plattform:** Microsoft Power Automate
- **Name des Flows:** Fellowship Quest Log
- **Formular:** [Das Rote Buch von Westmark – Questenverzeichnis][forms]

### Kurzbeschreibung

Diese Automatisierung verwandelt Einträge aus einem Microsoft-Forms-Formular
automatisch in stilvoll gestaltete, Herr-der-Ringe-thematisierte
E-Mail-Benachrichtigungen. Sobald eine Antwort im „Quest Log"-Formular
abgeschickt wird, ruft der Flow die Antwortdetails ab und versendet eine
formatierte E-Mail an die relevanten Empfänger. Nach dem Einrichten läuft
alles ohne weiteren manuellen Schritt.

### Trigger und Ergebnis

- **Trigger:** Eine neue Antwort wird im Formular *„Das Rote Buch von
  Westmark – Questenverzeichnis der Gemeinschaft"* übermittelt.
- **Ergebnis:** Es wird automatisch eine E-Mail mit dem Betreff *„Eine neue
  Quest wurde gemeldet"* erzeugt und versendet – im Pergament-/Gold-Design mit
  eigenen Icons, in das die übermittelten Formularinhalte dynamisch eingefügt
  werden.

### Ablauf des Flows

1. **Trigger** – „Bei Übermitteln einer neuen Antwort"
2. **Aktion** – „Antwortdetails abrufen"
3. **Aktion** – „E-Mail senden" mit individuellem HTML-Inhalt, der die
   dynamischen Formularfelder einbindet

### Herr-der-Ringe-Bezug

- Formular-Titel: *„Das Rote Buch von Westmark – Questenverzeichnis der
  Gemeinschaft"*
- Fragen im Fellowship-Sprachstil, z. B. *„Welche Aufgabe stellt sich der
  Gemeinschaft?"*, *„Wie dringend ruft das Schicksal?"*, *„Was berichten die
  Boten?"*
- Dringlichkeitsstufen thematisiert als *„Der Weg ist noch lang"*, *„Die
  Schatten wachsen"* und *„Der Ring brennt/schmerzt"*
- E-Mail signiert mit *„— Die Gefährten"*

> Ein Word des Flows liegt der Abgabe als separate Bilddatei bei - und ist hier Verlinkt:
> [Dokumentation Side Quest (DOCX)](../src/Dokumentation%20Side%20Quest.docx)

## 2. Low-Code-Spiel – Flug von Gwaihir

- **Plattform:** Microsoft MakeCode Arcade
- **Spiel:** [Flug von Gwaihir][game]

### Kurzbeschreibung

Ein kurzes Arcade-Spiel rund um Gwaihir, den Herrn der Adler. Man steuert den
Adler 2D durch die Lüfte, weicht Hindernissen aus und sammelt Punkte, bis das
Spiel endet. Gebaut wurde es vollständig im blockbasierten MakeCode-Arcade-
Editor.

### Herr-der-Ringe-Bezug

- Gwaihir ist in *Der Herr der Ringe* der Herr der Adler, der Frodo und Sam im
  entschiedensten Moment vom Schicksalesberg rettet.
- Thema, Titel und Spielfigur greifen diese Rolle als fliegender Helfer auf.

## Team

Jennifer Meißl, Jürgen Palmberger, Christopher Schuch, Gregor Domanowski,
Georg Pignitter

[forms]: https://forms.office.com/e/UP79UQpwww?origin=lprLink
[game]: https://arcade.makecode.com/S41648-66913-43266-56608

