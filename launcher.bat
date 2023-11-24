start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --window-position=0,0 --kiosk http://localhost:8000/index2.html  --user-data-dir=c:/monitor1
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --window-position=1920,0 --kiosk http://localhost:8000/ --user-data-dir=c:/monitor2
node index.js
