<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

echo json_encode(
    [
        'php_version' => PHP_VERSION,
        'php_binary' => PHP_BINARY,
        'sapi' => PHP_SAPI,
        'php_ini_loaded' => php_ini_loaded_file() ?: '(none)',
        'extension_dir' => ini_get('extension_dir'),
        'pdo_mysql_loaded' => extension_loaded('pdo_mysql'),
        'hint' => extension_loaded('pdo_mysql')
            ? 'OK — этот PHP видит pdo_mysql. Если ошибка всё равно есть, смотрите другой хост/порт.'
            : 'В php.ini этого PHP включите extension_dir и extension=pdo_mysql, перезапустите веб-сервер.',
    ],
    JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
);
