/**
 * SOLID Principles are 5 important software design principles:
 *
 * 1. Single Responsibility Principle (SRP):
 * - A class should have only one reason to change
 * - Each class should have only one responsibility
 *
 * 2. Open/Closed Principle (OCP):
 * - Classes should be open for extension but closed for modification
 * - Code should be written to easily add new features without modifying existing code
 *
 * 3. Liskov Substitution Principle (LSP):
 * - Child classes must be substitutable for their parent classes
 * - Objects of child classes must behave like their parent class
 *
 * 4. Interface Segregation Principle (ISP):
 * - Split large interfaces into smaller ones
 * - Clients shouldn't depend on interfaces they don't use
 *
 * 5. Dependency Inversion Principle (DIP):
 * - High-level modules shouldn't depend on low-level modules
 * - Both should depend on abstractions
 */

// 1. Single Responsibility Principle

// Violating SRP
class UserWithoutSRP {
  constructor(name) {
    this.name = name;
  }

  saveUser() {
    // Logic to save user to DB
    console.log(`Saving user ${this.name} to DB`);
  }

  sendEmail() {
    // Logic to send email
    console.log(`Sending welcome email to ${this.name}`);
  }

  generateReport() {
    // Logic to generate report
    console.log(`Generating report for ${this.name}`);
  }
}
console.log("--- Violating SRP ---");
const userWithoutSRP = new UserWithoutSRP("John");
userWithoutSRP.saveUser();
userWithoutSRP.sendEmail();
userWithoutSRP.generateReport();

// Following SRP
class User {
  constructor(name) {
    this.name = name;
  }
}

class UserDB {
  saveUser(user) {
    console.log(`Saving user ${user.name} to DB`);
  }
  // Other methods related to user DB
}

class EmailService {
  sendEmail(user) {
    console.log(`Sending welcome email to ${user.name}`);
  }
  // Other methods related to email service
}

class ReportGenerator {
  generateReport(user) {
    console.log(`Generating report for ${user.name}`);
  }
  // Other methods related to report generator
}
console.log("--- Following SRP ---");
const userFollowingSRP = new User("John");
const userDBFollowingSRP = new UserDB();
const emailServiceFollowingSRP = new EmailService();
const reportGeneratorFollowingSRP = new ReportGenerator();
userDBFollowingSRP.saveUser(userFollowingSRP);
emailServiceFollowingSRP.sendEmail(userFollowingSRP);
reportGeneratorFollowingSRP.generateReport(userFollowingSRP);
console.log("--------------+-+-+------------------");

// 2. Open/Closed Principle

// Violating OCP
class DiscountWithoutOCP {
  calculateDiscount(order) {
    if (order.type === "regular") {
      return order.price * 0.1;
    } else if (order.type === "premium") {
      return order.price * 0.2;
    }
  }
}
console.log("--- Violating OCP ---");
const discountWithoutOCP = new DiscountWithoutOCP();
const regularOrderWithoutOCP = { type: "regular", price: 100 };
const premiumOrderWithoutOCP = { type: "premium", price: 200 };
console.log(
  "Regular discount:",
  discountWithoutOCP.calculateDiscount(regularOrderWithoutOCP)
);
console.log(
  "Premium discount:",
  discountWithoutOCP.calculateDiscount(premiumOrderWithoutOCP)
);

// Following OCP

class Order {
  constructor(price) {
    this.price = price;
    this.date = new Date();
  }
}
class Discount {
  calculateDiscount(order) {
    return order.price * this.getDiscountRate();
  }
}

class RegularDiscount extends Discount {
  getDiscountRate() {
    return 0.1;
  }
}

class PremiumDiscount extends Discount {
  getDiscountRate() {
    return 0.2;
  }
}
console.log("--- Following OCP ---");
const discountFollowingOCP = new Discount();
const regularDiscountFollowingOCP = new RegularDiscount();
const premiumDiscountFollowingOCP = new PremiumDiscount();
const orderFollowingOCP = new Order(100);
console.log(
  "Regular discount:",
  regularDiscountFollowingOCP.calculateDiscount(orderFollowingOCP)
);
console.log(
  "Premium discount:",
  premiumDiscountFollowingOCP.calculateDiscount(orderFollowingOCP)
);
console.log("--------------+-+-+------------------");

// 3. Liskov Substitution Principle

// Violating LSP
class Bird {
  fly() {
    console.log("I can fly");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("I can't fly"); // Violates LSP because it can't substitute parent class
  }
}

// Following LSP
class Animal {
  move() {
    console.log("I can move");
  }
}

class FlyingBird extends Animal {
  fly() {
    console.log("I can fly");
  }
}

class WalkingBird extends Animal {
  walk() {
    console.log("I can walk");
  }
}

// 4. Interface Segregation Principle

// Violating ISP
class WorkerWithoutISP {
  work() {
    console.log("Working");
  }
  eat() {
    console.log("Eating");
  }
  sleep() {
    console.log("Sleeping");
  }
}

// Following ISP
class Workable {
  work() {
    console.log("Working");
  }
}

class Eatable {
  eat() {
    console.log("Eating");
  }
}

class Sleepable {
  sleep() {
    console.log("Sleeping");
  }
}

class Worker extends Workable {
  // Only implement what's necessary
}

// 5. Dependency Inversion Principle

// Violating DIP
class LightBulbWithoutDIP {
  turnOn() {
    console.log("Light bulb turned on");
  }
  turnOff() {
    console.log("Light bulb turned off");
  }
}

class SwitchWithoutDIP {
  constructor() {
    this.bulb = new LightBulbWithoutDIP();
  }

  operate() {
    // Switch directly depends on LightBulb
    this.bulb.turnOn();
  }
}

// Following DIP
class Device {
  turnOn() {}
  turnOff() {}
}

class LightBulb extends Device {
  turnOn() {
    console.log("Light bulb turned on");
  }
  turnOff() {
    console.log("Light bulb turned off");
  }
}

class Switch {
  constructor(device) {
    this.device = device;
  }

  operate() {
    // Switch depends on abstraction (Device)
    this.device.turnOn();
  }
}
