Invoke-WebRequest -Uri "https://github.com/tensesailor/nhcares-extension/archive/refs/heads/main.zip" -OutFile "c:\Users\mitcht\Downloads\test.zip"

Expand-Archive -Path "c:\Users\mitcht\Downloads\test.zip" -DestinationPath "c:\Users\mitcht\Downloads" -Force

Remove-Item -Path "c:\Users\mitcht\Downloads\test.zip" -Recurse