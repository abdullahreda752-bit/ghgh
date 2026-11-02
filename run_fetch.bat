@echo off
chcp 65001 >nul
set NASA_API_KEY=jqdPJGGKC7NQfdN8CLWK6kNGWj9B6qfTGNRkqpNM
echo Installing Pillow...
pip install pillow
echo Fetching rover photos from NASA...
python "%~dp0fetch_rover_photos.py"
echo.
echo Done. Upload rover_photos.json to the globe page (button: Rover photos).
pause
