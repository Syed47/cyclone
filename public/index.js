(function() {
    "use strict";

    const fontSize = $.getElementById("font-size-selector");
    const font = $.getElementById("font-selector");
    const theme = $.getElementById("theme-selector");

    const save = $.getElementById("btn-save")
    const run = $.getElementById("btn-run")
    const stop = $.getElementById("btn-stop")
    const collapse = $.getElementById("btn-collapse")
    const terminal = $.getElementById('terminal_screen')

    fontSize.addEventListener("change", changeFontSize)
    font.addEventListener("change", changeFont);
    theme.addEventListener("change", changeTheme);

    run.addEventListener('click', execute)
    stop.addEventListener('click', terminate)
    save.addEventListener('click', saveToFile)
    collapse.addEventListener('click', showHideMenu)


    function showHideMenu() {
        if (fontSize.style.display === "inline" && 
            font.style.display === "inline" &&
            theme.style.display === "inline") {

            fontSize.style.display = "none"
            font.style.display = "none"
            theme.style.display = "none"
        } else {
            fontSize.style.display = "inline"
            font.style.display = "inline"
            theme.style.display = "inline"
        }
    }

    function changeFontSize(target) {
        editorInstance.style.fontSize = ((value) => {
            switch(value) {
                case "tiny":    return "12px";
                case "small":   return "14px";
                case "medium":  return "16px";
                case "large":   return "18px";
                case "super":   return "20px";
                default:        return "16px";
            }
        })(fontSize.value)
    }

    function changeFont(target) {
        editorInstance.style.fontFamily = ((value) => {
            switch(value) {
                case "Arial":   return "Arial";
                case "Comic":  return "Comic Sans MS";
                case "Courier": return "Courier";
                default:        return "Courier";
            }
        })(font.value)
    }

    function changeTheme(target) {
        editor.setOption('theme', ((value) => {
            switch(value) {
                case "solarized": return "solarized";
                case "eclipse":   return "eclipse";

                case "monokai":   return "monokai";
                case "darcula":   return "darcula";
                case "dracula":   return "dracula";
                case "ambiance":  return "ambiance";
                case "material":  return "material";
                case "matrix":    return "the-matrix";
                case "seti":      return "seti";
                default:          return "ambiance";
            }
        })(theme.value))
    }

    function saveToFile(target) {
        const content = editor.getValue();
        const blob = new Blob([content], { type: 'text/plain' });

        const anchor = $.createElement('a');
        anchor.download = "code.cyclone";
        anchor.href = URL.createObjectURL(blob);
        anchor.style.display = 'none';

        $.body.appendChild(anchor);
        anchor.click();
        $.body.removeChild(anchor);
    }

    function execute(target) {
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
}())

