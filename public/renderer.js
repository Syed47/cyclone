const run = document.getElementById("btn-run")
const stop = document.getElementById("btn-stop")
const terminal = document.getElementById('terminal_screen')

run.addEventListener('click', saveAndRunCode)
stop.addEventListener('click', terminate)

function saveAndRunCode(target) {
    stop.style.display = "inline";
    run.disabled = true;
    const file = { name: "code.cyclone", lines: editor.getValue() }
    window.api.code.save(file, (stdout) => {
        terminal.innerHTML = stdout
        window.api.code.run((stdout) => {
            terminal.innerHTML = stdout
            run.disabled = false;
            stop.style.display = "none"
        })
    })
}


function terminate(target) {
    stop.disabled = true;
    window.api.code.terminate((stdout) => {
        terminal.innerHTML = stdout
        stop.disabled = false;
        stop.style.display = "none"
    })
}





