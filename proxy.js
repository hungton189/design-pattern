/**
 * Proxy Pattern: Structural Design Pattern
 *
 * The Proxy pattern provides a surrogate or placeholder for another object to control access to it.
 * It creates a representative object that controls access to another object, which may be remote, expensive to create, or in need of securing.
 *
 * Key components:
 * - Subject: Interface implemented by RealSubject and Proxy
 * - RealSubject: The real object that the proxy represents
 * - Proxy: Maintains reference to RealSubject and controls access
 *
 * Benefits:
 * - Control access to another object
 * - Add behavior when accessing the object
 * - Provide protection to the real object
 * - Lazy initialization and loading
 */

console.log("--------------------------------");
console.log("Example 1: Without Proxy Pattern");

// Without Proxy Pattern
class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount}. New balance: ${this.balance}`);
  }

  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrawn ${amount}. New balance: ${this.balance}`);
    } else {
      console.log("Insufficient funds!");
    }
  }
}

// Direct usage without proxy
const account = new BankAccount(100);
account.deposit(50);
account.withdraw(70);
account.withdraw(100); // Can overdraw!

console.log("--------------------------------");
console.log("Example 2: With Proxy Pattern");

// Subject interface
class IBankAccount {
  deposit(amount) {}
  withdraw(amount) {}
}

// RealSubject
class RealBankAccount extends IBankAccount {
  constructor(balance) {
    super();
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount}. New balance: ${this.balance}`);
  }

  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrawn ${amount}. New balance: ${this.balance}`);
      return true;
    }
    return false;
  }
}

// Proxy
class BankAccountProxy extends IBankAccount {
  constructor(realAccount) {
    super();
    this.realAccount = realAccount;
  }

  deposit(amount) {
    if (this.validateTransaction(amount)) {
      console.log("Proxy: Logging deposit transaction");
      this.realAccount.deposit(amount);
    }
  }

  withdraw(amount) {
    if (this.validateTransaction(amount)) {
      console.log("Proxy: Checking withdrawal limit");
      if (amount > 1000) {
        console.log("Proxy: Cannot withdraw more than 1000 at once");
        return;
      }

      if (!this.realAccount.withdraw(amount)) {
        console.log("Proxy: Insufficient funds!");
      }
    }
  }

  validateTransaction(amount) {
    if (amount <= 0) {
      console.log("Proxy: Invalid amount");
      return false;
    }
    return true;
  }
}

// Usage with proxy pattern
const realAccount = new RealBankAccount(100);
const proxyAccount = new BankAccountProxy(realAccount);

proxyAccount.deposit(50);
proxyAccount.deposit(-50); // Invalid amount
proxyAccount.withdraw(70);
proxyAccount.withdraw(1500); // Exceeds limit
proxyAccount.withdraw(100); // Insufficient funds
