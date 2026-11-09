'use strict';

// -----------------------------------------------------------------------------------
// Import des fonctions nécessaires
// -----------------------------------------------------------------------------------

import {appelAjax} from "/composant/fonction/ajax.js";
import {afficherToast, confirmer} from "/composant/fonction/afficher.js";
import {ucWord} from "/composant/fonction/chaine.js";
import {getData} from "/composant/fonction/page.js";


// -----------------------------------------------------------------------------------
// Déclaration des variables globales
// -----------------------------------------------------------------------------------

const lesLignes = document.getElementById('lesLignes');
const modeleLigne = document.getElementById('modeleLigne');
const lesEpreuves = getData('lesEpreuves');

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

    // On récupère directement la balise <tr> qui se trouve dans le fragment
    const tr = ligne.querySelector('tr');
    tr.id = epreuve.id; // <-- On met l'ID sur le <tr>

    const champ = (nom) => ligne.querySelector(`[data-champ="${nom}"]`);

    // Formatage du titre (Nom + Ville si elle n'est pas déjà dans le nom)
    const titre = epreuve.nom.toLowerCase().includes(epreuve.ville.toLowerCase())
        ? epreuve.nom
        : `${epreuve.nom} (${ucWord(epreuve.ville)})`;

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

    champ('modifier').href = `maj/?id=${encodeURIComponent(epreuve.id)}`;
    champ('supprimer').onclick = (e) => {
        e.preventDefault();
        confirmer(() => supprimer(epreuve.id), `Supprimer l'épreuve « ${titre} » ?`);
    };

    // Injection des données textuelles pures (zéro risque XSS)
    champ('id').textContent = epreuve.id;
    champ('nom').textContent = titre;
    champ('date').textContent = new Date(epreuve.date).toLocaleDateString('fr-FR');
    champ('distances').textContent = epreuve.distances ?? 'Non précisées';
    champ('challenge').textContent = epreuve.challenge ? '🏆' : '';
    champ('organisateur').textContent = ucWord(epreuve.organisateur) + ' - '  + epreuve.email ;

    return ligne;
}


/**
 * Supprime une épreuve puis recharge la liste
 * @param {string|number} id
 */
function supprimer(id) {
    appelAjax({
        url: "ajax/supprimer.php",
        data: {id: id},
        success: () => {
            afficherToast("L'épreuve a bien été supprimée.");
            // supprimer la ligne du tableau sans recharger toute la liste
            const ligneASupprimer = document.getElementById(id);
            ligneASupprimer.remove();
        }
    });
}

// -----------------------------------------------------------------------------------
// Programme principal
// -----------------------------------------------------------------------------------

for (const epreuve of lesEpreuves) {
    lesLignes.appendChild(creerLigne(epreuve));
}