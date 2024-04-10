import { addNote, showNotes, deleteNote} from './helpers.js';
import inquirer from 'inquirer';
import { UserMenu } from './helpers.js';

inquirer.prompt([
    {
        type: 'list',
        name: 'Auswahl',
        message: 'was möchten Sie tun?',
        choices: ['add', 'show', 'delete']
    }
]).then((answers) => {
    // Hier wird die Benutzereingabe erfasst
    const userInput = answers.Auswahl.trim(); // Erfasse die Benutzereingabe und entferne Leerzeichen

    if (userInput === 'add' || userInput === 'show' || userInput === 'delete') {
        // Gültige Auswahl, rufe UserMenu mit userInput auf
        UserMenu(userInput);
    } else {
        console.error('Ungültige Auswahl:', userInput);
    }
});

