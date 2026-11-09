<?php
declare(strict_types=1);

use ClasseMetier\ConsultationCalendrier;
use ClasseTechnique\Page;
use ClasseMetier\GitHub;

/** @noinspection PhpIncludeInspection */
require $_SERVER['DOCUMENT_ROOT'] . "/../bootstrap/bootstrap.php";

// instanciation d'un objet ConsultationCalendrier


// alimentation et affichage de l'interface
$page = new Page();
$page->setTitre("Gestion du calendrier ")

    ->avecJeton()
    ->afficher();