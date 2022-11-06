import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("categorias")
class Categoria {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre_categoria: string;

  @Column()
  descripcion: string;

  @CreateDateColumn()
  creado: Date;

  @UpdateDateColumn()
  actualizado: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Categoria };