import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("productos")
class Producto {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre_producto: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  precio: number;

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

export { Producto };