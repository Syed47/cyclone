const shell = require('shelljs')
const kill = require("tree-kill")
const path = require('path')
const fs = require('fs')
const { os, html, stdout, ansiToHTML, timestamp } = require('./util.js')

const Code = {
    process: null, 
    trace: null,
    stdout: "",
    sandbox: path.join(__dirname, '..', 'sandbox'),
    run: (callback) => {
        const script = (os("win32") ? "" : "export LD_LIBRARY_PATH=. && ") + 
            "java -jar cyclone.jar ../sandbox/code.cyclone " + 
            (os("win32") ? "1> ../sandbox/response.txt 2>&1" : "&> ../sandbox/response.txt");

        shell.cd('Cyclone')
        Code.process = shell.exec(script, (_code, _output) => {
            fs.readFile(path.join(Code.sandbox, 'response.txt'), (err, data) => {
                if (err) return callback(null, null)
                const content = data.toString()
                const response = os("win32") ? content : ansiToHTML(content)
                Code.trace = null
                if (Code.process !== null) {
                    Code.stdout = stdout(response).split('\n')
                        .map(tag => html(tag, color=os("win32") ? "white" : null))
                        .join(' ');
                    const findTrace = /.*Trace\sGenerated:.*(\\|\/)(\w+)\.(trace|dot).*/
                    const traced = content.match(findTrace)
                    if (traced !== null && traced.length > 3) {
                        Code.trace = traced[2] + "." + traced[3]
                    }
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
        if (!fs.existsSync(Code.sandbox)) fs.mkdirSync(Code.sandbox); 
        fs.writeFile(path.join(Code.sandbox, "code.cyclone"), content, (err) => {
            if (err) callback(stdout(html("Error", "orange", true)))
            else callback(stdout(html("Saved", "lime", true)))
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