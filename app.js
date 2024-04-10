import inquirer from 'inquirer'; // Importieren des inquirer-Moduls für Benutzereingaben
import { UserMenu } from './helpers.js'; // Importieren der UserMenu-Funktion aus der helpers.js-Datei

// Benutzer nach der gewünschten Aktion fragen
inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'Was möchten Sie tun?', // Nachricht an den Benutzer
        choices: ['add', 'show', 'delete'] // Auswahlmöglichkeiten
    }
]).then((answers) => {
    // Hier wird die Benutzereingabe erfasst
    const userInput = answers.action.trim(); // Erfasse die Benutzereingabe und entferne Leerzeichen

    if (userInput === 'add' || userInput === 'show' || userInput === 'delete') {
        // Gültige Auswahl, rufe UserMenu mit userInput auf
        UserMenu(userInput);
    } else {
        console.error('Ungültige Auswahl:', userInput); // Fehlermeldung ausgeben
    }
});
