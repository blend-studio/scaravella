<?php
namespace App\Core;

class Router {
    private $routes = [];

    public function post($path, $callback) {
        $this->routes['POST'][$path] = $callback;
    }

    public function resolve() {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        // Gestione CORS Preflight
        if ($method === 'OPTIONS') {
            http_response_code(200);
            exit();
        }

        $callback = $this->routes[$method][$path] ?? false;

        if (!$callback) {
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
            return;
        }

        // Istanzia il controller ed esegui il metodo: [NomeClasse, NomeMetodo]
        if (is_array($callback)) {
            $controller = new $callback[0]();
            $method = $callback[1];
            return $controller->$method();
        }
    }
}