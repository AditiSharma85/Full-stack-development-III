var events = require('events');
var emitter = new events.EventEmitter();
var moment=require('moment');

var currentTimeCallback=()=>{
    var wrapped = moment(new Date());
    console.log(`Current time : ${wrapped.format('LTS')}`);
}
emitter.on('currentTime', currentTimeCallback);
emitter.emit('currentTime');



