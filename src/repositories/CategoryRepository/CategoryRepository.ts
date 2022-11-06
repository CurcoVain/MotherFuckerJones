import { Repository, EntityRepository } from "typeorm";
import { Categoria } from "../../entities/Categoria";

@EntityRepository(Categoria)
class CategoryRepository extends Repository<Categoria>{
  static find: any;
  static create(arg0: { nombre_categoria: string; descripcion: string; }) {
    throw new Error("Method not implemented.");
  }
  static findOne(arg0: { nombre_categoria: string; descripcion: string; }) {
    throw new Error("Method not implemented.");
  }
}

export { CategoryRepository };