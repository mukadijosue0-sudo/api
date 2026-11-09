<?php
declare(strict_types=1);

use ClasseTechnique\Page;
use ClasseMetier\GitHub;

/** @noinspection PhpIncludeInspection */
require $_SERVER['DOCUMENT_ROOT'] . "/../bootstrap/bootstrap.php";

// instanciation d'un objet GitHub

// alimentation et affichage de l'interface
$page = new Page();
$page->setTitre("Liste de mes référentiels GitHub")

    ->afficher();

