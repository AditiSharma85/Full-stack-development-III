const mixedArray=['Matrix',1,true,2,3];

var getNumbers=mixedArray.filter(x=>parseInt(x)===x);
//console.log(`${getNumbers}`);
var multiplyNumbers=getNumbers.map(x=>x*5);
console.log(`${multiplyNumbers}`);

