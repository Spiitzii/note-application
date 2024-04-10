// Importiere die addNote-Funktion aus helpers.js
import { addNote } from '../helpers.js';

// Funktion zum Testen der addNote-Funktion
function testAddNote() {
    // Rufe die addNote-Funktion auf
    addNote()
        .then((message) => {
            // Wenn die Funktion erfolgreich ausgeführt wurde, gib die Erfolgsmeldung aus
            console.log(message);
        })
        .catch((error) => {
            // Wenn ein Fehler auftritt, gib den Fehler aus
            console.error('Fehler beim Hinzufügen der Notiz:', error);
        });
}

// Funktion aufrufen, um die addNote-Funktion zu testen
testAddNote();
