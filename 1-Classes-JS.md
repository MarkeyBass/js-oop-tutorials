MDN Classes — Student Edition
=============================

Reference link: [MDN Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

Who is this for?
Students that are familiar with Python OOP who need to learn modern JS class essentials, with advanced items marked as bonus.

1) Declaring classes
--------------------
```js
class Person {} // class declaration
```

2) Constructors and fields
--------------------------
```js
class Person {
  // public instance field
  nickname = "anon";

  // static field (class property)
  static species = "human";

  constructor(name) {
    this.name = name; // instance data
  }
}
```
- Call with `new Person("Ada")`.
- `constructor` runs per instance; instance fields can be declared up top or assigned in the constructor.

3) Private fields
-----------------
```js
class Bank {
  #balance = 0;
  deposit(x) { this.#balance += x; }
  get balance() { return this.#balance; }
}
```
- `#` makes fields truly private to the class body. You cannot read/write them from outside or from plain objects.

4) Methods, getters, setters
---------------------------
```js
class Counter {
  constructor() { this.count = 0; }
  inc() { this.count += 1; }
  static zero() { return new Counter(); }
  get doubled() { return this.count * 2; }
  set value(v) { this.count = v; }
}
```
- Instance methods go on the prototype; static methods live on the class itself.
- Getters/setters are invoked like properties: `c.doubled`, `c.value = 5`.

5) Inheritance and super
------------------------
```js
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} makes a sound`; }
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name);        // must be first before using this
    this.breed = breed;
  }
  speak() { return `${this.name} barks`; }
}
```
 - `extends` sets up the prototype chain; `super()` must run before `this` in a subclass constructor.
- You can call `super.method()` inside overrides to reuse/extend parent behavior.
- Example: overriding but reusing parent output
```js
class LoudDog extends Dog {
  speak() {
    const base = super.speak(); // call parent
    return base.toUpperCase();  // tweak result
  }
}
```
 - Python parallel: `class Dog(Animal):` with `super().__init__(name)`; both create a single inheritance chain (MRO in Python, prototype chain in JS).

6) this and new (quick reminders)
---------------------------------
- Always use `new` with classes; otherwise you get a TypeError.
- `this` inside class methods refers to the instance when called as `obj.method()`. If you pass a method as a callback, it loses its `this` unless you bind.
```js
class Counter {
  constructor() { this.count = 0; }
  inc() { this.count += 1; }
}
const c = new Counter();
const f = c.inc;      // loses `this`
// f();              // TypeError: cannot read properties of undefined
const g = c.inc.bind(c);
g(); // ok, count = 1
// Arrow wrapper also works: const g = () => c.inc();
```

7) Common pitfalls to warn students about
-----------------------------------------
- Forgetting `new` → TypeError.
- Subclass constructor without `super()` → runtime error before `this`.
- Mixing up static vs instance: `ClassName.staticFn()`, not `instance.staticFn()`.
- Losing `this` when passing/storing methods: calling as `obj.method()` is fine; passing `obj.method` (to a callback or variable) is not. Fix by binding (`btn.onclick = obj.method.bind(obj)`) or wrapping (`btn.onclick = () => obj.method()`).

8) How this maps to older constructor/prototype code
----------------------------------------------------
- `class` is syntax sugar over constructor functions plus prototypes.
- Methods in class bodies land on `ClassName.prototype`.
- Static fields/methods land on `ClassName` itself.

Bonus (If you want to dig diper - search the following concepts on google)
--------------------------------------------------------------------------
- Static initialization blocks: run once to initialize static state.
- `super` in static methods: lets a static method call a parent static.
- `new.target`: tells a constructor which constructor was actually called with `new`.
- Class expressions with dynamic names.
- Mixins: functions that return classes to combine behaviors (advanced; prefer composition).

Tiny practice prompts
---------------------
- Add a `static from(obj)` factory to build a `Person` from a plain object.
- Add a getter `initials` to `Person` that derives from `name`.
- Rewrite a small constructor-function example into a `class` with `extends` and `super`.

Slide-inspired mini exercises (condensed)
-----------------------------------------
- Airplane: class with `brand`, `number`, `kmFlown` (start at 0); add `fly()` (log something fun) and `printInfo()`.
- Three quick classes: `Student` (name, id, classes), `Food` (name, price, taste), `Hobby` (name, description, popularity); each with a `logDetails()` method.
- Encapsulated Car: `id` (private `#id`), `brand`, `maxSpeed`, `isElectric`; methods to update `maxSpeed` and `printAll()` including the private id.
- Inheritance basics: `Animal` with `makeSound()`; `Dog`/`Cat` that override it. Show `Object.getPrototypeOf(dog) === Object.getPrototypeOf(cat)` is false but both delegate to `Animal.prototype`.
- Override example: `Car` with `fuel()` logs “putting gas...”; `Tesla` extends `Car`, overrides `fuel()` with “charging…”.

