import { addNote, showNotes, deleteNote} from './helpers.js';
import inquirer from 'inquirer';

function UserMenu(userInput) {
    switch(userInput) {
        case 'add':
            // addNote-Funktion starten
            addNote();
            break;
