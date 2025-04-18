/**
 * Factory Method Pattern: Creational Design Pattern
 *
 * Factory Method is a creational design pattern that provides an interface for creating objects
 * but allows subclasses to decide which class to instantiate.
 *
 * Key components:
 * - Creator (Factory): Defines factory method that creates product
 * - Concrete Creator: Implements factory method to create concrete product
 * - Product: Interface/abstract class that defines product
 * - Concrete Product: Implements product interface
 *
 * Benefits:
 * - Follows Open/Closed Principle: easy to add new products without modifying existing code
 * - Separates object creation code from object usage code
 * - Provides hook methods for subclasses to extend
 * - Follows Single Responsibility Principle
 */

// Product interface
class Vehicle {
  constructor() {
    if (this.constructor === Vehicle) {
      throw new Error("Abstract class cannot be instantiated");
    }
  }

  getType() {
    throw new Error("getType() method must be implemented");
  }
}

// Concrete products
class Car extends Vehicle {
  getType() {
    return "Car";
  }
}

class Bike extends Vehicle {
  getType() {
    return "Bike";
  }
}

// Creator interface
class VehicleFactory {
  constructor() {
    if (this.constructor === VehicleFactory) {
      throw new Error("Abstract class cannot be instantiated");
    }
  }

  createVehicle() {
    throw new Error("createVehicle() method must be implemented");
  }
}

// Concrete creators
class CarFactory extends VehicleFactory {
  createVehicle() {
    return new Car();
  }
}

class BikeFactory extends VehicleFactory {
  createVehicle() {
    return new Bike();
  }
}

// Client code
console.log("Demo Factory Method Pattern");

const carFactory = new CarFactory();
const bikeFactory = new BikeFactory();

const car = carFactory.createVehicle();
const bike = bikeFactory.createVehicle();

console.log("Created:", car.getType()); // Car
console.log("Created:", bike.getType()); // Bike
