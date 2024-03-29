(function() {
    "use strict";

    const cache = { code: undefined }

    const fontSize = $.getElementById("font-size-selector");
    const font = $.getElementById("font-selector");
    const theme = $.getElementById("theme-selector");

    const save = $.getElementById("btn-save")
    const trace = $.getElementById("btn-trace")
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
    trace.addEventListener('click', showTrace)
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


    function changeFontSize() {
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

    function changeFont() {
        editorInstance.style.fontFamily = ((value) => {
            switch(value) {
                case "Arial":   return "Arial";
                case "Comic":  return "Comic Sans MS";
                case "Courier": return "Courier";
                default:        return "Courier";
            }
        })(font.value)
    }

    function changeTheme() {
        editor.setOption('theme', ((value) => {
            switch(value) {
                case "solarized": return "solarized";
                case "eclipse":   return "eclipse";

                case "monokai":   return "monokai";
                case "darcula":   return "darcula";
                case "dracula":   return "dracula";
                case "ambiance":  return "ambiance";
                case "matrix":    return "the-matrix";
                case "seti":      return "seti";
                default:          return "ambiance";
            }
        })(theme.value))
    }

    function saveToFile() {
        const content = editor.getValue();
        const blob = new Blob([content], { type: 'text/plain' });

        const anchor = $.createElement('a');
        anchor.download = run.disabled ? "graph.dot" : "code.cyclone";
        anchor.href = URL.createObjectURL(blob);
        anchor.style.display = 'none';

        $.body.appendChild(anchor);
        anchor.click();
        $.body.removeChild(anchor);
    }

    function showTrace() {
        if (run.disabled) {
            run.disabled = false
            editor.setValue(cache.code)
        } else {
            cache.code = editor.getValue()
            window.api.code.trace(trace => {
                if (trace === null) {
                    alert("Trace not found")
                } else {
                    run.disabled = true
                    editor.setValue(trace)
                }
            })
        }
    }

    function execute() {
        stop.style.display = "inline";
        run.disabled = true;
        window.api.code.save(editor.getValue(), (stdout) => {
            terminal.innerHTML = stdout
            window.api.code.run((stdout, tracee) => {
                terminal.innerHTML = stdout
                run.disabled = false;
                stop.style.display = "none"
                trace.disabled = !tracee
            })
        })
    }

    function terminate() {
        stop.disabled = true;
        window.api.code.terminate((stdout) => {
            terminal.innerHTML = stdout
            stop.disabled = false;
            stop.style.display = "none"
            trace.disabled = true
        })
    }
}())

