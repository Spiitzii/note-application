// Importieren des fs-Moduls für Dateioperationen
import fs from 'fs';

// Importieren des inquirer-Moduls für Benutzereingaben
import inquirer from 'inquirer';

// Pfad zur Notizdatei
const noteFile = 'notes.txt';

// Funktion zum Hinzufügen einer Notiz
export function addNote() {
    return new Promise((resolve, reject) => {
        // Benutzer zur Eingabe einer Notiz auffordern
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
                // Notizen an Zeilenumbrüchen trennen und leere Zeilen filtern
                const notes = data.split('\n').filter(note => note.trim() !== '');
                // Erfolgreich mit dem Array von Notizen auflösen
                resolve(notes);
            }
        });
    });
}

// Funktion zum Löschen einer Notiz
export function deleteNote() {
    return new Promise((resolve, reject) => {
        // Benutzer zur Eingabe des Inhalts für das Löschen der Notiz auffordern
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

            // Notizen aus der Datei lesen und verarbeiten
            showNotes().then((notes) => {
                // Debugging-Ausgabe: Alle Notizen anzeigen
                console.log('Alle Notizen:', notes);

                // Notizen filtern, um die zu löschende Notiz zu entfernen
                const updatedNotes = notes.filter(note => note.trim() !== noteContent);
                
                // Debugging-Ausgabe: Aktualisierte Notizen anzeigen
                console.log('Aktualisierte Notizen:', updatedNotes);

                // Überprüfen, ob die Notiz gefunden und gelöscht wurde
                if (updatedNotes.length < notes.length) {
                    // Aktualisierte Notizen zurück in die Datei schreiben
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

// Benutzerinteraktion für die Auswahl der Aktion
export async function UserMenu(userInput) {
    try {
        switch(userInput) {
            case 'add':
                // Hinzufügen einer Notiz
                await addNote();
                break;
            case 'show':
                // Anzeigen aller Notizen
                const notes = await showNotes();
                console.log('Notizen:', notes);
                break;
            case 'delete':
                // Löschen einer Notiz
                await deleteNote();
                break;
            default:
                console.error('Ungültige Auswahl');
                break;
        }
    } catch (error) {
        console.error('Fehler:', error); // Fehlermeldung ausgeben
    }
}
