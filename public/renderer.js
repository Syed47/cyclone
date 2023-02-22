const run = document.getElementById("btn-run")
const stop = document.getElementById("btn-stop")
const terminal = document.getElementById('terminal_screen')


stop.style.display = "none";

// running code and returning response to the DOM
run.addEventListener('click', (target) => {
    stop.style.display = "inline";
    run.disabled = true;
    // stop.disabled = false;
    // run.style.backgroundColor = "gray";
    const file = { name: "code.cyclone", lines: editor.getValue() }
    window.api.code.save(file, (response) => {
        terminal.innerHTML = response
        window.api.code.run((response) => {
            terminal.innerHTML = response
            run.disabled = false;
            stop.style.display = "none"
            // run.style.backgroundColor = "rgb(15, 14, 69)";
        })
    })

})


stop.addEventListener('click', (target) => {
    // run.disabled = false;
    stop.disabled = true;
    // stop.style.backgroundColor = "gray";
    window.api.code.stop((status) => {
        terminal.innerHTML += status
        stop.disabled = false;
        stop.style.display = "none"
        // stop.style.backgroundColor = "rgb(15, 14, 69)";
    })
})