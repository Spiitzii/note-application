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