/**
 * Prototype Pattern: Creational Design Pattern
 *
 * Prototype pattern allows creating new objects by cloning a prototype object
 * instead of creating them from scratch. This pattern is useful when:
 * - Cost of creating new objects is high
 * - Need to create multiple objects with similar properties
 * - Want to avoid building a hierarchy of factory classes
 *
 * Key components:
 * - Prototype: Interface/abstract class that defines clone() method
 * - Concrete Prototype: Implements prototype interface and defines clone logic
 * - Client: Creates new objects by requesting prototype to clone
 */

console.log("================================================");
// Prototype interface
class Shape {
  clone() {
    throw new Error("clone() method must be implemented");
  }
}

// Concrete prototypes
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.type = "Rectangle";
  }

  clone() {
    return new Rectangle(this.width, this.height);
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
    this.type = "Circle";
  }

  clone() {
    return new Circle(this.radius);
  }
}

// Client code
console.log("Demo Prototype Pattern");

const rectangle = new Rectangle(10, 20);
const circle = new Circle(15);

// Clone objects
const clonedRectangle = rectangle.clone();
const clonedCircle = circle.clone();

console.log("Original Rectangle:", rectangle);
console.log("Cloned Rectangle:", clonedRectangle);
console.log("Original Circle:", circle);
console.log("Cloned Circle:", clonedCircle);

// Verify clones are independent
clonedRectangle.width = 30;
clonedCircle.radius = 25;

console.log("\nAfter modifying clones:");
console.log("Original Rectangle:", rectangle); // Unchanged
console.log("Modified Clone Rectangle:", clonedRectangle);
console.log("Original Circle:", circle); // Unchanged
console.log("Modified Clone Circle:", clonedCircle);
