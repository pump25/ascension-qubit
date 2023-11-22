const config = require('./config.json') //config.json file
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
    
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

// Create the HTTP Server
http.listen(config.serverPort, () => console.log('listening on', config.serverPort))

// Tell the app where the files are and what page to serve depending on routes
app.use(express.static(__dirname + '/public'))

// http://localhost:8000/
app.get('/', (req, res) => res.sendFile('index.html'))

// http://localhost:8000/index2.html
app.get( '/:name', (req, res) => {
    const fileName = req.params.name
    res.sendFile(fileName, { root: __dirname + '/public/' }, err => {
        if (err) {
            console.log(err)
            res.status(err.status).end()
        } else {
            console.log('Sent:', fileName)
        }
    })
})

let connectCounter = 0
io.on('connection', socket => {
	connectCounter++
	console.log('nb clients: ' + connectCounter)
	socket.emit('connected', { msg: 'Connected' })

	socket.on('disconnect', () => {
		connectCounter--
		console.log('nb clients: ' + connectCounter)
	})
})

const port = new SerialPort({ path: config.serialPort, baudRate: config.serialRate })
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', data => {
    console.log(data)
    io.emit('arduinoData', data)
})