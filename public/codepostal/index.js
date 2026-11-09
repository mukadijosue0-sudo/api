'use strict';

// -----------------------------------------------------------------------------------
// Import des fonctions nécessaires
// -----------------------------------------------------------------------------------

import {appelAjaxSimple} from "/composant/fonction/ajax.js";
import {afficherSousLeChamp} from '/composant/fonction/afficher.js';
import {configurerFormulaire, effacerLesErreurs, filtrerLaSaisie,} from "/composant/fonction/formulaire.js";


// -----------------------------------------------------------------------------------
// Déclaration des variables globales
// -----------------------------------------------------------------------------------

const codePostal = document.getElementById('codePostal');
const ville = document.getElementById('ville');
const listeVille = document.getElementById('liste-villes'); // Pointe vers la datalist


// -----------------------------------------------------------------------------------
// Procédures évènementielles
// -----------------------------------------------------------------------------------

// Déclenchement de la recherche de la ville sur la saisie du 5ème caractère
codePostal.addEventListener('input', () => {

});

// Réinitialisation lors du focus sur le code postal
codePostal.addEventListener('focus', () => {

});


// -----------------------------------------------------------------------------------
// Fonctions de traitement
// -----------------------------------------------------------------------------------

function rechercherVille() {
    // efface les erreurs et réinitialise le champ ville et la datalist


    // Appel à l'API pour récupérer les villes correspondant au code postal


    // Appel Ajax pour récupérer les villes

}


// -----------------------------------------------------------------------------------
// Programme principal
// -----------------------------------------------------------------------------------

configurerFormulaire();
filtrerLaSaisie('codePostal', /[0-9]/);