@echo off
cd /d "%~dp0"
echo Iniciando servidor de Inventario Almacen...
start "Servidor Inventario Almacen" cmd /k npm run dev
timeout /t 5 /nobreak >nul
start http://localhost:5173
