// running code and returning response to the DOM
document.getElementById("btn-run").addEventListener('click', (target) => {
    const file = {
        name: "code.cyclone",
        lines: editor.getValue()
    }
    window.api.script.save(file, (res) => {
        window.api.script.run((response) => {
            document.getElementById('terminal_screen').innerHTML = response
        })
    })

})


