import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1624747881677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "usuarios",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "nombre_usuario",
                        type: "varchar"
                    },
                    {
                        name: "correo",
                        type: "varchar"
                    },
                    {
                        name: "telefono",
                        type: "varchar"
                    },
                    {
                        name: "ciudad",
                        type: "varchar"
                    },
                    {
                        name: "provincia",
                        type: "varchar",
                        length: "2"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("usuarios");
    }

}
