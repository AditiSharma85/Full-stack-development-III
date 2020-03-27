var events = require('events');
var eventEmitter = new events.EventEmitter();
var fn=function(){
    console.log('Alarm has been triggered');
}
var fn2=function(){
    console.log('Call 911');
}
eventEmitter
.on('call1', fn)
.on('call2',fn2);
eventEmitter.emit('call1');
eventEmitter.emit('call2');
//eventEmitter.on('call1', fn);
//eventEmitter.emit('call1');
//eventEmitter.on('call2', fn2);
//eventEmitter.emit('call2');