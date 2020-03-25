var moment=require('moment');
var getCurrentDate=()=>{
    var wrapped = moment(new Date());
    console.log(wrapped.format('dddd MMMM Do YYYY, h:mm:ss a'));
}
getCurrentDate();
