<?php
declare(strict_types=1);

use ClasseMetier\GestionCalendrier;
use ClasseTechnique\ReponseJson;
use ClasseTechnique\Requete;

/** @noinspection PhpIncludeInspection */
require $_SERVER['DOCUMENT_ROOT'] . '/../bootstrap/bootstrap.php';

// Vérification d'un appel AJAX par la méthode POST avec jeton


// Récupération de l'identifiant de l'épreuve à supprimer


// Création de l'objet métier pour gérer le calendrier


// Appel de la méthode pour supprimer l'épreuve du calendrier

// Si une erreur est survenue, envoyer l'erreur en réponse JSON


// Si tout s'est bien passé, envoyer les données retournées par l'API (clé 'data') en réponse JSON
