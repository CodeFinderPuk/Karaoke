@echo off
echo.
echo  ============================================
echo   Echo Karaoke - запуск сервера
echo  ============================================
echo.

:: Проверяем Python
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo  Найден Python, запускаю сервер...
    echo  Открывай браузер: http://localhost:8080
    echo  Чтобы остановить: закрой это окно
    echo.
    start "" http://localhost:8080
    python -m http.server 8080
    goto end
)

python3 --version >nul 2>&1
if %errorlevel% == 0 (
    echo  Найден Python3, запускаю сервер...
    echo  Открывай браузер: http://localhost:8080
    echo  Чтобы остановить: закрой это окно
    echo.
    start "" http://localhost:8080
    python3 -m http.server 8080
    goto end
)

:: Проверяем Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo  Найден Node.js, запускаю сервер...
    echo  Открывай браузер: http://localhost:8080
    echo.
    start "" http://localhost:8080
    npx --yes serve -p 8080
    goto end
)

:: PowerShell fallback (встроен в Windows 7+)
echo  Запускаю через PowerShell...
echo  Открывай браузер: http://localhost:8080
echo  Чтобы остановить: закрой это окно
echo.
start "" http://localhost:8080
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8080/'); $listener.Start(); Write-Host ' Сервер запущен на http://localhost:8080'; while ($listener.IsListening) { $ctx = $listener.GetContext(); $req = $ctx.Request; $res = $ctx.Response; $path = $req.Url.LocalPath.TrimStart('/'); if ($path -eq '') { $path = 'index.html' }; $file = Join-Path (Get-Location) $path; if (Test-Path $file) { $bytes = [System.IO.File]::ReadAllBytes($file); $ext = [System.IO.Path]::GetExtension($file); $mime = @{'.html'='text/html';'.css'='text/css';'.js'='application/javascript';'.mp3'='audio/mpeg';'.jpg'='image/jpeg';'.jpeg'='image/jpeg';'.png'='image/png';'.lrc'='text/plain'}[$ext]; if (-not $mime) { $mime = 'application/octet-stream' }; $res.ContentType = $mime; $res.ContentLength64 = $bytes.Length; $res.OutputStream.Write($bytes, 0, $bytes.Length) } else { $res.StatusCode = 404 }; $res.OutputStream.Close() }"

:end
