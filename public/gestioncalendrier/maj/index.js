'use strict';

// -----------------------------------------------------------------------------------
// Import des fonctions nécessaires
// -----------------------------------------------------------------------------------

import {configurerFormulaire, effacerLesErreurs, donneesValides} from "/composant/fonction/formulaire.js";
import {messageBox, retournerVers } from "/composant/fonction/afficher.js";
import {appelAjax} from "/composant/fonction/ajax.js";
import {getData} from "/composant/fonction/page.js";
// -----------------------------------------------------------------------------------
// Déclaration des variables globales
// -----------------------------------------------------------------------------------

// épreuve à modifier, transmise par le serveur
const epreuve = getData('epreuve');

const id = document.getElementById('id');
const nom = document.getElementById('nom');
const ville = document.getElementById('ville');
const date = document.getElementById('date');
const distances = document.getElementById('distances');
const challenge = document.getElementById('challenge');
const label = document.getElementById('label');
const organisateur = document.getElementById('organisateur');
const email = document.getElementById('email');
const btnModifier = document.getElementById('btnModifier');

// -----------------------------------------------------------------------------------
// Procédures évènementielles
// -----------------------------------------------------------------------------------

btnModifier.onclick = () => {
    effacerLesErreurs();
    if (donneesValides()) {
        modifier();
    }
};

// -----------------------------------------------------------------------------------
// Fonctions de traitement
// -----------------------------------------------------------------------------------

/**
 * Affiche l'épreuve sélectionnée dans le formulaire
 */
function afficherEpreuve(epreuve){

    id.value = epreuve.id;
    nom.value = epreuve.nom;
    ville.value = epreuve.ville;
    date.value = epreuve.date;
    distances.value = epreuve.distances;
    challenge.checked = epreuve.challenge === 1;
    label.value = epreuve.label;
    organisateur.value = epreuve.organisateur;
    email.value = epreuve.email;
}

function modifier() {
    // Objet qui contiendra uniquement les champs modifiés
    const lesValeurs = {};

    // 1. Comparaison champ par champ avec l'objet d'origine (epreuve)

    // Le nom


    // La ville (comparaison en majuscules puisque la ville est stockée en majuscules)


    // La date


    // Les distances (en gérant les chaînes vides ou nulles)


    // Le challenge (booléen vs entier 0/1)


    // Le label

    // L'organisateur


    // L'email (en gérant les nulls / chaînes vides)


    // 2. Sécurité : S'il n'y a eu strictement aucune modification


    // 3. Appel AJAX avec uniquement les champs modifiés



}

// -----------------------------------------------------------------------------------
// Programme principal
// -----------------------------------------------------------------------------------

configurerFormulaire();
afficherEpreuve(epreuve);