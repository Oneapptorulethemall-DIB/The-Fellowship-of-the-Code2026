# Hobbit Rations Tracker — Code Analyse

## 1. Was soll der Code tun?

Die kleine Web-Anwendung simuliert einen **Vorrats-Tracker** für Hobbits. Der Nutzer sieht eine Startmenge an Rationen (10), kann eine Zahl in ein Eingabefeld tippen und entweder:

- **„Add Rations"** drücken, um Vorräte hinzuzufügen, oder
- **„Eat Rations"** drücken, um Vorräte zu verbrauchen.

Wenn nicht genug Rationen vorhanden sind, soll eine Warnung erscheinen. Die angezeigte Zahl unter „Rations available:" soll immer den aktuellen Stand zeigen.

So weit die Theorie. In der Praxis tut der Code das **nicht** zuverlässig.

---

## 2. Identifizierte Probleme

### Problem 1: `rations` ist ein String, kein Number

**Wo:** Zeile 1 im Script — `let rations = "10";`

**Was beabsichtigt:** Eine Zahl speichern, mit der man rechnen kann.

**Was tatsächlich passiert:** Die Anführungszeichen machen aus der 10 einen **Text** ("10"), keine Zahl. Das wirkt harmlos, hat aber im Zusammenspiel mit dem nächsten Problem dramatische Folgen.

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

Der Hobbit hat plötzlich 105 Rationen statt 15. Magisch, aber falsch.

---

### Problem 3: UI wird aktualisiert, bevor sich der State ändert

**Wo:** Im Click-Handler von `eatButton`:
```js
eatButton.addEventListener("click", () => {
    const value = amountInput.value;
    updateStatus();                       // <-- hier schon aufgerufen
    if (rations - value < 0) {
        alert("Not enough rations!");
    } else {
        rations = rations - value;        // <-- State ändert sich erst danach
    }
});
```

**Was beabsichtigt:** Die Anzeige soll den **neuen** Stand nach dem Essen zeigen.

**Was tatsächlich passiert:** `updateStatus()` läuft **vor** der Subtraktion. Die Anzeige zeigt also den **alten** Wert, nicht den neuen. Und im erfolgreichen `else`-Zweig wird `updateStatus()` danach **gar nicht mehr** aufgerufen — die UI bleibt nach dem Essen veraltet, bis der Nutzer den nächsten Klick macht.

Ergebnis: Der Nutzer isst 3 Rationen, die Anzeige steht aber noch auf dem alten Wert. Das ist verwirrend und sieht aus wie ein Bug („Hat der Klick funktioniert?").

---

### Problem 4: Keine Input-Validierung

**Wo:** Beide Click-Handler lesen `amountInput.value` direkt und verwenden ihn ohne Prüfung.

**Was beabsichtigt:** Nur sinnvolle Zahlen sollen akzeptiert werden.

**Was tatsächlich passiert:** Der Nutzer kann eingeben, was er will:
- **Leeres Feld** → `value = ""`, beim Subtrahieren wird `rations - ""` zu `rations - 0` (zufällig okay), beim Addieren entsteht `"10" + ""` = `"10"` (auch zufällig okay)
- **Text wie „abc"** → `rations - "abc"` ergibt `NaN`. Die Bedingung `NaN < 0` ist `false`, also läuft der else-Zweig: `rations = "10" - "abc"` = `NaN`. Ab jetzt ist die Anzeige permanent kaputt: „Rations available: NaN"
- **Negative Zahlen wie „-5"** beim Eat-Button → der Hobbit „isst" −5 Rationen und bekommt welche dazu.

---

## 3. Warum diese Probleme wichtig sind

### Aus Nutzersicht

- **Vertrauensverlust:** Wenn „Add 5" zu „105" führt, denkt der Nutzer, die App ist kaputt — und sie hat recht.
- **Verwirrende Anzeige:** Eine UI, die nach einer Aktion nicht aktualisiert wird (Problem 3), wirkt eingefroren. Nutzer klicken dann mehrfach und produzieren weitere Bugs.
- **„NaN" auf dem Bildschirm** ist das klassische Zeichen einer schlecht gewarteten App.

### Als Bug-Quelle für später

- **Versteckte Typ-Bugs sind die schlimmsten.** JavaScript meckert nicht, wenn man Strings „addiert" — der Code läuft einfach falsch weiter. Solche Fehler werden oft erst Wochen später in der Produktion entdeckt.
- **Reihenfolge-Bugs (Problem 3)** werden gefährlich, sobald jemand neue Features dazubaut: „Warum aktualisiert sich der Counter manchmal nicht?" — die Antwort ist schwer zu finden, wenn `updateStatus()` an verschiedenen Stellen aufgerufen wird.
- **Fehlende Validierung** öffnet die Tür für `NaN`, was sich dann durch das ganze System weiterträgt. Ein `NaN`-Wert in einer Datenbank ist ein Albtraum.

### In einem größeren System

- **Skalierungsproblem:** Stell dir vor, der Rations-Tracker wäre Teil einer größeren App mit Inventar, Handel, Kämpfen usw. Wenn `rations` ein String ist, würde jede andere Komponente, die damit rechnet, denselben Fehler erben.
- **Tight Coupling von UI und State:** Im aktuellen Code mischen sich State-Update (`rations = ...`) und UI-Update (`updateStatus()`) wild durcheinander. In einem größeren System trennt man das normalerweise (das ist genau der Grund, warum Patterns wie **MVC** oder **MVVM** existieren — du kennst die schon aus deinem Kurs). Hier passiert beides im selben Handler, was schon bei zwei Buttons zu inkonsistenten Updates führt.
- **Testbarkeit:** Code mit impliziter Typ-Coercion und Reihenfolge-Abhängigkeiten ist schwer zu testen. Unit-Tests dafür zu schreiben wäre frustrierend.

---

## 4. Beschreibung der Fixes (optional)

Kurz, ohne den ganzen Code neu zu schreiben:

1. **Typen sauber halten:** `let rations = 10;` (ohne Anführungszeichen), und beim Einlesen `const value = Number(amountInput.value);` — oder besser `parseInt(amountInput.value, 10)`.
2. **Input validieren:** Vor dem Rechnen prüfen `if (isNaN(value) || value <= 0) { alert("Bitte eine gültige Zahl eingeben"); return; }`.
3. **Reihenfolge im Eat-Handler korrigieren:** Erst validieren, dann State ändern, **dann erst** `updateStatus()` aufrufen. Idealerweise nur **einmal am Ende**, in beiden Zweigen.
4. **`<input type="number">`** statt `type="text"` hilft, lässt aber trotzdem komische Eingaben durch — die JS-Validierung bleibt nötig.

---

## 5. AI Reflection

Ehrlich gesagt: Ich habe Claude den Code gegeben und gefragt „Was ist hier falsch?". Das war ein guter erster Schritt, aber ich musste selbst entscheiden, **welche** der gefundenen Probleme wirklich wichtig sind — nicht jeder Hinweis war gleich relevant für die Aufgabe.

**Hilfreich war:**
- Claude hat die String-vs-Number-Falle sofort erkannt. Das hätte ich beim Lesen wahrscheinlich übersehen, weil `"10"` und `10` auf den ersten Blick gleich aussehen.
- Die Erklärung, warum `updateStatus()` an der falschen Stelle steht, war klar nachvollziehbar.

**Was ich selbst entscheiden musste:**
- **Welche Probleme ich in die Abgabe nehme.** Claude hat mehr Probleme aufgelistet, als die Aufgabe braucht. Ich habe die ausgewählt, die am besten zu den vorgegebenen Kategorien (Logik-Reihenfolge, Datentypen, UI-Konsistenz) passen.
- **Wie ich das in eigenen Worten erkläre.** Nur den Output kopieren bringt nichts — beim Umformulieren habe ich gemerkt, ob ich es wirklich verstanden habe.

**Was vorsichtig zu betrachten war:**
- AI-Vorschläge zu Fixes sind manchmal „technisch korrekt, aber Overkill" für eine kleine Übung. Ich habe bewusst bei einfachen Lösungen geblieben statt direkt Frameworks zu empfehlen.

Take-away für mich: AI ist gut, um **schnell Hypothesen zu generieren**, aber das **Priorisieren und Verstehen** muss ich selbst machen.

