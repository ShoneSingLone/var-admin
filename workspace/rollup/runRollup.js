/* var exec = require('child_process').exec;

exec([' -c ./rollup.config.js'], function (err, out, code) {
    if (err instanceof Error)
        throw err;
    process.stderr.write(err);
    process.stdout.write(out);
    process.exit(code);
    '-c ./rollup.config.js'
}); */

/* const execa = require('execa');

(async () => {
    try {
        await execa('ls');
    } catch (error) {
        console.log(error);
    }
})(); */

const {
    spawn
} = require('child_process');
const path = require("path");
const ls = spawn('rollup.cmd', ["-c", path.resolve(__dirname, "./rollup.config.js")]);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});