const spawnCommand = require('./spawn-command')
const currentVersion = require('../package.json').version

function compareVersions(packageName) {
  spawnCommand(`npm view ${packageName} version`, npmVersion => {
    const versionsAreEqual = currentVersion === npmVersion
    if (versionsAreEqual) {
      throw Error(
        `Current version (${currentVersion}) should be updated/changed (npm: ${npmVersion})`
      )
    } else {
      console.log(
        `Current version (${currentVersion}) is not equals with npm version (npm: ${npmVersion}). That's fine!`
      )
    }
    process.exit(+versionsAreEqual)
  })
}

compareVersions('kanal')
