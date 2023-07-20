import { promises as fs } from "fs";

export default class ProductManager {
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

// const productos = new ProductManager();

// productos.addProduct("Titulo1", "Description1", 1000, "Image1", "abc121", 5);
// productos.addProduct("Titulo2", "Description2", 2000, "Image2", "abc122", 10);
// productos.addProduct("Titulo3", "Description3", 3000, "Image3", "abc123", 15);
// productos.addProduct("Titulo4", "Description4", 4000, "Image4", "abc124", 20);
// productos.addProduct("Titulo5", "Description5", 5000, "Image5", "abc125", 25);
// productos.addProduct("Titulo6", "Description6", 6000, "Image6", "abc126", 30);
// productos.addProduct("Titulo7", "Description7", 7000, "Image7", "abc127", 35);
// productos.addProduct("Titulo8", "Description8", 8000, "Image8", "abc128", 40);
// productos.addProduct("Titulo9", "Description9", 9000, "Image9", "abc129", 45);
// productos.addProduct("Titulo0", "Description0", 1000, "Image0", "abc120", 50);

// productos.getProducts();

// productos.getProductById(3);

// productos.deleteProductById(2);

// productos.updateProducts({
//   title: "Titulo3",
//   description: "Description3",
//   price: 4500,
//   image: "Image3",
//   code: "abc125",
//   stock: 15,
//   id: 3,
// });
