import { getCustomRepository } from "typeorm";
import { Usuario } from "../../entities/Usuario";
import { UserRepository } from "../../repositories/UserRepository/UserRepository";


interface IUser {
  id?:string;
  nombre_usuario: string;
  correo: string;
  telefono : string;
  ciudad: string;
  provincia: string;
}

class UserService {
  async createUser({ nombre_usuario, correo, telefono, ciudad, provincia }: IUser) {
    if (!nombre_usuario || !correo || !telefono || !ciudad || !provincia) {
      throw new Error("Por favor llenar todos campos");
    }

    const usersRepository = getCustomRepository(UserRepository);

    const usernameAlreadyExists = await usersRepository.findOne({ nombre_usuario });

    if (usernameAlreadyExists) {
      throw new Error("usuario ya registrado");
    }

    const emailAlreadyExists = await usersRepository.findOne({ correo });

    if (emailAlreadyExists) {
      throw new Error("Email ya registrado");
    }

    const user = usersRepository.create({ nombre_usuario, correo, telefono, ciudad, provincia });

    await usersRepository.save(user);

    return user;

  }
  async deleteUser(id: string) {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .delete()
      .from(Usuario)
      .where("id = :id", { id })
      .execute();

    return user;

  }
  async getData(id: string) {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne(id);

    return user;
  }
  async list() {
    const usersRepository = getCustomRepository(UserRepository);

    const users = await usersRepository.find();

    return users;
  }
  async search(search: string) {
    if (!search) {
      throw new Error("Por favor preencha o campo de busca");
    }

    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .where("username like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("telefone like :search", { search: `%${search}%` })
      .orWhere("cidade like :search", { search: `%${search}%` })
      .orWhere("estado like :search", { search: `%${search}%` })
      .getMany();

    return user;

  }
  async update({ id, nombre_usuario, correo, telefono, ciudad, provincia }: IUser) {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .update(Usuario)
      .set({ nombre_usuario, correo, telefono, ciudad, provincia })
      .where("id = :id", { id })
      .execute();

    return user;

  }
}

export { UserService };