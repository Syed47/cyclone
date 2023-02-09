var term = new Terminal();
term.open(document.getElementById('terminal'));
term.write(' $ ')
term.fit()
term.onKey(e => {
    console.log(e.key);
    term.write(e.key);
    if (e.key == '\r')
        term.write('\n');
})