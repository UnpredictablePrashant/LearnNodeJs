const EventEmitter = require("events")

const event = new EventEmitter();

event.on('action', () => {
    console.log("Action 1 event happened")
})
event.on('action', () => {
    console.log("Action 2 event happened")
})

event.on('start', msg => {
    console.log(msg)
})

// event.removeAllListeners('action')

event.emit('action')
event.emit('start', 'custom message')
