<?php
declare(strict_types=1);

use ClasseMetier\ConsultationCalendrier;
use ClasseTechnique\Page;
use ClasseTechnique\Requete;

/** @noinspection PhpIncludeInspection */
require $_SERVER['DOCUMENT_ROOT'] . "/../bootstrap/bootstrap.php";

// Récupération de l'identifiant de l'épreuve à modifier
$id = Requete::getString('id');

// Interrogation de l'API pour obtenir l'épreuve
$calendrier = new ConsultationCalendrier();
$reponse = $calendrier->getById($id);

if (empty($reponse['data'])) {
    header('Location: ../liste/');
    exit;
}

// alimentation et affichage de l'interface
$page = new Page();
$page->setTitre("Modification d'une épreuve")
    ->setDonnee("epreuve", $reponse['data'])
    ->afficher();
