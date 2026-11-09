'use strict';

// -----------------------------------------------------------------------------------
// Import des fonctions nécessaires
// -----------------------------------------------------------------------------------

import {effacerLesErreurs} from "/composant/fonction/formulaire.js";
import {afficherToast, confirmer, messageBox} from "/composant/fonction/afficher.js";
import {appelAjax} from "/composant/fonction/ajax.js";
import {getData} from "../../composant/fonction/page.js";

// -----------------------------------------------------------------------------------
// Déclaration des variables globales
// -----------------------------------------------------------------------------------

const lesDepots = getData('lesDepots');


// variables globales

const liste = document.getElementById('liste');
const nom = document.getElementById('nom');
const description = document.getElementById('description');
const dateCreation = document.getElementById('dateCreation');
const dateModification = document.getElementById('dateModification');
const type = document.getElementById('type');
const msg = document.getElementById('msg');
const btnModifier = document.getElementById('btnModifier');
const btnSupprimer = document.getElementById('btnSupprimer');

// objet contenant le dépot sélectionné
let depot = {};

// -----------------------------------------------------------------------------------
// Procédures évènementielles
// -----------------------------------------------------------------------------------

liste.onchange =  () => getDepot(liste.value);

btnModifier.onclick = () => {
    effacerLesErreurs();
    modifier(liste.value);
};

btnSupprimer.onclick = () => {
    confirmer(() => supprimer(liste.value));
};

// -----------------------------------------------------------------------------------
// Fonctions de traitement
// -----------------------------------------------------------------------------------

/*
    * Récupération des informations du dépot sélectionné
    * @param {string} name le nom du dépot
 */

function getDepot(name) {
    // effacer les messages d'erreur

    // appel Ajax pour récupérer les informations du dépot

}

/**
 * Affichage des informations du dépot sélectionné
 * @param {array} data les données du dépot
 */
function afficherReferentiel(data) {
    depot = data;
    nom.value = data.name;
    description.value = data.description;
    type.value = data.private ? '1' : '0';
    // les dates GitHub sont au format Gmt-0 "2025-07-30T03:26:41Z", il faut les convertir en français pour les avoir en Gmt-2
    let date = new Date(data.created_at);
    dateCreation.value = date.toLocaleString('fr-FR');
    date = new Date(data.updated_at);
    dateModification.value = date.toLocaleString('fr-FR');
}

/**
 * Suppression du dépot sélectionné
 *  * @param {string} name le nom du dépot
 */
function supprimer(name) {

}

/**
 * Modification du dépot sélectionné
 *  * @param {string} name le nom du dépot
 */
function modifier(name) {
    const lesValeurs = {};
    if (nom.value !== depot.name) {
        lesValeurs.name = nom.value;
    }
    if (description.value !== depot.description) {
        lesValeurs.description = description.value;
    }
    if (type.value !== (depot.private ? '1' : '0')) {
        lesValeurs.private = type.value;
    }
    // Vérification : si aucune clé n’a été ajoutée => pas de modification
    if (Object.keys(lesValeurs).length === 0) {
        messageBox("Aucune modification constatée !", 'error');
        return;
    }

    // appel Ajax pour modifier le dépot

}

// -----------------------------------------------------------------------------------
// Programme principal
// -----------------------------------------------------------------------------------
// remplissage de la liste
for (let nom of lesDepots) {
    liste.add(new Option(nom, nom));
}
getDepot(liste.value);