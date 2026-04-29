<?php

// Имя БД должно совпадать с schema.sql (CREATE DATABASE metallholding).
// Пароль root подставьте свой (в ОСПанели смотрите настройки MySQL).
return [
    // Для php -S и обычного MySQL на ПК: 127.0.0.1. В ОСПанели при сбое подключения попробуйте снова MySQL-8.4 или localhost.
    'host' => '127.0.0.1',
    'port' => 3306,
    'database' => 'metallholding',
    'user' => 'root',
    'password' => '1234',
    'charset' => 'utf8mb4',
];
