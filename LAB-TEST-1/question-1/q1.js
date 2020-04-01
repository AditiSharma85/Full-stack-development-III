var balance=0;
var deposit=(amount)=>{
balance=balance+amount;
console.log(`Deposit ${amount} into account`);
}

var withdrawal=(amount)=>{
balance=balance-amount;
console.log(`Withdrawal ${amount} from account`);
}

var checkBalance=()=>console.log(`The balance is ${balance}`);

//calls functions and outputs results

checkBalance();
deposit(100);
checkBalance();
withdrawal(25);
checkBalance();