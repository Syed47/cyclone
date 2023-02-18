const express = require('express')
const bodyParser = require('body-parser');
const shell = require('shelljs')
const path = require('path')
const fs = require('fs')

const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000


// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(path.join(__dirname, 'public')))

app.put('/run', (req, res) => {
	console.log(req.code)
	console.log(shell.pwd())
	shell.cd('Cyclone')
	shell.exec('sh run.sh', (code, output) => {
		fs.readFile(path.join(__dirname, 'Cyclone/response.txt'), function (err, data) {
		   if (err) return console.error(err);
		   const code_response = data.toString()
		   console.log(code_response)
		   res.json({ code: code_response.split('\n') })
		});
	})
	shell.cd("..")
})



app.listen(PORT, () => {
	console.log(`Cyclone is running on port ${PORT}`)
})