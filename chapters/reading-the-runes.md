# Hobbit Rations Tracker — Code Analyse

## 1. Was soll der Code tun?

Die kleine Web-Anwendung simuliert einen **Vorrats-Tracker** für Hobbits weil dieses Volk sehr, sehr viel kann. Man sieht eine Startmenge an Rationen (10), kann eine Zahl in ein Eingabefeld tippen und entweder:

- **„Add Rations"** drücken, um Vorräte hinzuzufügen
- **„Eat Rations"** drücken, um Vorräte zu verbrauchen.

Wenn nicht genug Essen da ist, soll eine Warnung erscheinen. Die angezeigte Zahl unter „Rations available:" soll immer den aktuellen Stand zeigen.

In der Praxis tut der Code das **nicht** zuverlässig.

---

## 2. Identifizierte Probleme

### Problem 1: `rations` ist ein String, kein Number

**Wo:** Zeile 16 — `let rations = "10";`

**Was beabsichtigt:** Eine Zahl speichern, mit der man rechnen kann.

**Was tatsächlich passiert:** Die Anführungszeichen machen aus der 10 einen **Text** ("10"), keine Zahl. Das wirkt harmlos hat aber schwere Folgen.

---

### Problem 2: „Add Rations" addiert nicht — es klebt Strings zusammen

**Wo:** Im Click-Handler von `addButton`:
```js
rations = rations + value;
```

**Was beabsichtigt:** Den eingegebenen Wert zur aktuellen Anzahl Rationen **dazuzählen**.

**Was tatsächlich passiert:** Weil `rations` ein String ist (siehe Problem 1) und `value` aus einem `<input type="text">` auch immer ein String ist, macht JavaScript hier **String-Konkatenation** statt Addition.

Beispiel:
- Start: `rations = "10"`
- Nutzer tippt `5` und klickt „Add"
- Ergebnis: `"10" + "5"` = `"105"` — nicht `15`!

Der Hobbit hat plötzlich 105 Rationen statt 15. Hat Gandalf gezaubert oder ist das einfach falsch? :)

---

### Problem 3: Keine Input-Validierung

**Wo:** Beide Click-Handler lesen `amountInput.value` direkt und verwenden ihn ohne Prüfung.

**Was beabsichtigt:** Nur sinnvolle Zahlen sollen akzeptiert werden.

**Was tatsächlich passiert:** Der Nutzer kann eingeben, was er will:
- **Leeres Feld** → `value = ""`, beim Subtrahieren wird `rations - ""` zu `rations - 0` (zufällig okay), beim Addieren entsteht `"10" + ""` = `"10"` (auch zufällig okay)
- **Text wie „abc"** → `rations - "abc"` ergibt `NaN`. Die Bedingung `NaN < 0` ist `false`, also läuft der else-Zweig: `rations = "10" - "abc"` = `NaN`. Ab jetzt ist die Anzeige permanent kaputt: „Rations available: NaN"
- **Negative Zahlen wie „-5"** beim Eat-Button → der Hobbit „isst" −5 Rationen und bekommt welche dazu.

---

## 3. Warum diese Probleme wichtig sind

### Aus Nutzersicht

- **Vertrauen:** Wenn „Add 5" zu „105" führt, denkt der Nutzer, die App ist kaputt. 
- **„NaN" auf dem Bildschirm** ist das klassische Zeichen einer schlechten App.

### Als Bug-Quelle für später

- **Versteckte Typ-Bugs sind die schlimmsten.** JavaScript meckert nicht, wenn man Strings „addiert" — der Code läuft einfach weiter. Solche Fehler werden oft erst Wochen später entdeckt, vielleicht auch erst in der Prod entdeckt.
- **Fehlende Validierung** öffnet die Tür für `NaN`, was sich dann durch das ganze System weiterträgt. Ein `NaN`-Wert in einer Datenbank ist ein Albtraum.

### In einem größeren System

- **Skalierung:** Der Rations-Tracker ist Teil einer größeren App mit Inventar, Handel, Kämpfen usw. Wenn `rations` ein String ist, würde jede andere Variable, die damit rechnet, denselben Fehler erben.
- **Testbarkeit:** Code mit Reihenfolge-Abhängigkeiten ist schwer zu testen.

---

## 4. Beschreibung der Fixes 

Kurz, ohne den ganzen Code neu zu schreiben:

1. **Typen sauber halten:** `let rations = 10;` (ohne Anführungszeichen).
2. **`<input type="number">`** statt `type="text"` hilft, lässt aber trotzdem komische Eingaben durch — die JS-Validierung bleibt nötig.

---

## 5. AI Reflection

Ehrlich gesagt: Ich habe 15 Minuten damit verbrauch auf den Code zu glotzen und nur den String gefunden.
Dann den Code dann Claude gegeben und gefragt „Was ist hier falsch?". 
Ich habe auch nicht alle Fehler von Claude angeführt aber ich habe sie mir erklären lassen. 

**Was ich selbst entscheiden musste:**
- **Welche Probleme ich in die Abgabe nehme.** Claude hat mehr Probleme aufgelistet, als die Aufgabe braucht.
- **Wie ich das in eigenen Worten erkläre.** Nur den Output kopieren bringt nichts — beim Umformulieren habe ich gemerkt, ob ich es wirklich verstanden habe.

**Was vorsichtig zu betrachten war:**
- AI-Vorschläge zu Fixes sind manchmal technisch korrekt, aber Overkill für eine kleine Übung.

Take-away für mich: AI ist gut, manchmal zu gut! Aber Priorisieren und Verstehen muss ich schon noch selbst (Gott sei dank!) 
