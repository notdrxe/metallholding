@echo off
chcp 65001 >nul
cd /d "%~dp0public"

REM Встроенный сервер иногда стартует без php.ini → pdo_mysql не грузится.
REM Явно указываем ini рядом с тем же php.exe, что в PATH, или C:\php.

set "PHP_EXE=C:\php\php.exe"
set "PHP_INI=C:\php\php.ini"

if not exist "%PHP_EXE%" set "PHP_EXE=php"
if not exist "%PHP_INI%" (
  echo Файл не найден: %PHP_INI%
  echo Откройте этот .bat в блокноте и поправьте PHP_EXE и PHP_INI под вашу установку PHP.
  pause
  exit /b 1
)

set "PHPRC=C:\php"

echo Запуск API: http://127.0.0.1:8080  ^(Ctrl+C — остановить^)
echo Используется: "%PHP_EXE%" -c "%PHP_INI%"
"%PHP_EXE%" -c "%PHP_INI%" -S 127.0.0.1:8080
