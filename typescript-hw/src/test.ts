import { Card, Transaction, CurrencyEnum } from './main';

let myCard = new Card();

let transaction1 = new Transaction(600, CurrencyEnum.USD);
let id1 = myCard.AddTransaction(transaction1);
console.log('Added transaction with id ' + id1);

let id2 = myCard.AddTransaction(900, CurrencyEnum.UAH);
console.log('Added transaction with id ' + id2);

let myTransaction = myCard.GetTransaction(id1);
console.log('Got transaction with id ' + myTransaction?.Id);

let balance = myCard.GetBalance(CurrencyEnum.USD);
console.log('Balance in USD is ' + balance);
