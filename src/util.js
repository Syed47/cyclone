const AnsiToHTML = require('ansi-to-html');

const ansiToHTML = (text) => {
    const converter = new AnsiToHTML();
    return converter.toHtml(text)
}

const timestamp = () => {
    const currentDate = new Date(),
        day = currentDate.getDate().toString().padStart(2, '0'),
        month = (currentDate.getMonth() + 1).toString().padStart(2, '0'),
        year = currentDate.getFullYear().toString(),
        hours = currentDate.getHours().toString().padStart(2, '0'),
        minutes = currentDate.getMinutes().toString().padStart(2, '0'),
        seconds = currentDate.getSeconds().toString().padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}


const html = (str, color, command=false) => {
    const style = `display: flex; align-items: center; justify-content: left; padding-left: 4px;`;
    let line = `<div style="${style};">`
    if (color) line = `<div style="${style}; color: ${color};">`
    if (command) line += `<span>>>> ${str}</span>`;
    else line += `<span>${str}</span>`;
    line += `</div>`;
    return line;
}

const stdout = output => html(timestamp(), "cyan", true) + output


module.exports = {
    ansiToHTML,
    timestamp,
    html,
    stdout
}