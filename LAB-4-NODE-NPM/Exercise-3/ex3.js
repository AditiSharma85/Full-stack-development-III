const say=require('say')
const sorryDave=()=>
say.speak('I am sorry Dave')
//Sorry Dave after 5 seconds of delay
setTimeout(sorryDave,5000);

//More complex example (with an OS X voice) and slow speed
say.speak("Hello?",'Alex',0.5)
//
//use default system voice and speed
say.speak('Hello!')
//stop the text currently being spoken
say.stop()

