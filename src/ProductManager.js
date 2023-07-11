const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.productos = this.loadproductos();
  }

  loadproductos() {
    try {
      const fileData = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(fileData) || [];
    } catch (error) {
      console.log(
        `Error al cargar los productos desde el archivo ${this.filePath}: ${error}`
      );
      return [];
    }
  }

  saveproductos() {
    try {
      const data = JSON.stringify(this.productos);
      fs.writeFileSync(this.filePath, data, "utf8");
    } catch (error) {
      console.log(
        `Error al guardar los productos en el archivo ${this.filePath}: ${error}`
      );
    }
  }

  getproductos(limit) {
    if (limit) {
      return this.productos.slice(0, limit);
    }
    return this.productos;
  }

  getProductById(id) {
    return this.productos.find((product) => product.id === id);
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price) {
      throw new Error("Todos los campos son obligatorios, excepto thumbnails");
    }
  
    const newProduct = {
      id: this.generateId(),
      title: product.title || "",
      description: product.description || "",
      price: parseFloat(product.price) || 0,
      thumbnail: product.thumbnail || "",
      code: product.code || "",
      stock: parseInt(product.stock) || 0,
    };
    this.productos.push(newProduct);
    this.saveproductos();
  }
  

  updateProduct(id, productData) {
    const productIndex = this.productos.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      throw new Error("Producto no encontrado");
    }

    const product = this.productos[productIndex];
    this.productos[productIndex]= { ...product, ...productData, id: product.id };
    this.saveproductos();
  }

  deleteProduct(id) {
    const productIndex = this.productos.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      throw new Error("Producto no encontrado");
    }

    this.productos.splice(productIndex, 1);
    this.saveproductos();
  }

  generateId() {
    const ids = this.productos.map((product) => product.id);
    const maxId = Math.max(0, ...ids);
    return maxId + 1;
  }
}

module.exports = ProductManager;
