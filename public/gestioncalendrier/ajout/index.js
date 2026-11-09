'use strict';

// -----------------------------------------------------------------------------------
// Import des fonctions nécessaires
// -----------------------------------------------------------------------------------

import {effacerLesErreurs, configurerFormulaire, donneesValides} from "/composant/fonction/formulaire.js";
import {appelAjax} from "/composant/fonction/ajax.js";
import {retournerVers} from "/composant/fonction/afficher.js";

// -----------------------------------------------------------------------------------
// Déclaration des variables globales
// -----------------------------------------------------------------------------------

const nom = document.getElementById('nom');
const ville = document.getElementById('ville');
const date = document.getElementById('date');
const id = document.getElementById('id');
const distances = document.getElementById('distances');
const challenge = document.getElementById('challenge');
const label = document.getElementById('label');
const organisateur = document.getElementById('organisateur');
const email = document.getElementById('email');
const btnAjouter = document.getElementById('btnAjouter');

// -----------------------------------------------------------------------------------
// Procédures évènementielles
// -----------------------------------------------------------------------------------

btnAjouter.onclick = () => {
    effacerLesErreurs();
    if (donneesValides()) {
        ajouter();
    }
};

// -----------------------------------------------------------------------------------
// Fonctions de traitement
// -----------------------------------------------------------------------------------
function ajouter() {
    // Préparation des données à transmettre au serveur
    // Les champs obligatoires sont transmis tels quels
    // Les champs facultatifs vides ne sont pas transmis
    // filtrer les champs vides en JS est indispensable pour ne pas perturber le validateur PHP de l'API
    const lesValeurs = {
        id: id.value,
        nom: nom.value.toUpperCase(),
        ville: ville.value,
        challenge: challenge.checked ? 1 : 0,
        organisateur: organisateur.value.trim(),
        label: label.value,
        date: date.value
    };

    // Les champs facultatifs vides ne sont pas transmis
    if (distances.value.trim() !== '') {
        lesValeurs.distances = distances.value.trim();
    }
    if (email.value.trim() !== '') {
        lesValeurs.email = email.value.trim();
    }


    appelAjax({
        url: "ajax/ajouter.php",
        method: "POST",
        data: lesValeurs,
        success: (data) => retournerVers(`L'épreuve ${data.id} a été ajoutée au calendrier`, '../', 3000)
    });
}
// -----------------------------------------------------------------------------------
// Programme principal
// -----------------------------------------------------------------------------------
// Configuration du formulaire
configurerFormulaire();

// initialisation des valeurs pour les tests
nom.value = "Marathon des Saint";
ville.value = "Saint-ouen";
id.value = "123456";
distances.value = "42 km";
date.value = "2026-01-01";
challenge.checked = true;
label.value = 'Or';
organisateur.value = 'Saint Ouen DSL';
email.value = 'contact@exemple.fr';
