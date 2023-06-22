const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event',()=>{
    console.log('an event occured')
})
myEmitter.emit('event')