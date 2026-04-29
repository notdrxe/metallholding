<?php

declare(strict_types=1);

require_once __DIR__ . '/../../db.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function jsonInput(): array
{
    $raw = file_get_contents('php://input');
    if (!$raw) {
        return [];
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function sendJson(mixed $data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function validatePayload(array $payload): ?string
{
    $required = ['name', 'category', 'image', 'description', 'thickness', 'length_mm', 'width_mm', 'price_rub'];
    foreach ($required as $field) {
        if (!isset($payload[$field]) || $payload[$field] === '') {
            return "Поле {$field} обязательно.";
        }
    }
    return null;
}

try {
    $pdo = db();
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'POST') {
        $payload = jsonInput();
        $error = validatePayload($payload);
        if ($error !== null) {
            sendJson(['message' => $error], 400);
        }

        $stmt = $pdo->prepare(
            'INSERT INTO products (name, category, image, description, thickness, length_mm, width_mm, price_rub)
             VALUES (:name, :category, :image, :description, :thickness, :length_mm, :width_mm, :price_rub)'
        );

        $stmt->execute([
            ':name' => (string) $payload['name'],
            ':category' => (string) $payload['category'],
            ':image' => (string) $payload['image'],
            ':description' => (string) $payload['description'],
            ':thickness' => (string) $payload['thickness'],
            ':length_mm' => (int) $payload['length_mm'],
            ':width_mm' => (int) $payload['width_mm'],
            ':price_rub' => (int) $payload['price_rub'],
        ]);

        $id = (int) $pdo->lastInsertId();
        $rowStmt = $pdo->prepare('SELECT * FROM products WHERE id = :id');
        $rowStmt->execute([':id' => $id]);
        sendJson($rowStmt->fetch(), 201);
    }

    if ($method === 'PUT') {
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        if ($id <= 0) {
            sendJson(['message' => 'Некорректный id.'], 400);
        }

        $payload = jsonInput();
        $error = validatePayload($payload);
        if ($error !== null) {
            sendJson(['message' => $error], 400);
        }

        $exists = $pdo->prepare('SELECT id FROM products WHERE id = :id');
        $exists->execute([':id' => $id]);
        if (!$exists->fetch()) {
            sendJson(['message' => 'Товар не найден.'], 404);
        }

        $stmt = $pdo->prepare(
            'UPDATE products
             SET name = :name, category = :category, image = :image, description = :description, thickness = :thickness,
                 length_mm = :length_mm, width_mm = :width_mm, price_rub = :price_rub
             WHERE id = :id'
        );

        $stmt->execute([
            ':id' => $id,
            ':name' => (string) $payload['name'],
            ':category' => (string) $payload['category'],
            ':image' => (string) $payload['image'],
            ':description' => (string) $payload['description'],
            ':thickness' => (string) $payload['thickness'],
            ':length_mm' => (int) $payload['length_mm'],
            ':width_mm' => (int) $payload['width_mm'],
            ':price_rub' => (int) $payload['price_rub'],
        ]);

        $rowStmt = $pdo->prepare('SELECT * FROM products WHERE id = :id');
        $rowStmt->execute([':id' => $id]);
        sendJson($rowStmt->fetch());
    }

    if ($method === 'DELETE') {
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        if ($id <= 0) {
            sendJson(['message' => 'Некорректный id.'], 400);
        }

        $exists = $pdo->prepare('SELECT id FROM products WHERE id = :id');
        $exists->execute([':id' => $id]);
        if (!$exists->fetch()) {
            sendJson(['message' => 'Товар не найден.'], 404);
        }

        $stmt = $pdo->prepare('DELETE FROM products WHERE id = :id');
        $stmt->execute([':id' => $id]);
        sendJson(['ok' => true], 200);
    }

    sendJson(['message' => 'Каталог отдаётся через GET /api/catalog.php'], 404);
} catch (Throwable $e) {
    sendJson(['message' => $e->getMessage()], 500);
}
