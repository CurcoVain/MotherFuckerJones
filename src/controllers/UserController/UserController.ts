import { Request, Response } from "express";

class UserController {
    async handleCreateUser(request: Request, response: Response) {
      const { username, email, telefone, cidade, estado } = request.body;
  
      const createUserService = new CreateUserService();
  
      try {
        await createUserService.create({
          username,
          email,
          telefone,
          cidade,
          estado
        }).then(() => {
          response.render("message", {
            message: "Usuário cadastrado com sucesso"
          });
        });
      } catch (err) {
        response.render("message", {
          message: `Erro ao cadastrar usuário: ${err.message}`
        });
      }
  
    }
    async handleDeleteUser(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteUserService = new DeleteUserService();
    
        try {
          await deleteUserService.delete(id).then(() => {
            response.render("message", {
              message: "Usuário deletado com sucesso"
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Erro ao deletar usuário: ${err.message}`
          });
        }
      }
      async handleGetData(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getUserDataService = new GetUserDataService();
    
        const user = await getUserDataService.getData(id);
    
        return response.render("edit", {
          user: user
        });
      }
      async handleListUsers(request: Request, response: Response) {
        const listUsersService = new ListUsersService();
    
        const users = await listUsersService.list();
    
        return response.render("index", {
          users: users
        });
      }
      async handleSearchUser(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchUserService = new SearchUserService();
    
        try {
          const users = await searchUserService.search(search);
          response.render("search", {
            users: users,
            search: search
          });
        } catch (err) {
          response.render("message", {
            message: `Erro ao buscar usuário: ${err.message}`
          });
        }
      }
      async handleUpdateUser(request: Request, response: Response) {
        const { id, username, email, telefone, cidade, estado } = request.body;
    
        const updateUserService = new UpdateUserService();
    
        try {
          await updateUserService.update({ id, username, email, telefone, cidade, estado }).then(() => {
            response.render("message", {
              message: "Usuário atualizado com sucesso"
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Erro ao atualizar usuário: ${err.message}`
          });
        }
    
      }
  }
  
  export { UserController };