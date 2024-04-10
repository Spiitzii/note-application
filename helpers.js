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
        const notes = fs.readFileSync(noteFile, 'utf8').split('\n').filter(note => note.trim() !== '')
        // Notizen formatieren und als Zeichenkette zurückgeben
        const stringnote = notes.map((note, index) =>{
            return `${index + 1}: ${note}`;
        });
        // Erfolgreich zurückgeben
        resolve(stringnote.join('\n')); 
    });
}