const fs = require("fs");

class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.carts = this.loadCarts();
  }

  loadCarts() {
    try{
      const fileData = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(fileData) || [];
    } catch (error) {
      console.log(
        `Error al cargar los carritos desde el archivo ${this.filePath}: ${error}`
      );
      return [];
    }
  }

  saveCarts() {
    try {
      const data = JSON.stringify(this.carts);
      fs.writeFileSync(this.filePath, data, "utf8");
    } catch (error) {
      console.log(
        `Error al guardar los carritos en el archivo ${this.filePath}: ${error}`
      );
    }
  }

  createCart() {
    const newCart = {
      id: this.generateId(),
      products: [],
    };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);
    const existingProduct = cart.products.find((p) => p.product === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    this.saveCarts();
  }

  generateId() {
    const ids = this.carts.map((cart) => cart.id);
    const maxId = Math.max(0, ...ids);
    return maxId + 1;
  }
}

module.exports = CartManager;
