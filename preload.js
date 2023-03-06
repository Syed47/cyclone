const shell = require('shelljs')
const kill = require("tree-kill")
const path = require('path')
const fs = require('fs')

const AnsiToHTML = require('ansi-to-html');
const ansiText = new AnsiToHTML();

// styling for terminal output
const style = `display: flex; align-items: center; justify-content: left; padding-left: 12px;`;


const Code = {
    process: null,
    stdout: "",
    run: (callback) => {
        const script = "java -jar cyclone.jar ../usercode/code.cyclone " + 
            (process.platform === "win32" ? "*>" : "&>") + 
            " ../usercode/response.txt";
        shell.cd('Cyclone')
        Code.process = shell.exec(script, (_code, _output) => {
            fs.readFile(path.join(__dirname, 'usercode', 'response.txt'), (err, data) => {
                if (err) return console.error(err);
                Code.stdout = Code.process == null ? Code.stdout :
                                    (process.platform === "win32" ? 
                                        data.toString() :
                                        ansiText.toHtml(data.toString())) 
                                        .split('\n')
                                        .map(tag => `<div style="${style}; color: white;">${tag}</div>`)
                                        .join(' ');
                callback(Code.stdout)
            });
            shell.cd("..")
        })
    },

    terminate: (callback) => {
        console.log(process.platform) 
        kill(Code.process.pid, "SIGTERM", (err) => {
            if (err) return callback(err)
            Code.stdout = `<div style="${style}; color: red;"><span>Terminated.</span></div>`;
            Code.process = null
            callback(Code.stdout)
        })
    },

    save: (file, callback) => {
        if (!fs.existsSync('usercode')) fs.mkdirSync('usercode'); 
        const stream = fs.createWriteStream(path.join('usercode', file.name));
        stream.once('open', (fd) => {
            for (const line of file.lines) stream.write(line)
            stream.end();
            const html = `<div style="${style}; color: lime;"><span>Saved</span></div>` +
            `<div style="${style}; font-size:16px; color: lime;"><span>Running ...</span></div>`
            callback(html)
        });
    },

    saveToFile: (file, callback) => {
        
    }
}



require('electron')
    .contextBridge
    .exposeInMainWorld("api", { code: Code })

