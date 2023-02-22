const { contextBridge } = require('electron')
const shell = require('shelljs')
const path = require('path')
const fs = require('fs')
const child_process = require('child_process');


var Convert = require('ansi-to-html');
var convert = new Convert();


// styling for terminal output
const style = `display: flex; align-items: center; justify-content: left; padding-left: 12px`;


const code = {
    status: false,
    process: null,
    run: (callback) => {
        code.status = false
        shell.cd('Cyclone')
        const script = `java -jar cyclone.jar ../usercode/code.cyclone &> ../usercode/response.txt`
        code.process = shell.exec(script, (_code, _output) => {
            fs.readFile(path.join(__dirname, 'usercode', 'response.txt'), (err, data) => {
                if (err) return console.error(err);
                let htmllines = convert.toHtml(data.toString())
                    .split('\n')
                    .map(tag => `<div style="${style}">${tag}</div>`)
                    .join(' ')
                if (code.status) {
                    htmllines += `<br><div style="${style}; color: red;"><span>Stopped.</span></div>`;
                }
                callback(htmllines)
            });
            shell.cd("..")
        })
    },

    stop: (callback) => {
        if (code.process !== null) {
            code.status = code.process.kill('SIGKILL')
            callback(code.status)
        }
    },

    save: (file, callback) => {
        if (!fs.existsSync('usercode')){
            fs.mkdirSync('usercode');
        }
        var stream = fs.createWriteStream(path.join('usercode', file.name));
        stream.once('open', function(fd) {
            for (const line of file.lines) {
                stream.write(line)
            }
            stream.end();
            const html = `<div style="${style}; font-size:16px; color: lime;"><span>Saved</span></div>` +
            `<div style="${style}; font-size:16px; color: lime;"><span>Running ...</span></div>`
            callback(html)
        });
    }
}




contextBridge.exposeInMainWorld("api", { code })


