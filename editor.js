(function() {
    const container = document.getElementById("container");
    const editor = CodeMirror(container, {
        mode: "javascript",
        theme: "cobalt",
        tabSize: 4,
        lineNumbers: true,
        keyMap: "sublime",
        lineWrapping: false,
        scrollbarStyle: null, // "native", null
        showCursorWhenSelecting: true,
        autofocus: true,
        cursorBlinkRate: 180,
        cursorHeight: 0.85
    })
})()