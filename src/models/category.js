class Category {
    constructor(id, name) {
      this.id = id;
      this.name = name;
    }
  
    // Getter methods
    getCategoryId() {
      return this.id;
    }
  
    getCategoryName() {
      return this.name;
    }
  
    // Setter methods
    setCategoryId(id) {
      this.id = id;
    }
  
    setCategoryName(name) {
      this.name = name;
    }
  }
  
  module.exports = Category;
  