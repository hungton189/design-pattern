/**
 * Observer Pattern: Behavioral Design Pattern
 *
 * The Observer pattern defines a one-to-many dependency between objects where when one object (the subject/publisher)
 * changes state, all its dependents (observers/subscribers) are notified and updated automatically.
 *
 * Key components:
 * - Subject: Maintains list of observers and notifies them of state changes
 * - Observer: Defines interface for objects that should be notified of changes
 * - Concrete Observer: Implements the Observer interface to receive updates
 *
 * Benefits:
 * - Loose coupling between subject and observers
 * - Support for broadcast communication
 * - Easy to add/remove observers at runtime
 */

console.log("--------------------------------");
console.log("Example 1: Without Observer Pattern");

// Without Observer Pattern
class Store {
  constructor() {
    this.price = 0;
  }

  setPrice(price) {
    this.price = price;

    // Directly notify each interested party - tightly coupled
    console.log(`Email notification: Price updated to ${price}`);
    console.log(`SMS notification: Price updated to ${price}`);
    console.log(`App notification: Price updated to ${price}`);
  }
}

// Usage without observer
const store = new Store();
store.setPrice(100);
//=================================*-*-*-*=================================

console.log("--------------------------------");
console.log("Example 2: With Observer Pattern");

// Subject interface
class Subject {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

// Concrete Subject
class StoreWithObserver extends Subject {
  constructor() {
    super();
    this.price = 0;
  }

  setPrice(price) {
    this.price = price;
    this.notify(price);
  }
}

// Observer interface
class Observer {
  update(data) {
    throw new Error("update() method must be implemented");
  }
}

// Concrete Observers
class EmailObserver extends Observer {
  update(price) {
    console.log(`Email notification: Price updated to ${price}`);
  }
}

class SMSObserver extends Observer {
  update(price) {
    console.log(`SMS notification: Price updated to ${price}`);
  }
}

class AppObserver extends Observer {
  update(price) {
    console.log(`App notification: Price updated to ${price}`);
  }
}

// Usage with observer pattern
const storeWithObserver = new StoreWithObserver();

const emailObserver = new EmailObserver();
const smsObserver = new SMSObserver();
const appObserver = new AppObserver();

storeWithObserver.attach(emailObserver);
storeWithObserver.attach(smsObserver);
storeWithObserver.attach(appObserver);

storeWithObserver.setPrice(100);

// Can easily detach observers
storeWithObserver.detach(smsObserver);
console.log("\nAfter detaching SMS observer:");
storeWithObserver.setPrice(200);
