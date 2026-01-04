// class Person {
//   nickname = "General Person's Nickname";
//   static general_info = "People ain't good!!!"
//   constructor(name, nickname=this.nickname) {
//     this.name = name;
//     this.nickname = nickname
//   }
// }

// // console.log(Person.name)
// console.log(Person.general_info)

// const mark = new Person("Mark", "MarkeyBass");
// console.log(mark.name)
// console.log(mark.nickname)

// class BankAccount {
//   static bankName = "Leumi";
//   static counter = 0;
//   username;
//   accountNumber;
//   #balance = 0;

//   constructor(username, accountNumber) {
//     this.username = username;
//     this.accountNumber = accountNumber;
//     BankAccount.counter++;
//   }

//   static getTime() {
//     return new Date().toDateString();
//   }

//   getAccountdetails() {
//     return `This account number ${this.accountNumber} belongs to ${this.username}`
//   }

//   deposit(money) {
//     this.#balance += money
//   }

//   getBalance() {
//     return this.#balance
//   }

//   get balance() {
//     return this.#balance
//   }
// }

// const danielsAccount = new BankAccount("Daniel", 111);
// console.log(BankAccount.counter);

// console.log(danielsAccount);
// const marksAccount = new BankAccount("Mark", 222);
// console.log(marksAccount);
// console.log(BankAccount.bankName);
// console.log(BankAccount.getTime());
// console.log(BankAccount.counter);
// console.log(danielsAccount.getAccountdetails())
// console.log("======================")
// danielsAccount.deposit(200);
// console.log(danielsAccount.balance)
// console.log(danielsAccount.getBalance())

// class Counter {
//   #counter = 0;
//   constructor(counter) {
//     this.#counter = counter;
//   }

//   inc() {
//     this.#counter += 1;
//   }

//   get doubled() {
//     return this.#counter * 2;
//   }

//   get counter() {
//     return this.#counter;
//   }

//   set value(v) {
//     if(v > 100) throw new Error("value is too larg")
//     this.#counter = v;
//   }
// }

// const c = new Counter(2);
// console.log(c.doubled);
// c.value = 99;
// console.log(c.counter);


class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() { return `${this.name} barks`; }
}

class LoudDog extends Dog {
  speak() {
    return super.speak() + "!!!!!!!!!!!!"; // call parent
  }
}