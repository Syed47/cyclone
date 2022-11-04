const container = document.getElementById("container");
const  codeFold = CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder);
const options = {
    mode: "text/x-cyclone",
    theme: "cobalt",
    tabSize: 4,
    lineNumbers: true,
    keyMap: "sublime",
    lineWrapping: true,
    scrollbarStyle: "native", // "native", null
    showCursorWhenSelecting: true,
    autofocus: true,
    cursorBlinkRate: 600,
    cursorHeight: 1,
    matchBrackets: true,
    tabMode: 'indent',
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
