const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const productManager = new ProductManager("./productos.json");

app.get("/products", (req, res) => {
  try {
    const limit = req.query.limit;
    const products = productManager.getProducts(limit);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

app.get("/products/:pid", (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
