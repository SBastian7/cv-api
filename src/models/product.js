class Product {
    constructor(id, name, description, quantity, price) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.quantity = quantity;
      this.price = price;
    }
  
    // Getter methods
    getId() {
      return this.id;
    }
  
    getName() {
      return this.name;
    }
  
    getDescription() {
      return this.description;
    }
  
    getQuantity() {
      return this.quantity;
    }
  
    getPrice() {
      return this.price;
    }
  
    // Setter methods
    setName(name) {
      this.name = name;
    }
  
    setDescription(description) {
      this.description = description;
    }
  
    setQuantity(quantity) {
      this.quantity = quantity;
    }
  
    setPrice(price) {
      this.price = price;
    }
  
    // Other methods, if needed
    // For example, you might add methods for validation or formatting here
  }
  
  module.exports = Product;
  