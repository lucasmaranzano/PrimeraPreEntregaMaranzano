class ProductManager {
  constructor() {
    this.products = []; // arreglo para almacenar los productos
    this.nextId = 1; // variable para almacenar el próximo id de producto
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios."); // muestra un mensaje de error si falta algun campo requerido
      return;
    }

    const existingProduct = this.products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      console.log("El código del producto ya existe."); // muestra un mensaje de error si el codigo del producto ya existe
      return;
    }

    const product = {
      id: this.nextId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product); // agrega el producto al arreglo de productos
    this.nextId++; // incrementa el id para el próximo producto
  }

  getProducts() {
    return this.products; // devuelve el arreglo de productos
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product; // devuelve el producto si se encuentra el id correspondiente
    } else {
      console.log("Not found"); // muestra un mensaje de error si no se encuentra el id del producto
    }
  }
}

let manager = new ProductManager();
