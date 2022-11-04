const container = document.getElementById("container")
// code folding structure
const  codeFold = CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder)
// Preset properties of the editor
const options = {
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
    continuousScanning: 500,
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
}

const editor = CodeMirror(container, options)

