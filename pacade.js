/**
 * Facade Pattern Example
 *
 * The Facade pattern provides a simplified interface to a complex subsystem.
 * It acts as a unified interface to a set of interfaces in a subsystem.
 *
 * Benefits:
 * 1. Simplifies complex systems by providing a higher-level interface
 * 2. Decouples client code from subsystem components
 * 3. Promotes loose coupling between subsystems
 *
 * In this example:
 * - ShopFacade acts as a facade that simplifies interactions with Discount, Shipping, and Fees
 * - Client code (buy function) only needs to work with the facade instead of individual subsystems
 * - Each subsystem (Discount, Shipping, Fees) can be modified independently
 * - The facade coordinates the subsystems and handles their interactions
 */

class Discount {
  calculate(price) {
    return price * 0.9;
  }
}

class Shipping {
  calculate(price) {
    return price * 0.1;
  }
}

class Fees {
  calculate(price) {
    return price * 1.05;
  }
}

class ShopFacade {
  constructor() {
    this.discount = new Discount();
    this.shipping = new Shipping();
    this.fees = new Fees();
  }

  calculate(price) {
    price = this.discount.calculate(price);
    console.log(`Discount: ${price}`);
    price = this.fees.calculate(price);
    console.log(`Fees: ${price}`);
    price += this.shipping.calculate(price);
    console.log(`Shipping: ${price}`);
    return price;
  }
}

function buy(price) {
  const shop = new ShopFacade();
  const total = shop.calculate(price);
  console.log(`Total: ${total}`);
}

buy(150000);

/**
 * WITHOUT FACADE PATTERN
function calculatePrice(price) {
  // Apply discount
  let discountedPrice = price * 0.9;
  console.log(`Discount: ${discountedPrice}`);

  // Add fees
  let withFees = discountedPrice * 1.05;
  console.log(`Fees: ${withFees}`);

  // Add shipping
  let shipping = withFees * 0.1;
  let total = withFees + shipping;
  console.log(`Shipping: ${total}`);

  return total;
}

// Calculate total price
let finalPrice = calculatePrice(150000);
console.log(`Total: ${finalPrice}`);
**/
