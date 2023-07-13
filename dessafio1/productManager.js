// defino productManager
class ProductManager {
  constructor() {
    //Defino el constructor "products"
    //con un arreglo vacío
    this.products = [];
  }

  // Agrego un método que retorne nuestro arreglo de productos.
  getProducts = () => {
    return this.products;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      products: [],
    };

    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }

    //pusheamos el producto
    this.products.push(product);
  };

  getProductById = (idProduct) => {
    const productIndex = this.products.findIndex((product) => product.id === idProduct);

    if (productIndex === -1) {
      console.log("Not Found");
      return;
    }

    const productAdd = this.products[productIndex].products.includes(idProduct);

    if (productAdd) {
      console.log("El producto se agregó correctamente");
      return;
    }
    this.products[productIndex].products.push(idProduct);
  };
}

const hostingProducts = new ProductManager();
hostingProducts.addProduct(`Regla`, `transparente`, 80, `sin imágen`, `ab154`, 36);
hostingProducts.addProduct(`Lápiz`, `transparente`, 100, `sin imágen`, `ab154`, 30);
hostingProducts.addProduct(`Birome`, `transparente`, 200, `sin imágen`, `ab154`, 16);

hostingProducts.getProductById(1);
hostingProducts.getProductById(2);
hostingProducts.getProductById(3);

console.log(hostingProducts.getProducts());
