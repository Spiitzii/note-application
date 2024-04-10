import { deleteNote } from '../helpers.js'; // Importieren der deleteNote-Funktion

// Funktion zum Testen der deleteNote-Funktion
function testDeleteNote() {
    deleteNote() // Die deleteNote-Funktion aufrufen
        .then((message) => { // Wenn die Funktion erfolgreich ausgeführt wurde
            console.log(message); // Erfolgsmeldung ausgeben
        })
        .catch((error) => { // Wenn ein Fehler auftritt
            console.error('Fehler beim Löschen der Notiz:', error); // Fehlermeldung ausgeben
        });
}

// Testfunktion aufrufen
testDeleteNote();
