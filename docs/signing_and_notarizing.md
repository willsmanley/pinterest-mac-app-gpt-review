# Signing/Notarizing a Mac App

1. Create a Certificate Signing Request (CSR): https://developer.apple.com/help/account/create-certificates/create-a-certificate-signing-request
2. Create a new Certificate: https://developer.apple.com/account/resources/certificates/list
    1. Select Developer ID Application (outside Mac App Store)
    2. Select Previous Sub-CA and upload your CSR
    3. Download the Certificate and open the file to load it into Keychain
3. Check the certificate in Keychain Access. It should be called something like "Developer ID Application: Pinterest". It should have a dropdown arrow with a private key below it. If the private key is missing, start over.
4. Check in terminal to make sure the certificate is OK for signing: `security find-identity -p codesigning -v` should output something like `xxx "Developer ID Application: Pinterest (USWZA8CBCS)"
     1 valid identities found`
5. On the electron side, put in your Apple ID (connected to apple developer account) and make an app-specific password (as environment variables, not committed to codebase): https://support.apple.com/en-us/102654
6. Use the team ID from apple developer account.
