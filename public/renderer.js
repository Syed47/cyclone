

// styling for terminal output
const style = `display: flex; align-items: center; justify-content: left; padding-left: 12px`;

// running code and returning response to the DOM
document.getElementById("btn-run").addEventListener('click', (target) => {
    const file = {
        name: "code.cyclone",
        lines: editor.getValue()
    }
    window.api.code.save(file, (response) => {
        document.getElementById('terminal_screen').innerHTML = response
        window.api.code.run((response) => {
            document.getElementById('terminal_screen').innerHTML = response
        })
    })

})


document.getElementById("btn-stop").addEventListener('click', (target) => {
    window.api.code.stop((status) => {
        // console.log(status)
        document.getElementById('terminal_screen').innerHTML += status
    })
})