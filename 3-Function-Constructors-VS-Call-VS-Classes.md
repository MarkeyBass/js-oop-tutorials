Function Calls vs Function Constructors (Prototype Basics)
==========================================================

Audience: Students who already know Python OOP but should see how pre-ES6 JavaScript used constructors and prototypes, before jumping back to ES6 classes.

1) Two ways to make objects (pre-ES6)
-------------------------------------
- Regular function call (returns an object): no prototype wiring, just whatever the function returns.
- Constructor call with `new`: creates an object, links it to `FunctionName.prototype`, binds `this`, runs the function to initialize, and returns the new object.

Example: plain function returning an object
```js
function createPerson(name) {
  return {
    name,
    greet() {
      console.log("Hello, " + this.name);
    },
  };
}

const p1 = createPerson("Ada");
p1.greet(); // Hello, Ada
// No prototype link to createPerson.prototype
```

Example: constructor function with `new`
```js
function Person(name) {
  this.name = name; // attaches to the new object
}
Person.prototype.greet = function () {
  console.log("Hello, " + this.name);
};

const p2 = new Person("Grace");
p2.greet(); // Hello, Grace
// p2.__proto__ === Person.prototype (prototype chain is set)
```

What `new` does (in simple steps)
1) Creates an empty object.
2) Sets its internal prototype to `Person.prototype`.
3) Calls `Person` with `this` pointing to that object.
4) Returns the object (unless the constructor returns a different object explicitly).

2) Minimal prototype chain for inheritance (constructor functions)
------------------------------------------------------------------
Goal: Show how shared methods live on prototypes and how one constructor can inherit another.

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.makeSound = function () {
  console.log(this.name + " makes a sound.");
};
// static helper lives on the constructor itself
Animal.isAnimal = function (obj) {
  return obj instanceof Animal;
};

function Dog(name, breed) {
  Animal.call(this, name); // step 3: run parent constructor on this
  this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype); // step 2: link prototypes (instance chain)
Dog.prototype.constructor = Dog; // reset the constructor pointer (otherwise it points to Animal)
Object.setPrototypeOf(Dog, Animal); // optional: inherit static methods too (matches class extends)

// Reminder:
// Dog             -> the constructor function (similar to the class itself); statics live here.
// Dog.prototype   -> the object used for instances' prototype; instance methods live here.

Dog.prototype.makeSound = function () {
  console.log(this.name + " barks.");
};

const d = new Dog("Rex", "Shepherd");
d.makeSound(); // Rex barks.
console.log(Dog.isAnimal(d)); // true (static method inherited from Animal)
```

Prototype chain takeaway
- Instances delegate missing properties to their prototype.
- Inheritance via constructors = reuse parent constructor for state + link prototypes for shared behavior.
- Avoid deep chains; this is mainly to read older code and understand what classes desugar to.

3) Same idea rewritten with ES6 classes (preferred today)
---------------------------------------------------------
```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  makeSound() {
    console.log(this.name + " makes a sound.");
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  makeSound() {
    console.log(this.name + " barks.");
  }
}

const d = new Dog("Rex", "Shepherd");
d.makeSound(); // Rex barks.
```

Why teach constructors briefly?
- Older code and some libraries still use them.
- Understanding `new` clarifies how classes are implemented under the hood (syntactic sugar over prototypes).
- Helps debug `this` issues and prototype lookups when reading legacy code.

Quick checkpoint questions
- What are the 4 steps `new` performs?
- Why put methods on `FunctionName.prototype` instead of inside the constructor?
- How do you set up inheritance between two constructor functions?
- How is `class`/`extends` easier to read than the constructor + prototype pattern?

