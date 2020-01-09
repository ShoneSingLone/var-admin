/* copydir.js */
const fsextra = require("fs-extra");
const path = require("path");

let sourceDir = path.join(__dirname, "../public");
const basePath = `D:/Users/Administrator/Documents/GitHub/ShoneSingLone.github.io`
let deployStaticsDir = path.join(basePath, `var-admin`);
console.log(sourceDir, " ", deployStaticsDir);
(async () => {
    try {
        await fsextra.copy(sourceDir, deployStaticsDir)
        console.log("copied! 1", deployStaticsDir);
    } catch (error) {
        console.error(err);
    }
})();