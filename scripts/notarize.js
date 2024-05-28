const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
    // return;

  const { electronPlatformName, appOutDir } = context;  

  // darwin is internal name for macOS. don't notarize for windows/linux builds
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    appBundleId: 'com.pinterest.betaapp',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: 'willsmanley@gmail.com',
    appleIdPassword: 'qfxw-pszq-ykfk-jlgy',
    teamId: 'USWZA8CBCS',
  });
};