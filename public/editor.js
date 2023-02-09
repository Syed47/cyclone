// ineditor key bind functions
const codeFold = CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder)

const editor = CodeMirror(document.getElementById("editor"), {
    mode: "text/x-cyclone",
    theme: "twilight",
    tabSize: 4,
    tabMode: 'indent',
    lineNumbers: true,
    keyMap: "sublime",
    lineWrapping: true,
    scrollbarStyle: null, // "native", null
    showCursorWhenSelecting: true,
    autofocus: true,
    cursorBlinkRate: 600,
    cursorHeight: 1,
    matchBrackets: true,
    continuousScanning: 400,
    onGutterClick: codeFold,
    styleActiveLine: true,
    extraKeys: {
        "Ctrl-Q": cm => codeFold(cm, cm.getCursor().line)
    },
    foldGutter: true,
    autoRefresh: true,
    gutters: [
        "CodeMirror-linenumbers", 
        "CodeMirror-foldgutter"
    ]
})





// using this to dynamically set CSS properties of the editor object
const editorOject = document.querySelector(".CodeMirror")

// dynamic font size
const fontSize = document.getElementById("font-size-selector");
fontSize.addEventListener("change", (e) => {
    editorOject.style.fontSize = ((value) => {
        switch(value) {
            case "tiny":    return "12px";
            case "small":   return "14px";
            case "medium":  return "16px";
            case "large":   return "18px";
            case "super":   return "22px";
            default:        return "16px";
        }
    })(fontSize.value)
});

// dynamic theme selection
const theme = document.getElementById("theme-selector");
theme.addEventListener("change", (e) => {
    editor.setOption('theme', ((value) => {
        switch(value) {
            case "cobalt":      return "cobalt";
            case "twilight":    return "twilight";
            case "darcula":     return "darcula";
            case "eclipse":     return "eclipse";
            case "idea":         return "idea";
            default:            return "twilight";
        }
    })(theme.value))
});


