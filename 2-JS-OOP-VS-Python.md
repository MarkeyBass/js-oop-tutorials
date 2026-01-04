Python → JavaScript OOP (Class Syntax Edition)
==============================================

Audience: Students that are familiar with Python OOP who need to learn modern JS class essentials, with advanced items marked as bonus. Focus on class-based usage; prototypes are covered briefly for mental model only.

Quick takeaways
---------------
- JS `class` is mostly syntax sugar over prototypes; behavior is close enough to map 1:1 from Python.
- Always call `new` when instantiating a class in JS.
- Use `constructor` instead of `__init__`, and call `super(...)` before using `this` in subclasses.
- `this` is not `self`; its value depends on how a method is called. Calling `obj.method()` is fine; passing/storing `obj.method` loses `this`. Fix with `bind` or an arrow wrapper (see below).
- Static fields/methods belong to the class, not instances.

1) Define a class
-----------------
Python
```python
class Animal:
    species = "unknown"  # class attribute
    def __init__(self, name):
        self.name = name
```

JavaScript
```js
class Animal {
  static species = "unknown"; // class (static) field
  constructor(name) {
    this.name = name; // instance field
  }
}
```

Mapping highlights
- `class`/`extends` resemble Python `class`/inheritance.
- `constructor` ⇔ `__init__`.
- Fields are created dynamically on `this`; no declaration needed inside the constructor.
- Static fields use `static` keyword and are not on instances.

2) Create instances
-------------------
Python
```python
cat = Animal("Luna")
```
JavaScript
```js
const cat = new Animal("Luna"); // `new` required
```

3) Instance fields vs static fields
-----------------------------------
Python
```python
class Animal:
    species = "unknown"
    def __init__(self, name):
        self.name = name
```
JavaScript
```js
class Animal {
  static species = "unknown";
  constructor(name) {
    this.name = name;
  }
}
```
Notes
- Both languages support class-level data; JS uses `static`.
- In JS, instances cannot see static fields via `this`; access as `Animal.species`.

4) Instance methods vs static methods
-------------------------------------
Python
```python
class Animal:
    def __init__(self, name):
      self.name = name

    def speak(self):
        return f"{self.name} makes a sound"

    @staticmethod
    def kingdom():
        return "animalia"
```
JavaScript
```js
class Animal {
  constructor(name) {
    this.name = name; // instance field
  }

  speak() {
    return `${this.name} makes a sound`;
  }

  static kingdom() {
    return "animalia";
  }
}
```
Notes
- Static methods in JS are declared with `static` (no decorator syntax).

5) Inheritance and `super`
--------------------------
Python
```python
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed
    def speak(self):
        return f"{self.name} barks"
```
JavaScript
```js
class Dog extends Animal {
  constructor(name, breed) {
    super(name);        // must be first before using `this`
    this.breed = breed;
  }
  speak() {
    return `${this.name} barks`;
  }
}
```
Notes
- `extends` sets up inheritance; `super(...)` is required before `this` in subclass constructors.

6) Calling parent methods
-------------------------
Python
```python
class LoudDog(Dog):
    def __init__(self, name, breed):
        super().__init__(name, breed)
    
    def speak(self):
        base = super().speak()
        return base.upper()
```
JavaScript
```js
class LoudDog extends Dog {
  constructor(name, breed) {
    super(name, breed);        // must be first before using `this`
  }
  speak() {
    const base = super.speak();
    return base.toUpperCase();
  }
}
```

7) Method overriding
--------------------
Same in both languages: define the method again on the subclass. Use `super.method()` to incorporate parent behavior.

8) `this` vs `self` (critical difference)
-----------------------------------------
- Python: `self` is an explicit parameter; it always points at the instance.
- JS: `this` is set by call-site. Passing a method loses its `this` unless you bind.

Example gotcha
```js
class ButtonCounter {
  constructor() {
    this.count = 0;
    this.handleClick = this.handleClick.bind(this); // bind once
  }
  handleClick() {
    this.count += 1;
  }
}
// Passing unbound: button.addEventListener("click", counter.handleClick); // OK because bound above
// If unbound:
// const f = counter.handleClick; f(); // TypeError (this is undefined)
// const g = counter.handleClick.bind(counter); g(); // works
// Arrow wrapper also works: const h = () => counter.handleClick(); // calls with counter, so `this` is correct
// Contrast:
// const h1 = counter.handleClick; h1(); // `this` is undefined (strict) or global; breaks
```

9) Prototype mental model (short)
---------------------------------
- JS objects delegate property lookups to their prototype chain.
- `class` syntax wires `Dog.prototype` to `Animal.prototype` under the hood.
- You rarely need old-style `Function.prototype` patterns when using `class`.

10) Privacy
-----------
- Python: name-mangling via `__private`.
- Modern JS: `#privateField` and `#privateMethod` are truly private to the class body.
Python
```python
class BankAccount:
    def __init__(self, balance=0):
        self.__balance = balance  # name-mangled (not truly private)
    
    def deposit(self, amount):
        self.__balance += amount
    
    @property
    def balance(self):
        return self.__balance
```

JavaScript
```js
class BankAccount {
  #balance = 0;
  constructor(balance = 0) {
    this.#balance = balance;
  }
  deposit(amount) { this.#balance += amount; }
  get balance() { return this.#balance; }
}
```

11) Multiple inheritance
------------------------
- Python supports it; JS classes do not. Use composition instead.

12) Common JS pitfalls for Python learners
------------------------------------------
- Forgetting `new` when constructing → runtime error.
- Not calling `super()` before using `this` in subclass constructors.
- Assuming `this` behaves like `self`; unbound methods lose context.
- Expecting static members on instances; they live on the class.
- Adding fields outside the constructor is allowed, but keep initialization consistent to avoid surprises.

13) Special methods mapping (`__str__`, `__repr__`, `__eq__`)
------------------------------------------------------------
Python
```python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __str__(self):
        return f"({self.x}, {self.y})"
    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"
    def __eq__(self, other):
        return isinstance(other, Point) and (self.x, self.y) == (other.x, other.y)
```

JavaScript
```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x}, ${this.y})`; // shown by String(point)
  }
  equals(other) { // explicit value equality; JS does not overload ==
    return other instanceof Point && this.x === other.x && this.y === other.y;
  }
}
```
Notes
- JS cannot overload `==`/`===`; expose an `equals` (or `isEqual`) method.
- `toString()` is the closest equivalent to `__str__`; add your own `repr()` style method if you want a debug string.

14) Getters and setters (`@property` in Python)
-----------------------------------------------
Python
```python
class Account:
    def __init__(self, balance):
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("negative not allowed")
        self._balance = value
```

JavaScript
```js
class Account {
  constructor(balance) {
    this._balance = balance;
  }
  get balance() {
    return this._balance;
  }
  set balance(value) {
    if (value < 0) throw new Error("negative not allowed");
    this._balance = value;
  }
}
const a = new Account(50);
a.balance = 75; // setter
console.log(a.balance); // getter
```
Notes
- Syntax uses `get`/`set` keywords; they are invoked like fields (no `()`).
- Use getters/setters for validation, computed values, or encapsulation; avoid heavy logic to keep access predictable.

Checkpoint: rewrite exercises
-----------------------------
1) Rewrite to JS  
Python:
```python
class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages
    def describe(self):
        return f"{self.title} has {self.pages} pages"
```
Task: Convert to JS `class Book` with a `describe()` method and instantiate one book.

2) Add a static counter  
Extend your JS `Book` to track how many books were created using a static field and a static `count()` method.

3) Fix `this` loss  
Given:
```js
class Greeter {
  constructor(name) { this.name = name; }
  sayHi() { return `Hi, I'm ${this.name}`; }
}
const g = new Greeter("Ada");
const f = g.sayHi;
```
Task: Make `f()` return `"Hi, I'm Ada"` without changing `sayHi`’s body.

Quick quiz (discuss/answer)
---------------------------
- Why must `super()` be called before `this` in a subclass constructor?
- How do you declare a static field in JS, and how is it accessed?
- What happens to `this` when you pass a method as a callback without binding?
- How is JS privacy different from Python’s `__name` convention?
- How do you customize string output in JS, and how does that differ from Python’s `__str__`/`__repr__`?
- When would you choose JS getters/setters over plain fields, and how do they compare to Python `@property`?

What changed from the original conversation
-------------------------------------------
- Tightened focus to ES6 class syntax (minimal prototype detail).
- Clarified `this` vs `self` with a binding example.
- Added static field/method usage notes and pitfalls.
- Added practice exercises and a short quiz.
- Streamlined wording for quick classroom use.
