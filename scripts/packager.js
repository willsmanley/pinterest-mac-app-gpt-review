const packager = require('@electron/packager')
packager.default({
  dir: '/Users/wmanley/code/pinterest-mac-app',
  osxSign: {},
  osxNotarize: {
    appleId: 'willsmanley@gmail.com',
    appleIdPassword: 'qfxw-pszq-ykfk-jlgy',
    teamId: 'USWZA8CBCS',
  }
})