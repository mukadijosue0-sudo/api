'use strict';

// -----------------------------------------------------------------------------------
// Import des fonctions nécessaires
// -----------------------------------------------------------------------------------

import {getData} from "/composant/fonction/page.js";

// -----------------------------------------------------------------------------------
// Déclaration des variables globales
// -----------------------------------------------------------------------------------

const lesDepots = getData('lesDepots'); // Récupération des données depuis le serveur
const lesLignes = document.getElementById('lesLignes');
const templateLigne = document.getElementById('ligne-depot-template');

// -----------------------------------------------------------------------------------
// Programme principal
// -----------------------------------------------------------------------------------

// Vérification de la présence de données
if (lesDepots && lesDepots.length > 0) {
    for (let element of lesDepots) {
        // Clonage du contenu du template
        const clone = templateLigne.content.cloneNode(true);

        // Remplissage des cellules via les classes cibles du template
        clone.querySelector('.col-nom').textContent = element.name;

        const badgeType = clone.querySelector('.col-type');
        if (element.private) {
            badgeType.textContent = 'Privé';
            badgeType.classList.add('badge-private');
        } else {
            badgeType.textContent = 'Public';
            badgeType.classList.add('badge-public');
        }

        clone.querySelector('.col-desc').textContent = element.description || 'Aucune description';

        // Ajout de la ligne clonée dans le tableau
        lesLignes.appendChild(clone);
    }
} else {
    // Cas échéant : affichage d'un message "Aucun dépôt"
    let tr = lesLignes.insertRow();
    let td = tr.insertCell();
    td.colSpan = 3;
    td.style.textAlign = 'center';
    td.style.padding = '2rem';
    td.style.color = '#64748b';
    td.textContent = "Aucun dépôt trouvé.";
}