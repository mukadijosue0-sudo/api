<?php
declare(strict_types=1);

namespace ClasseMetier;

use ClasseTechnique\HttpClient;
use ClasseTechnique\UserException;

class GestionCalendrier
{
    // On "clipse" le même trait pour bénéficier des requêtes cURL
    use HttpClient;

    private string $token;

    /**
     * Constructeur : Initialise l'URL et vérifie la présence du token d'administration.
     *
     * @throws UserException Si aucun token n'est trouvé
     */
    public function __construct()
    {
        // Récupération sécurisée du token via l'opérateur Elvis
        $this->token = getenv('CALENDRIER_TOKEN') ?: '';

        if (empty($this->token)) {
            throw new UserException("Un jeton d'authentification (Token) est obligatoire pour instancier le gestionnaire du calendrier.");
        }

        // On initialise l'URL propre à l'API de gestion
        $this->setBaseUrl('http://apicalendrier/');
    }

    /**
     * Ajoute une nouvelle épreuve dans le calendrier.
     *
     * @param array $data Données de la course à ajouter
     * @return array Réponse de l'API (succès / données créées)
     */
    public function ajouter(array $data): array
    {

    }

    /**
     * Modifie partiellement ou totalement une épreuve existante.
     *
     * @param string $id Identifiant unique de l'épreuve (ex: numéro FFA)
     * @param array $lesChamps Champs à modifier
     * @return array Réponse de l'API
     */
    public function modifier(string $id, array $lesChamps): array
    {

    }

    /**
     * Supprime une épreuve du calendrier.
     *
     * @param string $id Identifiant unique de l'épreuve à supprimer
     * @return array Réponse de l'API
     */
    public function supprimer(string $id): array
    {

    }
}