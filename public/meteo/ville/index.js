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

const search = document.getElementById('search');
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

search.onchange = () => {
    // il faut retirer les accents pour que l'URL soit valide
const ville = enleverAccent(search.value).toLowerCase();
    // appel de l'api pour récupérer les données météo
    appelAjaxSimple({
        url: 'https://www.prevision-meteo.ch/services/json/'+ville,
        success: afficherMeteo
    });
};

/**
 * Affichage des données météo de la ville sélectionnée
 * @param {json} data les données météo de la ville sélectionnée ou errors
 */
function afficherMeteo(data) {
    date.innerText = data.current_condition.date;
    heure.innerText = data.current_condition.hour;
    nom.innerText = data.city_info.name;
    temperature.innerText = data.current_condition.tmp + "°C";
    condition.innerText = data.current_condition.condition.toLowerCase();
    icone.src = data.current_condition.icon;
}

