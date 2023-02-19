const { contextBridge } = require('electron')
const shell = require('shelljs')
const path = require('path')
const fs = require('fs')

var Convert = require('ansi-to-html');
var convert = new Convert();

const API = {
    script: {
        run: (callback) => {
            shell.cd('Cyclone')
            const script = `java -jar cyclone.jar ../usercode/code.cyclone &> ../usercode/response.txt`
            shell.exec(script, (code, output) => {
                fs.readFile(path.join(__dirname, 'usercode', 'response.txt'), (err, data) => {
                    if (err) return console.error(err);
                    const style = `
                        display: flex; 
                        align-items: center; 
                        justify-content: left;
                        padding-left: 12px`;
                    const htmllines = convert.toHtml(data.toString())
                        .split('\n')
                        .map(tag => `<div style="${style}">${tag}</div>`)
                        .join(' ');
                    callback(htmllines)
                });
            })
            shell.cd("..")
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
                callback()
            });
        }
    }
}




contextBridge.exposeInMainWorld("api", API)


