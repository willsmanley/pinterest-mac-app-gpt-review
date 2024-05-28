# Pinterest Mac App

### Get Started
```
npm i && npm run dev-build && open ./dist/mac-arm64/Pinterest.app
```

### Release Process

To sign/notarize a production release, you have to clone `pinternal/ios` and run `fastlane get_macos_dev_certificates`. Then `npm run release` in this repo. You should make sure to increment the version number in `package.json`.