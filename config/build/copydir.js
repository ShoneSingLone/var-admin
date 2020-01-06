const fsextra = require('fs-extra');
const path = require('path');

let sourceDir = path.resolve(__dirname, './../../dist/');
const deployStaticsDir = path.resolve("G:/GitHub/ShoneSingLone.github.io/vue-admin");
const deployStaticsDirWithServer = path.resolve("G:/GitHub/webappserver/dist/frontassets");
// Sync:
if (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV) {
    console.log('__dirname:', __dirname, '\nfrom:', sourceDir, '\nto:', deployStaticsDir)
    fsextra.emptyDir(deployStaticsDir)
        .then(() => fsextra.copy(sourceDir, deployStaticsDir))
        .then(() => {
            console.log('copied! 1', deployStaticsDir)
        })
        .catch(err => {
            console.error(err)
        });
    fsextra.emptyDir(deployStaticsDirWithServer)
        .then(() => fsextra.copy(sourceDir, deployStaticsDirWithServer))
        .then(() => {
            console.log('copied! 2', deployStaticsDir)
        })
        .catch(err => {
            console.error(err)
        });
}