'use strict';

// -----------------------------------------------------------------------------------
// Import des fonctions nécessaires
// -----------------------------------------------------------------------------------
import {appelAjaxSimple} from "/composant/fonction/ajax.js";

// -----------------------------------------------------------------------------------
// Déclaration des variables globales
// -----------------------------------------------------------------------------------
const date = document.getElementById('date');
const heure = document.getElementById('heure');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const icone = document.getElementById('icone');


// -----------------------------------------------------------------------------------
// Fonctions de traitement
// -----------------------------------------------------------------------------------
/**
 * Affichage des données météo de la ville d'amiens
 * @param {json} data les données météo de la ville
 */
function afficherMeteo(data) {
    date.innerText = data.current_condition.date
    heure.innerText = data.current_condition.hour
    temperature.innerText = data.current_condition.tmp + "°C";
    condition.innerText = data.current_condition.condition.toLowerCase()
    icone.src = data.current_condition.icon;
}


// -----------------------------------------------------------------------------------
// Programme principal
// -----------------------------------------------------------------------------------

// appel ajax simple vers l'aPI météo pour amiens
appelAjaxSimple({
    url: 'https://www.prevision-meteo.ch/services/json/amiens',
    success: afficherMeteo
})






