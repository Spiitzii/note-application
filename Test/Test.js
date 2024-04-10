import { showNotes } from '../helpers.js'; // Importieren der showNotess-Funktion


// Funktion zum Testen der showNotes-Funktion
function testshowNotes() {
    showNotes() // Die showNotes-Funktion aufrufen
        .then((notes) => { // Wenn die Funktion erfolgreich ausgeführt wurde
            console.log('Notizen:\n', notes); // Ausgeben der erhaltenen Notizen
        })
        .catch((error) => { // Wenn ein Fehler auftritt
            console.error('Fehler beim Anzeigen der Notizen:', error); // Fehlermeldung ausgeben
        });
}

// Testfunktion aufrufen
testshowNotes();
