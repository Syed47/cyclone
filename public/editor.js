// in-editor key bind functions
const codeFold = CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder)

const editor = CodeMirror(document.getElementById("editor"), {
    mode: "text/x-cyclone",
    theme: "darcula",
    tabSize: 4,
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
            case "solarized": return "solarized";
            case "twilight":  return "twilight";
            case "darcula":   return "darcula";
            case "eclipse":   return "eclipse";
            case "monokai":   return "monokai";
            default:          return "twilight";
        }
    })(theme.value))
});

// dynamic font selection
const font = document.getElementById("font-selector");
font.addEventListener("change", (e) => {
    editorOject.style.fontFamily = ((value) => {
        console.log(value)
        switch(value) {
            case "Arial":   return "Arial, sans-serif;";
            case "Tahoma":  return "Tahoma, sans-serif;";
            case "Courier": return "'Courier New', monospace;";
            case "Monaco":  return "Monaco";
            default:        return "'Courier New', monospace;";
        }
    })(font.value)
});



editor.setValue(`graph install{
    abstract start node T1{}
    abstract  node T0{}
    abstract  node T2{}
    abstract  node T3{}
    abstract  node T4{}
    abstract  node T5{}
    abstract  node T6{}

    edge {T0->+}
    edge {T1->+}
    edge {T2->+}
    edge {T3->+}
    edge {T4->+}
    edge {T5->+}
    edge {T6->+}


    goal {
        enumerate for 6 condition (
            T0^{1} && T1^{1} && T2^{1} && T3^{1} && T4^{1} && T5^{1} && T6^{1}
            && ( (_->T5->T2->_->_->_)  || 
               (_->T5->_->T2->_->_)  || 
               (_->T5->_->_->T2->_)  || 
               (_->T5->_->_->_->T2)  ||
               (_->_->T5->_->_->T2)  ||
               (_->_->T5->_->T2->_)  ||
               (_->_->T5->T2->_->_)  ||
               (_->_->_->T5->T2->_)  ||
               (_->_->_->T5->_->T2)  ||
               (_->_->_->_->T5->T2)) 
           && (T4->T3)^{1})

        reach(T0,T2,T3,T4,T5,T6)
    }
}`)
