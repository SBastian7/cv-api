class Category {
  constructor(id, name, category, quantity, price) {
    this.id = id;
    this.name = name;
  }

  // Getter methods
  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  // Setter methods
  setName(name) {
    this.name = name;
  }

}

module.exports = Category;
