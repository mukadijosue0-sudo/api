'use strict';

// -----------------------------------------------------------------------------------
// Import des fonctions nécessaires
// -----------------------------------------------------------------------------------
import {messageBox} from "/composant/fonction/afficher.js";
import {appelAjaxSimple, appelAjax} from "/composant/fonction/ajax.js";
import {enleverAccent} from "/composant/fonction/chaine.js";

// -----------------------------------------------------------------------------------
// Déclaration des variables globales
// -----------------------------------------------------------------------------------

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
// Fonctions de traitement
// -----------------------------------------------------------------------------------

function rechercherMeteo(ville) {

    // il faut retirer les accents pour que l'URL soit valide
    ville = enleverAccent(ville).toLowerCase();

    // appel de l'api pour récupérer les données météo
    appelAjaxSimple({
        url: 'https://www.prevision-meteo.ch/services/json/' + ville,
        success: afficherMeteo
    });



}

/**
 * Affichage des données météo de la ville sélectionnée
 * @param {json} data les données météo de la ville sélectionnée ou errors
 */
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
        icone.src = data.current_condition.icon;
        journee.src = "https://www.prevision-meteo.ch/uploads/widget/" + enleverAccent(data.city_info.name).toLowerCase() + "_0.png";
    }
}


// -----------------------------------------------------------------------------------
// Programme principal
// -----------------------------------------------------------------------------------
rechercherMeteo('Marseille');
// paramétrage du composant autoComplete

const autoCompleteJS = new autoComplete({

    selector: "#search",
    thershold: 1,
    debounce: 300,

    data: {
        src: async (query) => {
            const response = await AppelAjax({
                url: "https://geo.api.gouv.fr/communes?fields=nom&boost=population&nom=" + query,
                    method: "GET",
                    dataType: "json",
            });
            return response?? [];
        },
        keys: ["name"],
        cache: false
    },
    searchEngine: "loose",

    resultsList: {
        maxResults: 10,
    },


    resultItem: {
       highlight:true,
        element: (item, data) => {
            item.innerHTML = `<span>${data.match}</span>`;
        }
    },

    events: {
        input: {
            selection: (event) => {
                const ville = event.detail.selection.value.nom;
                search.value = ville;
                rechercherMeteo(ville);
            }
        }
    }
});