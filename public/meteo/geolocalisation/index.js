'use strict';

// -----------------------------------------------------------------------------------
// Import des fonctions nécessaires
// -----------------------------------------------------------------------------------

import {messageBox} from "/composant/fonction/afficher.js";
import {appelAjaxSimple} from "/composant/fonction/ajax.js";
import {enleverAccent} from "/composant/fonction/chaine.js";

// -----------------------------------------------------------------------------------
// Déclaration des variables globales
// -----------------------------------------------------------------------------------

const date = document.getElementById('date');
const heure = document.getElementById('heure');
const nom = document.getElementById('nom');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const icone = document.getElementById('icone');
const journee = document.getElementById('journee');


// -----------------------------------------------------------------------------------
// Procédures évènementielles
// -----------------------------------------------------------------------------------




// -----------------------------------------------------------------------------------
// Fonctions de traitement
// -----------------------------------------------------------------------------------

/**
 * Affichage d'un message d'erreur
 * @param error
 */
function erreur(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log('L\'utilisateur a refusé la demande');
            break;
        case error.POSITION_UNAVAILABLE:
            console.log('Position indéterminée');
            break;
        case error.TIMEOUT:
            console.log('Réponse trop lente');
            break;
    }
}

/**
 * Recherche de la météo en fonction de la position géographique
 * @param {object} position la position géographique de l'utilisateur
 */
function rechercherVille(position) {


}

function rechercherMeteo(ville) {
    // incohérance de l'api, on doit enlever les accents
    ville = enleverAccent(ville);
    // appel de l'api pour récupérer les données météo
    appelAjaxSimple({
        url: 'https://www.prevision-meteo.ch/services/json/' + ville,
        success: afficherMeteo,
    });
}

/**
 * Affichage des données météo de la ville sélectionnée
 * @param {json} data les données météo de la ville sélectionnée ou errors
 */
function afficherMeteo(data) {
    if (data.errors) {
        messageBox(data.errors[0].text + '\n' + data.errors[0].description, 'error');
    } else {
        date.innerText = data.current_condition.date;
        heure.innerText = data.current_condition.hour;
        nom.innerText = data.city_info.name;
        temperature.innerText = data.current_condition.tmp + "°C";
        condition.innerText = data.current_condition.condition.toLowerCase();
        // génération de l'image des conditions météo de la journée
        icone.src = data.current_condition.icon;
        journee.src = "https://www.prevision-meteo.ch/uploads/widget/" + enleverAccent(data.city_info.name).toLowerCase() + "_0.png";
    }
}

// -----------------------------------------------------------------------------------
// Programme principal
// -----------------------------------------------------------------------------------

// récupérer la position de l'utilisateur
