# Notarytool for Signing/Notarizing

Submitting a notarization request to Apple:
1. Zip the .app file
```
ditto -c -k --keepParent /path/to/app.app /path/to/newZippedApp.zip
```
2. Submit the file for notarization
```
xcrun notarytool submit --apple-id "appleIdHere" --password "appSpecificPwHere" --team-id "teamIdHere" /path/to/app.zip
```

Checking the status of a notarization request
```
xcrun notarytool info --apple-id "appleId" --password "appSpecificPw" --team-id "teamId" someSubmissionIdHere
```