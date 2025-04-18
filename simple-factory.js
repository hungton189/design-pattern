/**
 * Simple Factory Pattern: Creational Design Pattern
 *
 * Simple Factory is the simplest pattern among Creational Patterns.
 * This pattern provides an interface for creating objects in a superclass,
 * but allows subclasses to decide which class to instantiate.
 *
 * Benefits:
 * - Separates object creation code from object usage code
 * - Easy to add/modify/remove products without affecting existing code
 * - Follows Single Responsibility Principle
 *
 * Drawbacks:
 * - Code can become complex when adding too many products
 * - Violates Open/Closed Principle when adding new products because:
 *   1. Need to modify factory class code (createAnimal method)
 *   2. Add new case statements in switch block
 *   3. Cannot extend functionality without changing existing code
 *   4. Each new animal type requires changes to factory implementation
 */
console.log("================================================");

// Product interface
class Animal {
  makeSound() {
    throw new Error("makeSound() method must be implemented");
  }
}

// Concrete products
class Dog extends Animal {
  makeSound() {
    return "Woof!";
  }
}

class Cat extends Animal {
  makeSound() {
    return "Meow!";
  }
}

// Simple factory
class AnimalFactory {
  createAnimal(type) {
    switch (type.toLowerCase()) {
      case "dog":
        return new Dog();
      case "cat":
        return new Cat();
      default:
        throw new Error("Animal type not supported");
    }
  }
}

// Client code
console.log("Demo Simple Factory Pattern");

const factory = new AnimalFactory();

const dog = factory.createAnimal("dog");
const cat = factory.createAnimal("cat");

console.log("Dog says:", dog.makeSound());
console.log("Cat says:", cat.makeSound());

// Try creating invalid animal
try {
  const invalid = factory.createAnimal("bird");
} catch (error) {
  console.log("Error:", error.message);
}
