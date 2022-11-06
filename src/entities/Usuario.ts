import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("usuarios")
class Usuario {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre_usuario: string;

  @Column()
  correo: string;


  @Column()
  telefono: string;

  @Column()
  ciudad: string;

  @Column()
  provincia: string;

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

export { Usuario };