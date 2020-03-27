var at = require('./modules/calculator/cal');
var ft= require('./modules/comparer');
const a=10;
const b=5;

//call module method
ft.AreNumberEqual(a,b)?console.log('Adding two numbers\n' + at.add(a,b)): console.log('Subtracting two numbers\n' + at.sub(a,b))

