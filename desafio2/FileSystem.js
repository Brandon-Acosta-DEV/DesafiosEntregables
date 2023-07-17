import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.patch = "./productos.txt";
    this.products = [];
  }

  static id = 0;

  addProduct = async (title, description, price, image, code, stock) => {
    ProductManager.id++;

    let newProduct = {
      title,
      description,
      price,
      image,
      code,
      stock,
      id: ProductManager.id,
    };

    this.products.push(newProduct);

    await fs.writeFile(this.patch, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let respuesta = await fs.readFile(this.patch, "utf-8");
    return JSON.parse(respuesta);
  };

  getProducts = async () => {
    let respuesta2 = await this.readProducts();
    return console.log(respuesta2);
  };

  getProductById = async (id) => {
    let respuesta3 = await this.readProducts();
    if (!respuesta3.find((product) => product.id === id)) {
      console.log("Producto no encontrado");
    } else {
      console.log(respuesta3.find((product) => product.id === id));
    }
  };

  deleteProductById = async (id) => {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter((products) => products.id != id);

    await fs.writeFile(this.patch, JSON.stringify(productFilter));
    console.log("Producto Eliminado");
  };

  updateProducts = async ({ id, ...producto }) => {
    await this.deleteProductById(id);
    let productOld = await this.readProducts();
    let productModif = [{ ...producto, id }, ...productOld];
    await fs.writeFile(this.patch, JSON.stringify(productModif));
  };
}

const productos = new ProductManager();

// productos.addProduct("Titulo1", "Description1", 1000, "Image1", "abc123", 5);
// productos.addProduct("Titulo2", "Description2", 2000, "Image2", "abc124", 10);
// productos.addProduct("Titulo3", "Description3", 3000, "Image3", "abc125", 15);

// productos.getProducts();

// productos.getProductById(3);

// productos.deleteProductById(2);

productos.updateProducts({
  title: "Titulo3",
  description: "Description3",
  price: 4500,
  image: "Image3",
  code: "abc125",
  stock: 15,
  id: 3,
});
