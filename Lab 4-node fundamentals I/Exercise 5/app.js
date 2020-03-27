const http = require('http');
const url = require('url');
var events = require('events');
var eventEmitter = new events.EventEmitter();
const hostname = '127.0.0.1';
const port = 3000;
var fn=function(){
  console.log('Jackpot!');
  }
  var amount='0';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Slot machine');
  var urlString=url.parse(req.url);
  var querystring=url.parse(req.url,true).query;
  if(urlString.pathname==="/play"){
    if(querystring.amount==="max"){
      eventEmitter.on('max', fn);
      eventEmitter.emit('max');
    }
    else{
      amount=querystring.amount;
    console.log(`playing..amount :${querystring.amount}`); 
     }
    }
   if(urlString.pathname==="/spin"){
    console.log(`spinning..\namount lost : ${amount}`); 
  }

  if(urlString.pathname==="/"){
    console.log('Please play or spin'); 
  }
  });


server.listen(port, hostname, () => {
 console.log('Please play or spin');
});

