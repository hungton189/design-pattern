/**
 * Strategy Pattern: Behavioral Design Pattern
 *
 * The Strategy pattern is a behavioral design pattern that enables selecting an algorithm's behavior at runtime.
 * It defines a family of algorithms, encapsulates each one, and makes them interchangeable.
 *
 * Key components:
 * - Context: Maintains reference to a Strategy object and delegates it to handle algorithm
 * - Strategy: Declares interface common to all algorithms
 * - Concrete Strategies: Implements different algorithms using Strategy interface
 *
 * Benefits:
 * - Algorithms can vary independently from clients that use them
 * - Avoid conditional statements by using different strategies
 * - Easy to add new strategies without changing existing code
 */

console.log("--------------------------------");
console.log("Example 1: Without Strategy Pattern");

// Without Strategy Pattern
function processPayment(paymentType, amount, details) {
  if (paymentType === "credit_card") {
    const { cardNumber, cvv, expiryDate } = details;
    console.log(`Paid ${amount} using Credit Card: ${cardNumber}`);
  } else if (paymentType === "paypal") {
    const { email, password } = details;
    console.log(`Paid ${amount} using PayPal account: ${email}`);
  } else {
    throw new Error("Unsupported payment type");
  }
}

// Usage without strategy pattern
processPayment("credit_card", 100, {
  cardNumber: "1234-5678",
  cvv: "123",
  expiryDate: "12/25",
});

processPayment("paypal", 200, {
  email: "example@email.com",
  password: "password",
});

console.log("--------------------------------");

// Strategy Interface
class PaymentStrategy {
  pay(amount) {
    throw new Error("pay() method must be implemented");
  }
}

// Concrete Strategies
class CreditCardStrategy extends PaymentStrategy {
  constructor(cardNumber, cvv, dateOfExpiry) {
    super();
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.dateOfExpiry = dateOfExpiry;
  }

  pay(amount) {
    console.log(`Paid ${amount} using Credit Card: ${this.cardNumber}`);
  }
}

class PayPalStrategy extends PaymentStrategy {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
  }

  pay(amount) {
    console.log(`Paid ${amount} using PayPal: ${this.email}`);
  }
}

class CashStrategy extends PaymentStrategy {
  constructor(cashAmount) {
    super();
    this.cashAmount = cashAmount;
  }

  pay(amount) {
    if (amount > this.cashAmount) {
      throw new Error("Insufficient cash amount");
    }
    this.cashAmount -= amount;
    console.log(
      `Paid ${amount} using Cash.`,
      `Cash amount remaining: ${this.cashAmount}`
    );
  }
}

// Context
class ShoppingCart {
  constructor(paymentStrategy) {
    this.paymentStrategy = paymentStrategy;
    this.amount = 0;
  }

  setPaymentStrategy(paymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  checkout() {
    this.paymentStrategy.pay(this.amount);
  }

  setAmount(amount) {
    this.amount = amount;
  }
}

console.log("Example 2: With Strategy Pattern");

const creditCardStrategy = new CreditCardStrategy("1234-5678", "123", "12/25");
const paypalStrategy = new PayPalStrategy("example@email.com", "password");
const cashStrategy = new CashStrategy(500);

// Usage Example
const cart = new ShoppingCart(creditCardStrategy);
cart.setAmount(100);
cart.checkout();

// Can easily change strategy at runtime
cart.setPaymentStrategy(paypalStrategy);
cart.setAmount(200);
cart.checkout();

cart.setPaymentStrategy(cashStrategy);
cart.setAmount(300);
cart.checkout();

cart.setPaymentStrategy(creditCardStrategy);
cart.setAmount(400);
cart.checkout();
