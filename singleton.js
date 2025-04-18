/**
 * Singleton Pattern: Creational Design Pattern
 *
 * Singleton pattern ensures a class has only one instance and provides a global point
 * of access to that instance. This pattern is useful when:
 * - Exactly one instance of a class is needed throughout the system
 * - Strict control over global state/resources is required
 * - Need to coordinate actions across the system
 *
 * Key components:
 * - Private constructor to prevent direct instantiation
 * - Private instance variable to hold the singleton instance
 * - Public static method to get the instance
 *
 * Common use cases:
 * - Database connections
 * - Configuration settings
 * - Logging services
 * - Thread pools
 */
console.log("================================================");

// Example implementation
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connectionString = "mongodb://localhost:27017/mydb";
    this.connected = false;
    Database.instance = this;
  }

  connect() {
    if (this.connected) {
      console.log("Already connected to database");
      return;
    }
    console.log(`Connecting to database: ${this.connectionString}`);
    this.connected = true;
  }

  query(sql) {
    if (!this.connected) {
      throw new Error("Must connect to database first");
    }
    console.log(`Executing query: ${sql}`);
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

// Usage demonstration
console.log("Demo Singleton Pattern");

const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log("Are db1 and db2 the same instance?", db1 === db2);

db1.connect();
db1.query("SELECT * FROM users");

// Second connection attempt
db2.connect(); // Will log "Already connected"
db2.query("SELECT * FROM products");

// Direct instantiation still returns same instance
const db3 = new Database();
console.log("Is db3 the same instance?", db1 === db3);
