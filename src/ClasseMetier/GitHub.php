<?php
declare(strict_types=1);

namespace ClasseMetier;

use ClasseTechnique\HttpClient;
use ClasseTechnique\UserException;

/**
 * Classe permettant d'interroger l'API GitHub en utilisant le trait HttpClient
 */
class GitHub
{
    use HttpClient;

    private string $token;
    private string $username;

    public function __construct()
    {
        $this->token = getenv('GITHUB_TOKEN') ?: '';
        $this->username = getenv('GITHUB_USERNAME') ?: '';

        if (empty($this->token) || empty($this->username)) {
            throw new UserException("Les variables d'environnement GITHUB_TOKEN et GITHUB_USERNAME sont requises.");
        }

        // Configuration de l'URL de base et du certificat SSL spécifique à l'environnement local
        $this->setBaseUrl('https://api.github.com/');
        $this->setCaInfo('j:/cacert.pem');
    }

    /**
     * Méthode interne pour formater les en-têtes spécifiques exigés par GitHub
     */
    private function requeteGitHub(string $method, string $endpoint = '', ?array $data = null): array
    {
        $headers = [
            'User-Agent: ' . $this->username,
            'Authorization: token ' . $this->token, // GitHub utilise le préfixe 'token' ou 'Bearer'
            'Accept: application/vnd.github+json',
        ];

        return $this->requete($method, $endpoint, $data, null, $headers);
    }

    /**
     * Liste les dépôts accessibles (personnels et organisations)
     * @return array Liste des dépôts
     */
    public function getAll(): array
    {

    }

    /**
     * Récupère uniquement les noms des dépôts accessibles à l'utilisateur
     */
    public function getLesNoms(): array
    {
        $lesDepots = $this->getAll();
        $lesNoms = [];

        foreach ($lesDepots as $depot) {
            $lesNoms[] = $depot["name"];
        }

        return $lesNoms;
    }

    /**
     * Crée un nouveau dépôt
     * @param string $nom Nom du dépôt
     * @param string $description Description du dépôt (optionnelle)
     * @param bool $prive Indique si le dépôt est privé (true) ou public (false)
     * @return array Réponse de l'API GitHub
     */
    public function ajouter(string $nom, string $description = '', bool $prive = true): array
    {

    }

    /**
     * Met à jour un dépôt
     * @param string $nom Nom du dépôt à modifier
     * @param array $lesChamps Champs à modifier (ex: ['description' => 'Nouvelle description', 'private' => false])
     * @return array Réponse de l'API GitHub
     */
    public function modifier(string $nom, array $lesChamps): array
    {

    }

    /**
     * Supprime un dépôt
     * @param string $nom Nom du dépôt à supprimer
     * @return array Réponse de l'API GitHub
     */
    public function supprimer(string $nom): array
    {

    }

    /**
     * Détaille un dépôt en particulier
     * @param string $nom Nom du dépôt à détailler
     * @return array Détails du dépôt
     */
    public function getByName(string $nom): array
    {

    }
}