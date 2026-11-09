<?php
namespace ClasseMetier;

use ClasseTechnique\HttpClient;

class ConsultationCalendrier
{
    // On "clipse" le trait ici

    public function __construct()
    {
        // On initialise l'URL propre à ce client métier
    }

    public function getAll(): array
    {
        // La méthode requete() provient directement du trait HttpClient
    }

    public function getById(string $id): array
    {
    }
}