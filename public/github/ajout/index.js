'use strict';

// -----------------------------------------------------------------------------------
// Import des fonctions nécessaires
// -----------------------------------------------------------------------------------

import {appelAjax} from "/composant/fonction/ajax.js";
import {retournerVersApresConfirmation} from "/composant/fonction/afficher.js";
import {effacerLesErreurs, configurerFormulaire} from "/composant/fonction/formulaire.js";

// -----------------------------------------------------------------------------------
// Déclaration des variables globales
// -----------------------------------------------------------------------------------

const nom = document.getElementById('nom');
const description = document.getElementById('description');
const type = document.getElementById('type');
const btnAjouter = document.getElementById('btnAjouter');

// -----------------------------------------------------------------------------------
// Procédures évènementielles
// -----------------------------------------------------------------------------------
btnAjouter.onclick = () => {
    effacerLesErreurs();
    ajouter();
};

// -----------------------------------------------------------------------------------
// Fonctions de traitement
// -----------------------------------------------------------------------------------
function ajouter() {
    appelAjax({
        url : 'ajax/ajouter.php',
        method: "POST",
        data: {
            name: nom.value.trim(),
            description: description.value.trim(),
            private: type.value
        },
        success: (data) => retournerVersApresConfirmation(data.message, '../liste/')
    });
}

// -----------------------------------------------------------------------------------
// Programme principal
// -----------------------------------------------------------------------------------

// alimentation des champs du formulaire
nom.value = 'monPremierDepot';
description.value = 'Description de mon premier dépôt';
type.value = '0';

// configuration du formulaire
configurerFormulaire();