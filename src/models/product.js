class Product {
    constructor(id, name, category, quantity, price) {
      this.id = id;
      this.name = name;
      this.category = category;
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
      return this.category;
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
  
    setDescription(category) {
      this.category = category;
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
  