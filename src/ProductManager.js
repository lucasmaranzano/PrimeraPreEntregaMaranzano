const fs = require("fs");
const { promisify } = require("util");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextId = 1;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(data);
      if (this.products.length > 0) {
        const lastProduct = this.products[this.products.length - 1];
        this.nextId = lastProduct.id + 1;
      }
    } catch (error) {
      this.products = [];
    }
  }

  async saveProducts() {
    try {
      const writeFile = promisify(fs.writeFile);
      const data = JSON.stringify(this.products, null, 2);
      await writeFile(this.path, data, "utf-8");
    } catch (error) {
      console.log("Error al guardar los productos en el archivo.");
    }
  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios.");
      return;
    }

    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
      console.log("El código del producto ya existe.");
      return;
    }

    const newProduct = {
      id: this.nextId,
      ...product,
    };

    this.products.push(newProduct);
    this.nextId++;
    this.saveProducts();
  }

  getProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    } else {
      return this.products;
    }
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado.");
      return null; // Agrega un return null para indicar que el producto no fue encontrado
    }
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      const updatedProduct = {
        ...this.products[index],
        ...updatedFields,
      };
      this.products[index] = updatedProduct;
      this.saveProducts();
    } else {
      console.log("Producto no encontrado.");
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
    } else {
      console.log("Producto no encontrado.");
    }
  }
}

module.exports = ProductManager;
