SOLID Principles — Quick JS Guide
==================================

What SOLID is (and isn’t)
-------------------------
- Five guidelines for maintainable, flexible code: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
- Use as a checklist, not dogma. Prefer simple, readable solutions over ceremony.

S — Single Responsibility (one reason to change)
------------------------------------------------
Bad
```js
class ReportService {
  constructor(db) { this.db = db; }
  async generatePdf() { /* build report */ }
  async saveToDb(pdf) { return this.db.save(pdf); }
}
```
Fix: separate concerns
```js
class ReportBuilder { generate() { /* build report */ } }
class ReportRepo { constructor(db) { this.db = db; } save(pdf) { return this.db.save(pdf); } }
```

O — Open/Closed (extend, don’t rewrite)
---------------------------------------
Bad: branching on type
```js
function area(shape) {
  if (shape.type === "circle") return Math.PI * shape.r ** 2;
  if (shape.type === "square") return shape.s ** 2;
}
```
Better: polymorphism
```js
class Shape { area() { throw new Error("override"); } }
class Circle extends Shape { constructor(r) { super(); this.r = r; } area() { return Math.PI * this.r ** 2; } }
class Square extends Shape { constructor(s) { super(); this.s = s; } area() { return this.s ** 2; } }
```

L — Liskov Substitution (subclasses shouldn’t break expectations)
-----------------------------------------------------------------
Bad: violates base expectations
```js
class Bird { fly() { return "I fly"; } }
class Penguin extends Bird { fly() { return "I can't"; } } // breaks callers expecting fly
```
Better: model capabilities accurately
```js
class Bird { makeSound() { return "chirp"; } }
class FlyingBird extends Bird { fly() { return "I fly"; } }
class Penguin extends Bird { swim() { return "I swim"; } }
```

I — Interface Segregation (small, focused interfaces)
-----------------------------------------------------
Bad: one interface with too many responsibilities
```js
class Machine {
  print() {}
  scan() {}
  fax() {}
}
```
Better: split by role
```js
class Printer { print() {} }
class Scanner { scan() {} }
class Fax { fax() {} }
class MultiFunctionPrinter extends Printer { scan() {} fax() {} }
```

D — Dependency Inversion (depend on abstractions)
-------------------------------------------------
Bad: high-level hardcodes low-level
```js
class Store {
  constructor() { this.logger = new ConsoleLogger(); }
  buy(item) { this.logger.log("Bought " + item); }
}
```
Better: inject abstraction
```js
class Store {
  constructor(logger) { this.logger = logger; }
  buy(item) { this.logger.log("Bought " + item); }
}
class ConsoleLogger { log(m) { console.log(m); } }
```

Common pitfalls (per principle)
-------------------------------
- S: “God classes” doing unrelated tasks; too many reasons to change.
- O: Big switch/if on type instead of polymorphism; editing old code to add a variant.
- L: Subclass removes or weakens required behavior (e.g., throwing where parent worked).
- I: Fat interfaces forcing unused methods; dummy methods that throw.
- D: Newing concrete dependencies inside high-level code; no seams for testing or swapping implementations.

Mini exercises
--------------
- S: Split a class that handles both HTTP requests and database writes into two classes.
- O: Replace a type-switching `render(shape)` function with polymorphic `shape.render()`.
- L: Refactor a subclass that throws for a base method into a hierarchy that doesn’t lie (e.g., split capabilities).
- I: Break a “do-everything” service into focused interfaces/classes; show how a consumer depends on only what it needs.
- D: Refactor a class that constructs its logger/database inside the constructor to accept them as parameters; show how you’d inject a mock in tests.

When to apply
-------------
- Use SOLID to avoid rigidity as code grows.
- Don’t over-abstract tiny scripts; start simple, refactor when duplication or tight coupling shows up.

