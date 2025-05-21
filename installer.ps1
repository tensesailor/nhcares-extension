Invoke-WebRequest -Uri "https://github.com/tensesailor/nhcares-extension/archive/refs/heads/main.zip" -OutFile "$([Environment]::GetFolderPath('UserProfile'))\Downloads\test.zip"

Expand-Archive -Path "$([Environment]::GetFolderPath('UserProfile'))\Downloads\test.zip" -DestinationPath "$([Environment]::GetFolderPath('UserProfile'))\Documents" -Force

Remove-Item -Path "$([Environment]::GetFolderPath('UserProfile'))\Downloads\test.zip" -Recurse

Rename-Item -Path "$([Environment]::GetFolderPath('UserProfile'))\Documents\nhcares-extension-main" -NewName "test-extension" -Force