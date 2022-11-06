import { getCustomRepository } from "typeorm";
import { Producto } from "../../entities/Producto";
import { ProductRepository } from "../../repositories/ProductRepository/ProductRepository";


interface iProducto {
  id?:string;
  nombre_producto:string;
  marca:string;
  modelo:string;
  precio: number;
}

class ProductService {
  async createProducts({ nombre_producto, marca,modelo,precio }: iProducto) {
    if (!nombre_producto || !marca || !modelo || !precio ) {
      throw new Error("Por favor llena todos los campos");
    }

    const productRepository = getCustomRepository(ProductRepository);

    const productAlreadyExists = await productRepository.findOne({ nombre_producto,marca,modelo,precio});

    if (productAlreadyExists) {
      throw new Error("producto ya registrado");
    }

    const createProduct = productRepository.create({ nombre_producto,marca,modelo,precio });

    await productRepository.save(createProduct);

    return createProduct;

  }
  async deleteProducts(id: string) {
    const productRepository = getCustomRepository(ProductRepository);

    const deleteProduct = await productRepository
      .createQueryBuilder()
      .delete()
      .from(Producto)
      .where("id = :id", { id })
      .execute();

    return deleteProduct;

  }
  async getDataProducts(id: string) {
    const productRepository = getCustomRepository(ProductRepository);

    const getDataProduct = await productRepository.findOne(id);

    return getDataProduct;
  }
  async listProducts() {
    const productRepository = getCustomRepository(ProductRepository);

    const listProduct = await productRepository.find();

    return listProduct;
  }
  async searchProducts(search: string) {
    if (!search) {
      throw new Error("Por favor llenar todos los campos de busqueda");
    }

    const productRepository = getCustomRepository(ProductRepository);

    const searchProduct = await productRepository
      .createQueryBuilder()
      .where("nombre_producto like :search", { search: `%${search}%` })
      .orWhere("marca like :search", { search: `%${search}%` })
      .orWhere("modelo like :search", { search: `%${search}%` })
      .orWhere("precio like :search", { search: `%${search}%` })
      .getMany();

    return searchProduct;

  }
  async updateProducts({ id, nombre_producto, marca,modelo,precio }: iProducto) {
    const productRepository = getCustomRepository(ProductRepository);

    const updateProduct = await productRepository
      .createQueryBuilder()
      .update(Producto)
      .set({ nombre_producto, marca,modelo,precio })
      .where("id = :id", { id })
      .execute();

    return updateProduct;

  }
}

export { ProductService };