<?php
namespace ClasseTechnique;

use ClasseTechnique\UserException;

trait HttpClient
{
    protected string $baseUrl = '';
    protected ?string $caInfoPath = null; // Pour gérer un certificat SSL local si besoin

    protected function setBaseUrl(string $url): void
    {
        $this->baseUrl = rtrim($url, '/');
    }

    protected function setCaInfo(string $path): void
    {
        $this->caInfoPath = $path;
    }

    protected function getErreurHttp(int|string|null $codeHttp): string
    {
        if ($codeHttp === null) {
            return "Erreur HTTP : code inconnu";
        }

        $libelles = [
            400 => "Requête incorrecte",
            401 => "Erreur d'authentification",
            403 => "Demande interdite",
            404 => "Page non trouvée",
            405 => "Méthode non autorisée",
            422 => "Données non validées",
            500 => "Erreur interne du serveur",
        ];

        return $libelles[$codeHttp] ?? "Erreur HTTP : " . $codeHttp;
    }

    /**
     * Effectue la requête HTTP cURL
     *
     * @param string $method
     * @param string $endpoint
     * @param array|null $data
     * @param string|null $token
     * @param array $headers En-têtes HTTP personnalisés (fusionnés ou prioritaires)
     */
    protected function requete(string $method, string $endpoint = '', ?array $data = null, ?string $token = null, array $headers = []): array
    {
        if (empty($this->baseUrl)) {
            throw new UserException("L'URL de base n'a pas été initialisée.");
        }

        // En-têtes de base par défaut
        $defaultHeaders = [
            'Accept: application/json',
            'Content-Type: application/json'
        ];

        if ($token !== null) {
            $defaultHeaders[] = 'Authorization: Bearer ' . $token;
        }

        // Fusion des en-têtes
        $headers = array_merge($defaultHeaders, $headers);

        $payload = ($data !== null) ? json_encode($data) : null;

        $ch = curl_init();
        $curlOptions = [
            CURLOPT_URL => $this->baseUrl . '/' . ltrim($endpoint, '/'),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => strtoupper($method),
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_FOLLOWLOCATION => true,
        ];

        // Gestion du certificat SSL local si configuré
        if ($this->caInfoPath !== null && file_exists($this->caInfoPath)) {
            $curlOptions[CURLOPT_CAINFO] = $this->caInfoPath;
        }

        curl_setopt_array($ch, $curlOptions);

        $reponseJson = curl_exec($ch);
        if (curl_errno($ch)) {
            $errorMsg = curl_error($ch);
            throw new UserException("Erreur cURL: " . $errorMsg);
        }

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($httpCode === 204 || empty(trim($reponseJson))) {
            return ['success' => true];
        }

        $response = json_decode($reponseJson, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new UserException("Erreur de décodage JSON.");
        }

        if ($httpCode < 200 || $httpCode >= 300) {
            // Gestion intelligente des erreurs personnalisées renvoyées par les API tierces
            $message = $response['errors'][0]['message'] ?? $response['message'] ?? null;
            $erreur = $response['error'] ?? null;
            if ($message === null && is_array($erreur)) {
                // L'API renvoie {"error": {"global": "..."}} ou {"error": {"champ": "..."}}
                $message = $erreur['global'] ?? implode(' - ', array_filter($erreur, 'is_string'));
            } elseif ($message === null && is_string($erreur)) {
                $message = $erreur;
            }
            if (!is_string($message) || $message === '') {
                $message = $this->getErreurHttp($httpCode);
            }
            throw new UserException($message, $httpCode);
        }

        return $response;
    }
}