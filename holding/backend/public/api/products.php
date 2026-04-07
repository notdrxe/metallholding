<?php

declare(strict_types=1);

require_once __DIR__ . '/../../db.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
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
    $db = getDbConnection();
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        $q = isset($_GET['q']) ? trim((string) $_GET['q']) : '';
        $category = isset($_GET['category']) ? trim((string) $_GET['category']) : '';
        $sql = 'SELECT * FROM products';
        $where = [];
        $params = [];

        if ($q !== '') {
            $where[] = '(name LIKE :q OR description LIKE :q OR category LIKE :q)';
            $params[':q'] = '%' . $q . '%';
        }

        if ($category !== '') {
            $where[] = 'category = :category';
            $params[':category'] = $category;
        }

        if (!empty($where)) {
            $sql .= ' WHERE ' . implode(' AND ', $where);
        }

        $sql .= ' ORDER BY id DESC';
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        sendJson($stmt->fetchAll());
    }

    if ($method === 'POST') {
        $payload = jsonInput();
        $error = validatePayload($payload);
        if ($error !== null) {
            sendJson(['message' => $error], 400);
        }

        $stmt = $db->prepare(
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

        $id = (int) $db->lastInsertId();
        $rowStmt = $db->prepare('SELECT * FROM products WHERE id = :id');
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

        $exists = $db->prepare('SELECT id FROM products WHERE id = :id');
        $exists->execute([':id' => $id]);
        if (!$exists->fetch()) {
            sendJson(['message' => 'Товар не найден.'], 404);
        }

        $stmt = $db->prepare(
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

        $rowStmt = $db->prepare('SELECT * FROM products WHERE id = :id');
        $rowStmt->execute([':id' => $id]);
        sendJson($rowStmt->fetch());
    }

    if ($method === 'DELETE') {
        $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
        if ($id <= 0) {
            sendJson(['message' => 'Некорректный id.'], 400);
        }

        $exists = $db->prepare('SELECT id FROM products WHERE id = :id');
        $exists->execute([':id' => $id]);
        if (!$exists->fetch()) {
            sendJson(['message' => 'Товар не найден.'], 404);
        }

        $stmt = $db->prepare('DELETE FROM products WHERE id = :id');
        $stmt->execute([':id' => $id]);
        sendJson(['ok' => true], 200);
    }

    sendJson(['message' => 'Method Not Allowed'], 405);
} catch (Throwable $exception) {
    sendJson(['message' => 'Server error', 'error' => $exception->getMessage()], 500);
}
