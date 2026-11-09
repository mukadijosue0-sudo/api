'use strict';

// -----------------------------------------------------------------------------------
// Import des fonctions nécessaires
// -----------------------------------------------------------------------------------

import {ucWord} from "/composant/fonction/chaine.js";
import {appelAjax} from "/composant/fonction/ajax.js";


// -----------------------------------------------------------------------------------
// Déclaration des variables globales
// -----------------------------------------------------------------------------------

const lesLignes = document.getElementById('lesLignes');
const modeleLigne = document.getElementById('modeleLigne');

// -----------------------------------------------------------------------------------
// Fonctions de traitement
// -----------------------------------------------------------------------------------

/**
 * Crée une ligne du tableau à partir du template pour une épreuve donnée
 * @param {Object} epreuve
 * @returns {DocumentFragment}
 */
function creerLigne(epreuve) {
    const ligne = modeleLigne.content.cloneNode(true);
    const champ = (nom) => ligne.querySelector(`[data-champ="${nom}"]`);

    // Formatage du titre (Nom + Ville si elle n'est pas déjà dans le nom)
    const titre = epreuve.nom.toLowerCase().includes(epreuve.ville.toLowerCase()) ? epreuve.nom : `${epreuve.nom} (${ucWord(epreuve.ville)})`;

    // Gestion du label (médailles)
    const spanLabel = champ('label');

    // On vérifie que le label existe et qu'il est connu dans notre dictionnaire
    const emojis = { 'Bronze': '🏅', 'Argent': '🥈', 'Or': '🥇' };

    if (epreuve.label && emojis[epreuve.label]) {
        spanLabel.textContent = emojis[epreuve.label];
        spanLabel.classList.add(`badge-${epreuve.label.toLowerCase()}`);
        spanLabel.style.display = ''; // S'assurer qu'il est visible s'il était masqué
    } else {
        spanLabel.textContent = '';
        spanLabel.style.display = 'none'; // Masquer s'il n'y a pas de label valide
    }

    // Injection des données textuelles pures (zéro risque XSS)
    const lienId = champ('id');
    lienId.textContent = epreuve.id;
    lienId.href += encodeURIComponent(epreuve.id);
    champ('nom').textContent = titre;



    return ligne;
}

/**
 * Affiche toutes les épreuves dans le tableau
 * @param {Array} lesEpreuves
 */
function afficher(lesEpreuves) {


}

// -----------------------------------------------------------------------------------
// Programme principal
// -----------------------------------------------------------------------------------

