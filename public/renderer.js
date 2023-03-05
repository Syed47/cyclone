const run = document.getElementById("btn-run")
const stop = document.getElementById("btn-stop")
const terminal = document.getElementById('terminal_screen')

run.addEventListener('click', saveAndRunCode)
stop.addEventListener('click', terminate)

function saveAndRunCode(target) {
    stop.style.display = "inline";
    run.disabled = true;
    const file = { name: "code.cyclone", lines: editor.getValue() }
    window.api.event.save(file, (response) => {
        terminal.innerHTML = response
        window.api.event.run((response) => {
            console.log(response)
            terminal.innerHTML = response
            run.disabled = false;
            stop.style.display = "none"
        })
    })
}



function terminate(target) {
    stop.disabled = true;
    window.api.event.stop((status) => {
        terminal.innerHTML += status
        stop.disabled = false;
        stop.style.display = "none"
    })
}





