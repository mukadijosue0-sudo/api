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
    if (codePostal.value.length === 5) {
        rechercherVille();
    }
});

// Réinitialisation lors du focus sur le code postal
codePostal.addEventListener('focus', () => {
    effacerLesErreurs();
    codePostal.value = '';
    ville.value = '';
    ville.disabled = true;
    listeVille.replaceChildren();
});


// -----------------------------------------------------------------------------------
// Fonctions de traitement
// -----------------------------------------------------------------------------------

function rechercherVille() {
    // efface les erreurs et réinitialise le champ ville et la datalist
    effacerLesErreurs();
    ville.value = '';
    listeVille.replaceChildren();

    // Appel à l'API pour récupérer les villes correspondant au code postal
    const url = "https://geo.api.gouv.fr/communes?codePostal=" + codePostal.value;

    // Appel Ajax pour récupérer les villes
   appelAjaxSimple({
       url: url,
       success: (data) => {
           const nb = data.length;
           if (nb === 0) {
               afficherSousLeChamp(codePostal, "Code postal inexistant.");
               ville.disabled = true;
           } else if (nb === 1) {
               // Une seule ville : on remplit et on active le champ
               ville.value = data[0].nom;
               ville.disabled = false;
           } else {
               // Plusieurs villes : on remplit la datalist puis on active le champ
               listeVille.replaceChildren();
               for (const element of data) {
                   const option = document.createElement('option');
                   option.value = element.nom;
                   listeVille.appendChild(option);
               }
               ville.disabled = false;
               ville.focus(); // l'utilisateur peut choisir ou taper le nom de la ville
               if (typeof ville.showPicker === 'function') {
                   ville.showPicker();
               }
           }
       }
   });
}

// -----------------------------------------------------------------------------------
// Programme principal
// -----------------------------------------------------------------------------------

configurerFormulaire();
filtrerLaSaisie('codePostal', /[0-9]/);