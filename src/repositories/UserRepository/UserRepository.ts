import { Repository, EntityRepository } from "typeorm";
import { Usuario } from "../../entities/Usuario";

@EntityRepository(Usuario)
class UserRepository extends Repository<Usuario>{ }

export { UserRepository };