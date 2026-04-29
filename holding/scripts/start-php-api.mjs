/**
 * Запуск встроенного PHP-сервера с явным php.ini (иначе pdo_mysql не подключается).
 * Переменные окружения: PHP_EXE, PHP_INI (необязательно).
 */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const holdingRoot = resolve(__dirname, '..')
const publicDir = join(holdingRoot, 'backend', 'public')

const phpIni = process.env.PHP_INI || 'C:\\php\\php.ini'

let phpExe = process.env.PHP_EXE
if (!phpExe) {
  phpExe = existsSync('C:\\php\\php.exe') ? 'C:\\php\\php.exe' : 'php'
}

console.log('Корень документов:', publicDir)
console.log('PHP:', phpExe)
console.log('php.ini:', phpIni)

if (!existsSync(phpIni)) {
  console.error(
    '\nФайл php.ini не найден:',
    phpIni,
    '\nСоздайте его (копия php.ini-development) или задайте PHP_INI=полный\\путь\\php.ini\n',
  )
  process.exit(1)
}

if (!existsSync(publicDir)) {
  console.error('Не найдена папка public:', publicDir)
  process.exit(1)
}

const args = ['-c', phpIni, '-S', '127.0.0.1:8080', '-t', publicDir]

const child = spawn(phpExe, args, {
  stdio: 'inherit',
  shell: process.platform === 'win32' && phpExe === 'php',
  env: { ...process.env, PHPRC: dirname(phpIni) },
})

child.on('exit', (code) => process.exit(code ?? 0))
