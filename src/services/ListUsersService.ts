import { getCustomRepository } from "typeorm";
import { instanceToPlain } from 'class-transformer';
import UsersRepositories from "../repositories/UsersRepositories";

export default class ListUsersService {
  async execute() {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const users = await usersRepositories.find();

    return instanceToPlain(users);
  }
}
