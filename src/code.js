const shell = require('shelljs')
const kill = require("tree-kill")
const path = require('path')
const fs = require('fs')

const { ansiToHTML, timestamp, html, stdout } = require('./util.js')

const Code = {
    process: null,
    stdout: "",
    output: path.join(__dirname, '..', 'usercode'),
    run: (callback) => {
        const script = "java -jar cyclone.jar ../usercode/code.cyclone " + 
            (process.platform === "win32" ? "*>" : "&>") + 
            " ../usercode/response.txt";
        shell.cd('Cyclone')
        Code.process = shell.exec(script, (_code, _output) => {
            fs.readFile(path.join(Code.output, 'response.txt'), (err, data) => {
                if (err) return console.error(err);
                Code.stdout = Code.process == null ? Code.stdout : 
                    stdout(process.platform === "win32" ? data.toString() :
                        ansiToHTML(data.toString())
                        .split('\n')
                        .map(tag => html(tag))
                        .join(' '));
                callback(Code.stdout)
            });
            shell.cd("..")
        })
    },

    terminate: (callback) => {
        kill(Code.process.pid, "SIGTERM", (err) => {
            if (err) return callback(err)
            Code.stdout = stdout(html("Terminated", "red", true))
            Code.process = null
            callback(Code.stdout)
        })
    },

    save: (file, callback) => {
        if (!fs.existsSync(Code.output)) fs.mkdirSync(Code.output); 
        const stream = fs.createWriteStream(path.join(Code.output, file.name));
        stream.once('open', (fd) => {
            for (const line of file.lines) stream.write(line)
            stream.end();
            const response = stdout(html("Saved", "lime", true))
            callback(response)
        });
    }
}


module.exports = Code;