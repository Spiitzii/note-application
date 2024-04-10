import fs from 'fs'; // Importieren des fs-Moduls für Dateioperationen
import inquirer from 'inquirer'

const noteFile = 'notes.txt'; // Pfad zur Notizdatei

// Funktion zum Hinzufügen einer Notiz
export function addNote() {
    return new Promise((resolve, reject) => {
        // Benutzer auffordern, eine Notiz einzugeben
        inquirer.prompt([
            {
                type: 'input',
                name: 'note',
                message: 'Gib deine Notiz ein:'
            }
        ]).then((answers) => {
            // Notiz zur Datei hinzufügen
            fs.appendFileSync(noteFile, answers.note + '\n');
            // Erfolgsmeldung zurückgeben
            resolve('Notiz hinzugefügt: ' + answers.note);
        }).catch((error) => {
            // Fehlermeldung zurückgeben
            reject(error);
        });
    });
}


// Funktion zum Anzeigen einer Notiz
export function showNotes() {
    return new Promise((resolve, reject) => {
        // Notizen aus der Datei lesen
        fs.readFile(noteFile, 'utf8', (err, data) => {
            if (err) {
                reject(err); // Fehler behandeln
            } else {
                const notes = data.split('\n').filter(note => note.trim() !== ''); // Notizen an Zeilenumbrüchen trennen und leere Zeilen filtern
                resolve(notes); // Erfolgreich mit dem Array von Notizen auflösen
            }
        });
    });
}




// Funktion zum Löschen einer Notiz
export function deleteNote() {
    return new Promise((resolve, reject) => {
        // Benutzer auffordern, den Inhalt der zu löschenden Notiz einzugeben
        inquirer.prompt([
            {
                type: 'input',
                name: 'noteContent',
                message: 'Gib den Inhalt ein für das Löschen der Notiz'
            }
        ]).then((answers) => {
            const noteContent = answers.noteContent.trim();

            // Debugging-Ausgabe: Zu löschende Notiz anzeigen
            console.log('Zu löschende Notiz:', noteContent);

            // Notizen aus der Datei lesen
            showNotes().then((notes) => {
                // Debugging-Ausgabe: Alle Notizen anzeigen
                console.log('Alle Notizen:', notes);

                // Neues Array erstellen, das alle Notizen außer der zu löschenden Notiz enthält
                const updatedNotes = notes.filter(note => note.trim() !== noteContent);
                
                // Debugging-Ausgabe: Aktualisierte Notizen anzeigen
                console.log('Aktualisierte Notizen:', updatedNotes);

                // Überprüfen, ob sich die Notiz tatsächlich im Array befand und gelöscht wurde
                if (updatedNotes.length < notes.length) {
                    // Die aktualisierte Liste der Notizen zurück in die Datei schreiben
                    fs.writeFileSync(noteFile, updatedNotes.join('\n'));
                    resolve('Notiz gelöscht.');
                } else {
                    reject('Die angegebene Notiz wurde nicht gefunden.');
                }
            }).catch((error) => {
                reject(error);
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

// Interface um auszuwählen was man machen möchte
export async function UserMenu(userInput) {
    try {
        switch(userInput) {
            case 'add':
                // addNote-Funktion starten
                await addNote();
                break;
            case 'show':
                // showNotes-Funktion starten
                const notes= await showNotes();
                console.log('Notizen:', notes)
                break;
            case 'delete':
                // WdeleteNote-Funktion starten
                await deleteNote();
                break;
            default:
                console.error('Ungültige Auswahl');
                break;
        }
    } catch (error) {
        console.error('Fehler:', error)
    }
}