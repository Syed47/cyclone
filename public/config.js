const $ = document
const saveCode = $.getElementById("btn-save").click
const codeFold = CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder);

const editor = CodeMirror($.getElementById("editor"), {
    mode: "text/x-cyclone",
    theme: "ambiance",
    tabSize: 4,
    indentUnit: 4,
    indentWithTabs: true,
    tabMode: 'indent',
    lineNumbers: true,
    keyMap: "sublime",
    lineWrapping: true,
    scrollbarStyle: "null", // "native", null
    showCursorWhenSelecting: true,
    autofocus: true,
    cursorBlinkRate: 600,
    cursorHeight: 1,
    matchBrackets: true,
    continuousScanning: 400,
    onGutterClick: codeFold,
    styleActiveLine: true,
    extraKeys: {
        "Ctrl-S": cm => $.getElementById("btn-save").click(),
        "Cmd-S":  cm => $.getElementById("btn-save").click()
    },
    foldGutter: true,
    autoRefresh: true,
    gutters: [
        "CodeMirror-linenumbers", 
        "CodeMirror-foldgutter"
    ]
})


editor.setValue(`graph G {
    start state S{}
    final state q1{}
    final state r1{}
    state q2{}
    state r2{}

    transition { S -> q1  on "a" }
    transition { S -> r1  on "b" }

    transition { q1 -> q1 on "a" }
    transition { q1 -> q2 on "b" }
    transition { q2 -> q1 on "a" }
    transition { q2 -> q2 on "b" }

    transition { r1 -> r1 on "b" }
    transition { r1 -> r2 on "a" }
    transition { r2 -> r1 on "b" }
    transition { r2 -> r2 on "a" }
  
    goal { enumerate for 6 condition (!(_ -> r1)) }
    // goal { enumerate for 6 condition (!r1) }
  
}`)

const editorInstance = $.querySelector(".CodeMirror")
