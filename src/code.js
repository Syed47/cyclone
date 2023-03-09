const shell = require('shelljs')
const kill = require("tree-kill")
const path = require('path')
const fs = require('fs')
const { 
    os, 
    html, 
    stdout, 
    ansiToHTML, 
    timestamp, 
} = require('./util.js')

const Code = {
    process: null,
    trace: null,
    stdout: "",
    output: path.join(__dirname, '..', 'usercode'),
    run: (callback) => {
        const script = "java -jar cyclone.jar ../usercode/code.cyclone " + 
            (os("win32") ? "*>" : "&>") + 
            " ../usercode/response.txt";

        shell.cd('Cyclone')

        Code.process = shell.exec(script, (_code, _output) => {
            fs.readFile(path.join(Code.output, 'response.txt'), (err, data) => {
                if (err) return console.error(err);

                const response = os("win32") ? 
                    data.toString() : 
                    ansiToHTML(data.toString())
                Code.stdout = Code.process === null ? Code.stdout : stdout(response)
                    .split('\n')
                    .map(tag => html(tag, color=os("win32") ? "white" : null))
                    .join(' ');    


                const traced = data.toString().match(/.*Trace\sGenerated:.*(\\|\/)(\w+)\.(trace|dot).*/)
                if (traced && traced.length > 1) {
                    Code.trace = traced[2] + "." + traced[3]
                } else {
                    Code.trace = null
                }


                callback(Code.stdout, Code.trace)
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

    save: (content, callback) => {
        if (!fs.existsSync(Code.output)) fs.mkdirSync(Code.output); 
        fs.writeFile(path.join(Code.output, "code.cyclone"), content, (err) => {
            if (err) console.error(err);
            const response = stdout(html("Saved", "lime", true))
            callback(response)
        });
    },

    trace: (callback) => {
        const traceFile = path.join(__dirname, '..', 'Cyclone', 'trace', Code.trace)
        fs.readFile(traceFile, (err, data) => {
            if (err) callback(null)
            else callback(data.toString())
        });
    }
}


module.exports = Code;